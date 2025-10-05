import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/dashboard" className="fw-bold">
          📊 Project Management
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              onClick={() => navigate('/dashboard')}
              className={isActive('/dashboard') ? 'active fw-bold' : ''}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              onClick={() => navigate('/projects')}
              className={isActive('/projects') ? 'active fw-bold' : ''}
            >
              Projects
            </Nav.Link>
            <Nav.Link 
              onClick={() => navigate('/add-project')}
              className={isActive('/add-project') ? 'active fw-bold' : ''}
            >
              Add Project
            </Nav.Link>
          </Nav>
          
          <Nav>
            <NavDropdown 
              title={
                <span>
                  <i className="bi bi-person-circle me-1"></i>
                  {user?.name || 'User'}
                </span>
              } 
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item disabled>
                <small className="text-muted">
                  Signed in as<br />
                  <strong>{user?.email}</strong>
                </small>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;