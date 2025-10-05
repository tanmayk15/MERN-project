const Project = require('../models/Project');
const User = require('../models/User');

// @desc    Get all projects with pagination, search, and filtering
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      status,
      department,
      location
    } = req.query;

    // Build search query
    let query = {};

    // Text search across multiple fields
    if (search) {
      query.$or = [
        { projectName: { $regex: search, $options: 'i' } },
        { manager: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by department
    if (department) {
      query.department = department;
    }

    // Filter by location
    if (location) {
      query.location = location;
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const projects = await Project.find(query)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count for pagination
    const totalProjects = await Project.countDocuments(query);
    const totalPages = Math.ceil(totalProjects / limitNum);

    // Add computed fields
    const projectsWithComputed = projects.map(project => ({
      ...project,
      isDelayed: project.status === 'Running' && new Date() > new Date(project.endDate),
      durationInDays: Math.ceil((new Date(project.endDate) - new Date(project.startDate)) / (1000 * 60 * 60 * 24))
    }));

    res.status(200).json({
      status: 'success',
      data: {
        projects: projectsWithComputed,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalProjects,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
          limit: limitNum
        },
        filters: {
          search,
          status,
          department,
          location,
          sortBy,
          sortOrder
        }
      }
    });

  } catch (error) {
    console.error('Get Projects Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching projects'
    });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { project }
    });

  } catch (error) {
    console.error('Get Project By ID Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching project'
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const {
      projectName,
      department,
      location,
      startDate,
      endDate,
      manager,
      description,
      priority = 'Medium'
    } = req.body;

    // Validation
    if (!projectName || !department || !location || !startDate || !endDate || !manager) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields: projectName, department, location, startDate, endDate, manager'
      });
    }

    // Validate date range
    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({
        status: 'error',
        message: 'End date must be after start date'
      });
    }

    // Create project
    const project = new Project({
      projectName: projectName.trim(),
      department,
      location,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      manager: manager.trim(),
      description: description?.trim(),
      priority,
      createdBy: req.user.userId
    });

    await project.save();

    // Populate the created project
    await project.populate('createdBy', 'name email');

    res.status(201).json({
      status: 'success',
      message: 'Project created successfully',
      data: { project }
    });

  } catch (error) {
    console.error('Create Project Error:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Server error while creating project'
    });
  }
};

// @desc    Update project status
// @route   PATCH /api/projects/:id/status
// @access  Private
const updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate status
    const allowedStatuses = ['Registered', 'Running', 'Closed', 'Cancelled'];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: `Status must be one of: ${allowedStatuses.join(', ')}`
      });
    }

    // Find and update project
    const project = await Project.findByIdAndUpdate(
      id,
      { 
        status,
        updatedBy: req.user.userId
      },
      { new: true, runValidators: true }
    ).populate('createdBy updatedBy', 'name email');

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Project status updated successfully',
      data: { project }
    });

  } catch (error) {
    console.error('Update Project Status Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while updating project status'
    });
  }
};

// @desc    Update project details
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      projectName,
      department,
      location,
      startDate,
      endDate,
      manager,
      description,
      priority
    } = req.body;

    // Find project
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    // Update fields if provided
    if (projectName) project.projectName = projectName.trim();
    if (department) project.department = department;
    if (location) project.location = location;
    if (startDate) project.startDate = new Date(startDate);
    if (endDate) project.endDate = new Date(endDate);
    if (manager) project.manager = manager.trim();
    if (description !== undefined) project.description = description?.trim();
    if (priority) project.priority = priority;
    project.updatedBy = req.user.userId;

    // Validate date range if both dates are being updated
    if (project.endDate <= project.startDate) {
      return res.status(400).json({
        status: 'error',
        message: 'End date must be after start date'
      });
    }

    await project.save();
    await project.populate('createdBy updatedBy', 'name email');

    res.status(200).json({
      status: 'success',
      message: 'Project updated successfully',
      data: { project }
    });

  } catch (error) {
    console.error('Update Project Error:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Server error while updating project'
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Delete Project Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while deleting project'
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProjectStatus,
  updateProject,
  deleteProject
};