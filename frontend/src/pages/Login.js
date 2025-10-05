import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Show error alert when error occurs
  useEffect(() => {
    if (error) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      return;
    }

    try {
      await login(formData.email, formData.password);
      // Navigation will be handled by useEffect above
    } catch (error) {
      // Error is handled by the context
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <style jsx>{`
        .login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .login-wrapper {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          max-width: 900px;
          width: 100%;
        }
        
        .left-section {
          background: linear-gradient(135deg, #5a9fd4 0%, #306998 100%);
          color: white;
          padding: 60px 40px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        
        .left-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" style="stop-color:%23ffffff;stop-opacity:0.1"/><stop offset="100%" style="stop-color:%23ffffff;stop-opacity:0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="600" cy="700" r="120" fill="url(%23a)"/></svg>');
          opacity: 0.5;
        }
        
        .illustration {
          position: relative;
          z-index: 1;
          margin-bottom: 30px;
        }
        
        .illustration svg {
          width: 200px;
          height: 200px;
        }
        
        .right-section {
          padding: 60px 50px;
        }
        
        .welcome-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 10px;
        }
        
        .welcome-subtitle {
          color: #7f8c8d;
          font-size: 1.1rem;
          margin-bottom: 30px;
        }
        
        .form-floating {
          margin-bottom: 20px;
        }
        
        .form-floating input {
          border: 2px solid #e9ecef;
          border-radius: 12px;
          padding: 20px 15px;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        
        .form-floating input:focus {
          border-color: #5a9fd4;
          box-shadow: 0 0 0 0.2rem rgba(90, 159, 212, 0.25);
        }
        
        .form-floating label {
          color: #7f8c8d;
        }
        
        .login-btn {
          background: linear-gradient(135deg, #5a9fd4 0%, #306998 100%);
          border: none;
          border-radius: 12px;
          padding: 15px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          width: 100%;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(90, 159, 212, 0.3);
        }
        
        .signup-btn {
          background: transparent;
          border: 2px solid #5a9fd4;
          border-radius: 12px;
          padding: 15px;
          font-size: 16px;
          font-weight: 600;
          color: #5a9fd4;
          width: 100%;
          transition: all 0.3s ease;
        }
        
        .signup-btn:hover {
          background: #5a9fd4;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(90, 159, 212, 0.3);
        }
        
        .forgot-password {
          color: #5a9fd4;
          text-decoration: none;
          font-size: 14px;
          display: block;
          text-align: center;
          margin-top: 20px;
        }
        
        .forgot-password:hover {
          color: #306998;
          text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          .left-section {
            display: none;
          }
          
          .welcome-title {
            font-size: 2rem;
          }
          
          .right-section {
            padding: 40px 30px;
          }
        }
      `}</style>
      
      <div className="login-wrapper">
        <Row className="g-0 h-100">
          {/* Left Section - Illustration */}
          <Col lg={6} className="d-none d-lg-block">
            <div className="left-section">
              <div className="illustration">
                <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Modern illustration SVG */}
                  <rect x="50" y="80" width="200" height="140" rx="20" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                  <circle cx="150" cy="120" r="25" fill="rgba(255,255,255,0.2)"/>
                  <rect x="80" y="160" width="140" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>
                  <rect x="80" y="180" width="100" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
                  <circle cx="320" cy="100" r="40" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                  <path d="M300 100 L310 110 L340 80" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="280" y="180" width="80" height="60" rx="15" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                  <circle cx="320" cy="200" r="8" fill="rgba(255,255,255,0.3)"/>
                  <rect x="300" y="220" width="40" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
                </svg>
              </div>
              <h2 style={{position: 'relative', zIndex: 1, fontSize: '2.2rem', fontWeight: '700', marginBottom: '15px'}}>
                Welcome Back!
              </h2>
              <p style={{position: 'relative', zIndex: 1, fontSize: '1.1rem', opacity: '0.9', lineHeight: '1.6'}}>
                Manage your projects efficiently with our comprehensive project management system.
              </p>
            </div>
          </Col>
          
          {/* Right Section - Login Form */}
          <Col lg={6}>
            <div className="right-section">
              <div className="text-center mb-4 d-lg-none">
                <h1 className="welcome-title">Welcome!</h1>
                <p className="welcome-subtitle">Sign in to your account</p>
              </div>
              
              <div className="d-none d-lg-block mb-4">
                <h1 className="welcome-title">Welcome!</h1>
                <p className="welcome-subtitle">Sign in to your account</p>
              </div>
              
              {/* Error Alert */}
              {showAlert && error && (
                <Alert variant="danger" dismissible onClose={() => setShowAlert(false)} className="mb-4">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <div className="form-floating">
                  <Form.Control
                    type="email"
                    name="email"
                    id="floatingEmail"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  <label htmlFor="floatingEmail">Email Address</label>
                </div>
                
                <div className="form-floating">
                  <Form.Control
                    type="password"
                    name="password"
                    id="floatingPassword"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                
                <Button 
                  type="submit" 
                  className="login-btn"
                  disabled={isLoading || !formData.email || !formData.password}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Signing In...
                    </>
                  ) : (
                    'SIGN IN'
                  )}
                </Button>
              </Form>
              
              <Link to="/register" className="text-decoration-none">
                <Button className="signup-btn">
                  SIGN UP
                </Button>
              </Link>
              
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;