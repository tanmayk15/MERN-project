import API from './api';

// Project Management Services
export const projectService = {
  // Get all projects with pagination and filters
  getProjects: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await API.get(`/projects${queryString ? `?${queryString}` : ''}`);
  },

  // Get single project by ID
  getProject: async (id) => {
    return await API.get(`/projects/${id}`);
  },

  // Create new project
  createProject: async (projectData) => {
    return await API.post('/projects', projectData);
  },

  // Update project status
  updateProjectStatus: async (id, status) => {
    return await API.patch(`/projects/${id}/status`, { status });
  },

  // Update project details
  updateProject: async (id, projectData) => {
    return await API.put(`/projects/${id}`, projectData);
  },

  // Delete project
  deleteProject: async (id) => {
    return await API.delete(`/projects/${id}`);
  }
};