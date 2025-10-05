import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useAuth } from '../context/AuthContext';
import { dashboardService } from '../services/dashboardService';
import Navigation from '../components/Navigation';

const Dashboard = () => {
  const { user } = useAuth();
  const [counters, setCounters] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both counters and chart data
      const [countersResponse, chartResponse] = await Promise.all([
        dashboardService.getCounters(),
        dashboardService.getChartData()
      ]);

      setCounters(countersResponse.data.counters);
      setChartData(chartResponse.data);
      
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      setError(error.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Highcharts configuration
  const chartOptions = chartData ? {
    chart: {
      type: 'column',
      height: 400
    },
    title: {
      text: 'Department-wise Project Completion'
    },
    subtitle: {
      text: 'Percentage breakdown by department'
    },
    xAxis: {
      categories: chartData.chartData.categories,
      title: {
        text: 'Departments'
      }
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Percentage (%)'
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold'
        }
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      floating: false
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          format: '{y}%'
        }
      }
    },
    series: chartData.chartData.series,
    credits: {
      enabled: false
    }
  } : null;

  if (loading) {
    return (
      <>
        <Navigation />
        <Container className="mt-4">
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading dashboard...</p>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <header className="main-header">
        <Container>
          <Row>
            <Col>
              <h2 className="mb-0">Project Dashboard</h2>
              <small className="text-light">Welcome back, {user?.name}!</small>
            </Col>
            <Col xs="auto">
              <Link to="/projects" className="btn btn-light me-2">
                View Projects
              </Link>
              <Link to="/add-project" className="btn btn-light">
                Add Project
              </Link>
            </Col>
          </Row>
        </Container>
      </header>

      <Container className="mt-4">
        {error && (
          <Alert variant="danger" className="mb-4">
            <Alert.Heading>Error Loading Dashboard</Alert.Heading>
            <p>{error}</p>
            <button className="btn btn-outline-danger" onClick={fetchDashboardData}>
              Try Again
            </button>
          </Alert>
        )}

        {/* Counters Row */}
        {counters && (
          <Row className="mb-4">
            <Col xs={6} md={2} className="mb-3">
              <Card className="text-center border-primary h-100">
                <Card.Body>
                  <h2 className="text-primary mb-1">{counters.total}</h2>
                  <small className="text-muted">Total Projects</small>
                </Card.Body>
              </Card>
            </Col>
            
            <Col xs={6} md={2} className="mb-3">
              <Card className="text-center border-success h-100">
                <Card.Body>
                  <h2 className="text-success mb-1">{counters.closed}</h2>
                  <small className="text-muted">Completed</small>
                </Card.Body>
              </Card>
            </Col>
            
            <Col xs={6} md={2} className="mb-3">
              <Card className="text-center border-info h-100">
                <Card.Body>
                  <h2 className="text-info mb-1">{counters.running}</h2>
                  <small className="text-muted">Running</small>
                </Card.Body>
              </Card>
            </Col>
            
            <Col xs={6} md={2} className="mb-3">
              <Card className="text-center border-warning h-100">
                <Card.Body>
                  <h2 className="text-warning mb-1">{counters.runningDelayed}</h2>
                  <small className="text-muted">Delayed</small>
                </Card.Body>
              </Card>
            </Col>
            
            <Col xs={6} md={2} className="mb-3">
              <Card className="text-center border-danger h-100">
                <Card.Body>
                  <h2 className="text-danger mb-1">{counters.cancelled}</h2>
                  <small className="text-muted">Cancelled</small>
                </Card.Body>
              </Card>
            </Col>
            
            <Col xs={6} md={2} className="mb-3">
              <Card className="text-center border-secondary h-100">
                <Card.Body>
                  <h2 className="text-secondary mb-1">{counters.registered}</h2>
                  <small className="text-muted">Registered</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Chart and Stats Section */}
        <Row>
          <Col xs={12} lg={8}>
            <Card>
              <Card.Header>
                <h4 className="mb-0">Department-wise Project Completion</h4>
              </Card.Header>
              <Card.Body>
                {chartData && chartData.chartData.categories.length > 0 ? (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                  />
                ) : (
                  <div className="text-center py-5">
                    <div className="mb-3">
                      <i className="bi bi-bar-chart" style={{fontSize: '3rem', color: '#6c757d'}}></i>
                    </div>
                    <h5 className="text-muted">No Project Data Available</h5>
                    <p className="text-muted">
                      Start by <Link to="/add-project">adding some projects</Link> to see department-wise statistics.
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={12} lg={4}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Quick Stats</h5>
              </Card.Header>
              <Card.Body>
                {counters ? (
                  <>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Completion Rate:</span>
                      <strong className="text-success">{counters.completionRate}%</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>On Time Delivery:</span>
                      <strong className="text-info">{counters.onTimeDelivery}%</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Active Projects:</span>
                      <strong className="text-primary">{counters.active}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Success Rate:</span>
                      <strong className="text-warning">
                        {counters.total > 0 ? Math.round((counters.closed / (counters.total - counters.cancelled)) * 100) : 0}%
                      </strong>
                    </div>
                    <hr />
                    <small className="text-muted">
                      📈 Last updated: {new Date().toLocaleTimeString()}
                    </small>
                  </>
                ) : (
                  <div className="text-center">
                    <Spinner animation="border" size="sm" />
                    <p className="mt-2 mb-0 text-muted">Loading stats...</p>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Department Summary Table */}
            {chartData && chartData.tableData && chartData.tableData.length > 0 && (
              <Card className="mt-3">
                <Card.Header>
                  <h6 className="mb-0">Department Summary</h6>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Department</th>
                          <th>Total</th>
                          <th>Completed</th>
                          <th>%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chartData.tableData.map((dept, index) => (
                          <tr key={index}>
                            <td>{dept.department}</td>
                            <td>{dept.total}</td>
                            <td>{dept.closed}</td>
                            <td>
                              <span className="badge bg-success">
                                {dept.completionPercentage}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;