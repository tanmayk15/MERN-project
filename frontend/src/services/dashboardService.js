import API from './api';

// Dashboard Services
export const dashboardService = {
  // Get dashboard counters
  getCounters: async () => {
    return await API.get('/dashboard/counters');
  },

  // Get department-wise chart data
  getChartData: async () => {
    return await API.get('/dashboard/chart');
  },

  // Get timeline statistics
  getTimelineStats: async (period = 'month') => {
    return await API.get(`/dashboard/timeline?period=${period}`);
  }
};