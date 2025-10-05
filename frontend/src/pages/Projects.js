import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Alert, Spinner, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectService } from '../services/projectService';
import Navigation from '../components/Navigation';

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  
  // Search and filter state
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    department: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    limit: 10
  });

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await projectService.getProjects(filters);
      setProjects(response.data.projects);
      setPagination(response.data.pagination);
      
    } catch (error) {
      console.error('Fetch projects error:', error);
      setError(error.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (projectId, newStatus) => {
    try {
      setUpdatingStatus(projectId);
      
      await projectService.updateProjectStatus(projectId, newStatus);
      
      // Update the project in local state
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project._id === projectId 
            ? { ...project, status: newStatus }
            : project
        )
      );
      
    } catch (error) {
      console.error('Status update error:', error);
      setError(error.message || 'Failed to update project status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value // Reset to page 1 when filtering
    }));
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Registered': 'info',
      'Running': 'success',
      'Closed': 'secondary',
      'Cancelled': 'danger'
    };
    return <Badge bg={variants[status] || 'primary'}>{status}</Badge>;
  };

  const getStatusButtons = (project) => {
    const { _id, status } = project;
    const isUpdating = updatingStatus === _id;
    
    return (
      <div className="d-flex gap-1">
        {status !== 'Running' && status !== 'Closed' && status !== 'Cancelled' && (
          <Button 
            size="sm" 
            variant="outline-success"
            disabled={isUpdating}
            onClick={() => handleStatusUpdate(_id, 'Running')}
          >
            {isUpdating ? <Spinner size="sm" /> : 'Start'}
          </Button>
        )}
        
        {status === 'Running' && (
          <Button 
            size="sm" 
            variant="outline-secondary"
            disabled={isUpdating}
            onClick={() => handleStatusUpdate(_id, 'Closed')}
          >
            {isUpdating ? <Spinner size="sm" /> : 'Close'}
          </Button>
        )}
        
        {status !== 'Closed' && status !== 'Cancelled' && (
          <Button 
            size="sm" 
            variant="outline-danger"
            disabled={isUpdating}
            onClick={() => handleStatusUpdate(_id, 'Cancelled')}
          >
            {isUpdating ? <Spinner size="sm" /> : 'Cancel'}
          </Button>
        )}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading && projects.length === 0) {
    return (
      <>
        <Navigation />
        <Container className="mt-4">
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading projects...</p>
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
              <h2 className="mb-0">Projects List</h2>
              <small className="text-light">Manage and track your projects</small>
            </Col>
            <Col xs="auto">
              <Link to="/add-project" className="btn btn-light">
                Add New Project
              </Link>
            </Col>
          </Row>
        </Container>
      </header>

      <Container className="mt-4">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Header>
                <Row className="align-items-center">
                  <Col>
                    <h4 className="mb-0">
                      All Projects 
                      {pagination && (
                        <small className="text-muted ms-2">
                          ({pagination.totalProjects} total)
                        </small>
                      )}
                    </h4>
                  </Col>
                </Row>
                
                {/* Filters Row */}
                <Row className="mt-3">
                  <Col md={3}>
                    <Form.Control
                      type="text"
                      placeholder="Search projects..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                    />
                  </Col>
                  <Col md={2}>
                    <Form.Select
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                      <option value="">All Status</option>
                      <option value="Registered">Registered</option>
                      <option value="Running">Running</option>
                      <option value="Closed">Closed</option>
                      <option value="Cancelled">Cancelled</option>
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Form.Select
                      value={filters.department}
                      onChange={(e) => handleFilterChange('department', e.target.value)}
                    >
                      <option value="">All Departments</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                      <option value="Sales">Sales</option>
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Form.Select
                      value={`${filters.sortBy}-${filters.sortOrder}`}
                      onChange={(e) => {
                        const [sortBy, sortOrder] = e.target.value.split('-');
                        handleFilterChange('sortBy', sortBy);
                        handleFilterChange('sortOrder', sortOrder);
                      }}
                    >
                      <option value="createdAt-desc">Newest First</option>
                      <option value="createdAt-asc">Oldest First</option>
                      <option value="projectName-asc">Name A-Z</option>
                      <option value="projectName-desc">Name Z-A</option>
                      <option value="startDate-desc">Start Date (Latest)</option>
                      <option value="endDate-asc">End Date (Earliest)</option>
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <Button variant="outline-secondary" onClick={fetchProjects}>
                      <i className="bi bi-arrow-clockwise me-1"></i>
                      Refresh
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              
              <Card.Body>
                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      className="ms-2"
                      onClick={fetchProjects}
                    >
                      Retry
                    </Button>
                  </Alert>
                )}

                {projects.length === 0 && !loading ? (
                  <div className="text-center py-5">
                    <div className="mb-3">
                      <i className="bi bi-folder" style={{fontSize: '3rem', color: '#6c757d'}}></i>
                    </div>
                    <h5 className="text-muted">No Projects Found</h5>
                    <p className="text-muted">
                      {filters.search || filters.status || filters.department
                        ? 'Try adjusting your filters or search terms.'
                        : 'Start by creating your first project.'
                      }
                    </p>
                    <Link to="/add-project" className="btn btn-primary">
                      Create First Project
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <Table hover>
                        <thead className="table-dark">
                          <tr>
                            <th>Project Name</th>
                            <th>Department</th>
                            <th>Location</th>
                            <th>Manager</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.map((project) => (
                            <tr key={project._id}>
                              <td>
                                <strong>{project.projectName}</strong>
                                {project.isDelayed && (
                                  <Badge bg="warning" className="ms-2">Delayed</Badge>
                                )}
                              </td>
                              <td>{project.department}</td>
                              <td>{project.location}</td>
                              <td>{project.manager}</td>
                              <td>{formatDate(project.startDate)}</td>
                              <td>{formatDate(project.endDate)}</td>
                              <td>{getStatusBadge(project.status)}</td>
                              <td>{getStatusButtons(project)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <small className="text-muted">
                          Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to{' '}
                          {Math.min(pagination.currentPage * pagination.limit, pagination.totalProjects)} of{' '}
                          {pagination.totalProjects} projects
                        </small>
                        <div>
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            disabled={!pagination.hasPrevPage}
                            onClick={() => handleFilterChange('page', pagination.currentPage - 1)}
                          >
                            Previous
                          </Button>
                          
                          <span className="mx-2">
                            Page {pagination.currentPage} of {pagination.totalPages}
                          </span>
                          
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            disabled={!pagination.hasNextPage}
                            onClick={() => handleFilterChange('page', pagination.currentPage + 1)}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Projects;