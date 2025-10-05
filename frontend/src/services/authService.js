import API from './api';

// Authentication Services
export const authService = {
  // User login
  login: async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    
    if (response.status === 'success') {
      // Store token and user data
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  // User registration
  register: async (name, email, password) => {
    const response = await API.post('/auth/register', { name, email, password });
    
    if (response.status === 'success') {
      // Store token and user data
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  // Get current user
  getCurrentUser: async () => {
    return await API.get('/auth/me');
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get stored user data
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Forgot password
  forgotPassword: async (email) => {
    return await API.post('/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: async (token, password) => {
    return await API.post('/auth/reset-password', { token, password });
  }
};