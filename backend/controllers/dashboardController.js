const Project = require('../models/Project');

// @desc    Get dashboard counters
// @route   GET /api/dashboard/counters
// @access  Private
const getDashboardCounters = async (req, res) => {
  try {
    const now = new Date();

    // Use MongoDB aggregation pipeline for efficient single query
    const counters = await Project.aggregate([
      {
        $facet: {
          totalProjects: [{ $count: "count" }],
          closed: [{ $match: { status: "Closed" } }, { $count: "count" }],
          running: [{ $match: { status: "Running" } }, { $count: "count" }],
          cancelled: [{ $match: { status: "Cancelled" } }, { $count: "count" }],
          registered: [{ $match: { status: "Registered" } }, { $count: "count" }],
          runningDelayed: [
            { 
              $match: { 
                status: "Running", 
                endDate: { $lt: now } 
              } 
            }, 
            { $count: "count" }
          ]
        }
      }
    ]);

    // Format the results
    const result = counters[0];
    const dashboardData = {
      total: result.totalProjects[0]?.count || 0,
      closed: result.closed[0]?.count || 0,
      running: result.running[0]?.count || 0,
      cancelled: result.cancelled[0]?.count || 0,
      registered: result.registered[0]?.count || 0,
      runningDelayed: result.runningDelayed[0]?.count || 0
    };

    // Calculate additional metrics
    dashboardData.completed = dashboardData.closed;
    dashboardData.active = dashboardData.running + dashboardData.registered;
    dashboardData.completionRate = dashboardData.total > 0 
      ? Math.round((dashboardData.closed / dashboardData.total) * 100) 
      : 0;
    dashboardData.onTimeDelivery = dashboardData.running > 0 
      ? Math.round(((dashboardData.running - dashboardData.runningDelayed) / dashboardData.running) * 100) 
      : 100;

    res.status(200).json({
      status: 'success',
      data: {
        counters: dashboardData,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Get Dashboard Counters Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching dashboard counters'
    });
  }
};

// @desc    Get department-wise project completion chart data
// @route   GET /api/dashboard/chart
// @access  Private
const getDepartmentChart = async (req, res) => {
  try {
    // Aggregation pipeline for department-wise statistics
    const chartData = await Project.aggregate([
      {
        $group: {
          _id: "$department",
          totalProjects: { $sum: 1 },
          closedProjects: { 
            $sum: { 
              $cond: [{ $eq: ["$status", "Closed"] }, 1, 0] 
            } 
          },
          runningProjects: { 
            $sum: { 
              $cond: [{ $eq: ["$status", "Running"] }, 1, 0] 
            } 
          },
          cancelledProjects: { 
            $sum: { 
              $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] 
            } 
          },
          registeredProjects: { 
            $sum: { 
              $cond: [{ $eq: ["$status", "Registered"] }, 1, 0] 
            } 
          }
        }
      },
      {
        $project: {
          department: "$_id",
          totalProjects: 1,
          closedProjects: 1,
          runningProjects: 1,
          cancelledProjects: 1,
          registeredProjects: 1,
          completionPercentage: {
            $cond: [
              { $eq: ["$totalProjects", 0] },
              0,
              {
                $multiply: [
                  { $divide: ["$closedProjects", "$totalProjects"] },
                  100
                ]
              }
            ]
          },
          successRate: {
            $cond: [
              { $eq: ["$totalProjects", 0] },
              0,
              {
                $multiply: [
                  { 
                    $divide: [
                      "$closedProjects", 
                      { $subtract: ["$totalProjects", "$cancelledProjects"] }
                    ] 
                  },
                  100
                ]
              }
            ]
          }
        }
      },
      {
        $sort: { department: 1 }
      }
    ]);

    // Format data for Highcharts
    const highchartsData = {
      categories: chartData.map(item => item.department),
      series: [
        {
          name: 'Completed',
          data: chartData.map(item => Math.round(item.completionPercentage * 100) / 100),
          color: '#28a745'
        },
        {
          name: 'Running',
          data: chartData.map(item => 
            Math.round((item.runningProjects / item.totalProjects) * 100 * 100) / 100
          ),
          color: '#17a2b8'
        },
        {
          name: 'Registered',
          data: chartData.map(item => 
            Math.round((item.registeredProjects / item.totalProjects) * 100 * 100) / 100
          ),
          color: '#ffc107'
        },
        {
          name: 'Cancelled',
          data: chartData.map(item => 
            Math.round((item.cancelledProjects / item.totalProjects) * 100 * 100) / 100
          ),
          color: '#dc3545'
        }
      ]
    };

    // Also provide raw data for custom implementations
    const tableData = chartData.map(item => ({
      department: item.department,
      total: item.totalProjects,
      closed: item.closedProjects,
      running: item.runningProjects,
      registered: item.registeredProjects,
      cancelled: item.cancelledProjects,
      completionPercentage: Math.round(item.completionPercentage * 100) / 100,
      successRate: Math.round(item.successRate * 100) / 100
    }));

    res.status(200).json({
      status: 'success',
      data: {
        chartData: highchartsData,
        tableData: tableData,
        summary: {
          totalDepartments: chartData.length,
          averageCompletion: chartData.length > 0 
            ? Math.round(chartData.reduce((sum, item) => sum + item.completionPercentage, 0) / chartData.length * 100) / 100
            : 0
        },
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Get Department Chart Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching chart data'
    });
  }
};

// @desc    Get project statistics by time period
// @route   GET /api/dashboard/timeline
// @access  Private
const getTimelineStats = async (req, res) => {
  try {
    const { period = 'month' } = req.query; // month, week, year

    let groupBy;
    switch (period) {
      case 'week':
        groupBy = { 
          year: { $year: "$createdAt" },
          week: { $week: "$createdAt" }
        };
        break;
      case 'year':
        groupBy = { 
          year: { $year: "$createdAt" }
        };
        break;
      default: // month
        groupBy = { 
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        };
    }

    const timelineData = await Project.aggregate([
      {
        $group: {
          _id: groupBy,
          projectsCreated: { $sum: 1 },
          projectsClosed: { 
            $sum: { 
              $cond: [{ $eq: ["$status", "Closed"] }, 1, 0] 
            } 
          }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.week": 1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        timeline: timelineData,
        period,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Get Timeline Stats Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching timeline statistics'
    });
  }
};

module.exports = {
  getDashboardCounters,
  getDepartmentChart,
  getTimelineStats
};