const express = require('express');
const {
  getProjects,
  getProjectById,
  createProject,
  updateProjectStatus,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// @route   GET /api/projects
// @desc    Get all projects with pagination, search, and filtering
// @access  Private
router.get('/', getProjects);

// @route   GET /api/projects/:id
// @desc    Get single project by ID
// @access  Private
router.get('/:id', getProjectById);

// @route   POST /api/projects
// @desc    Create new project
// @access  Private
router.post('/', createProject);

// @route   PATCH /api/projects/:id/status
// @desc    Update project status (Start/Close/Cancel)
// @access  Private
router.patch('/:id/status', updateProjectStatus);

// @route   PUT /api/projects/:id
// @desc    Update project details
// @access  Private
router.put('/:id', updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete project (Admin only)
// @access  Private (Admin)
router.delete('/:id', authorize('admin'), deleteProject);

module.exports = router;