import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectService } from '../services/projectService';
import Navigation from '../components/Navigation';

const AddProject = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    department: '',
    manager: '',
    location: '',
    startDate: '',
    endDate: '',
    status: 'Registered'
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general error
    if (error) setError(null);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.projectName.trim()) {
      errors.projectName = 'Project name is required';
    } else if (formData.projectName.length < 3) {
      errors.projectName = 'Project name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }

    if (!formData.department) {
      errors.department = 'Department is required';
    }

    if (!formData.manager.trim()) {
      errors.manager = 'Manager name is required';
    }

    if (!formData.location) {
      errors.location = 'Location is required';
    }

    if (!formData.startDate) {
      errors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      errors.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      errors.endDate = 'End date must be after start date';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      setError('Please fix the validation errors below');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await projectService.createProject(formData);
      
      setSuccess('Project created successfully!');
      
      // Reset form
      setFormData({
        projectName: '',
        description: '',
        department: '',
        manager: '',
        location: '',
        startDate: '',
        endDate: '',
        status: 'Registered'
      });
      
      // Redirect to projects page after 2 seconds
      setTimeout(() => {
        navigate('/projects');
      }, 2000);
      
    } catch (error) {
      console.error('Create project error:', error);
      
      if (error.response?.data?.errors) {
        // Handle validation errors from backend
        const backendErrors = {};
        error.response.data.errors.forEach(err => {
          backendErrors[err.field] = err.message;
        });
        setFormErrors(backendErrors);
      }
      
      setError(error.message || 'Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <>
      <Navigation />
      <header className="main-header">
        <Container>
          <Row>
            <Col>
              <h2 className="mb-0">Add New Project</h2>
              <small className="text-light">Create a new project to track and manage</small>
            </Col>
            <Col xs="auto">
              <Link to="/projects" className="btn btn-light">
                <i className="bi bi-arrow-left me-1"></i>
                Back to Projects
              </Link>
            </Col>
          </Row>
        </Container>
      </header>

      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card>
              <Card.Header>
                <h4 className="mb-0">
                  <i className="bi bi-plus-circle me-2"></i>
                  Project Details
                </h4>
              </Card.Header>
              
              <Card.Body>
                {error && (
                  <Alert variant="danger" className="mb-3">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert variant="success" className="mb-3">
                    <i className="bi bi-check-circle me-2"></i>
                    {success}
                    <div className="mt-2">
                      <small className="text-muted">
                        Redirecting to projects page...
                      </small>
                    </div>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Project Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="projectName"
                          value={formData.projectName}
                          onChange={handleChange}
                          isInvalid={!!formErrors.projectName}
                          placeholder="Enter project name"
                          disabled={loading}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.projectName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Department <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          isInvalid={!!formErrors.department}
                          disabled={loading}
                        >
                          <option value="">Select Department</option>
                          <option value="IT">IT</option>
                          <option value="HR">HR</option>
                          <option value="Finance">Finance</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Operations">Operations</option>
                          <option value="Sales">Sales</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {formErrors.department}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Manager <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="manager"
                          value={formData.manager}
                          onChange={handleChange}
                          isInvalid={!!formErrors.manager}
                          placeholder="Enter manager name"
                          disabled={loading}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.manager}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Location <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          isInvalid={!!formErrors.location}
                          disabled={loading}
                        >
                          <option value="">Select Location</option>
                          <option value="Pune">Pune</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Bangalore">Bangalore</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Gurugram">Gurugram</option>
                          <option value="Noida">Noida</option>
                          <option value="Nagpur">Nagpur</option>
                          <option value="Wardha">Wardha</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {formErrors.location}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Start Date <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          isInvalid={!!formErrors.startDate}
                          min={getTodayDate()}
                          disabled={loading}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.startDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          End Date <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          isInvalid={!!formErrors.endDate}
                          min={formData.startDate || getTodayDate()}
                          disabled={loading}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.endDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Description <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          isInvalid={!!formErrors.description}
                          placeholder="Enter project description (minimum 10 characters)"
                          disabled={loading}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.description}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                          {formData.description.length}/10 characters minimum
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-4">
                        <Form.Label>Initial Status</Form.Label>
                        <Form.Select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          disabled={loading}
                        >
                          <option value="Registered">Registered</option>
                          <option value="Running">Running</option>
                        </Form.Select>
                        <Form.Text className="text-muted">
                          Projects are typically started as "Registered" status
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link 
                          to="/projects" 
                          className={`btn btn-outline-secondary ${loading ? 'disabled' : ''}`}
                        >
                          Cancel
                        </Link>
                        <Button 
                          type="submit" 
                          variant="primary" 
                          disabled={loading}
                          className="px-4"
                        >
                          {loading ? (
                            <>
                              <Spinner 
                                as="span" 
                                animation="border" 
                                size="sm" 
                                className="me-2" 
                              />
                              Creating...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-plus-circle me-2"></i>
                              Create Project
                            </>
                          )}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddProject;