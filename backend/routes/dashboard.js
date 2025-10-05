const express = require('express');
const {
  getDashboardCounters,
  getDepartmentChart,
  getTimelineStats
} = require('../controllers/dashboardController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// @route   GET /api/dashboard/counters
// @desc    Get dashboard counters (total, closed, running, delayed, cancelled)
// @access  Private
router.get('/counters', getDashboardCounters);

// @route   GET /api/dashboard/chart
// @desc    Get department-wise completion chart data
// @access  Private
router.get('/chart', getDepartmentChart);

// @route   GET /api/dashboard/timeline
// @desc    Get project statistics by time period
// @access  Private
router.get('/timeline', getTimelineStats);

module.exports = router;