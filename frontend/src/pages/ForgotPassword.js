import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await authService.forgotPassword(email);
      setEmailSent(true);
      setMessage('Password reset instructions have been sent to your email address.');
    } catch (error) {
      console.error('Forgot password error:', error);
      setError(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <style jsx>{`
        .forgot-password-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .forgot-password-wrapper {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          max-width: 500px;
          width: 100%;
          padding: 60px 50px;
        }
        
        .title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 10px;
          text-align: center;
        }
        
        .subtitle {
          color: #7f8c8d;
          font-size: 1.1rem;
          margin-bottom: 30px;
          text-align: center;
          line-height: 1.6;
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
        
        .submit-btn {
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
        
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(90, 159, 212, 0.3);
        }
        
        .back-to-login {
          color: #5a9fd4;
          text-decoration: none;
          font-size: 14px;
          display: block;
          text-align: center;
          margin-top: 20px;
        }
        
        .back-to-login:hover {
          color: #306998;
          text-decoration: underline;
        }
        
        .success-icon {
          font-size: 4rem;
          color: #28a745;
          text-align: center;
          margin-bottom: 20px;
        }
        
        @media (max-width: 768px) {
          .forgot-password-wrapper {
            padding: 40px 30px;
          }
          
          .title {
            font-size: 2rem;
          }
        }
      `}</style>
      
      <div className="forgot-password-wrapper">
        {!emailSent ? (
          <>
            <h1 className="title">Forgot Password?</h1>
            <p className="subtitle">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            
            {error && (
              <Alert variant="danger" className="mb-4">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
              <div className="form-floating">
                <Form.Control
                  type="email"
                  id="floatingEmail"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <label htmlFor="floatingEmail">Email Address</label>
              </div>
              
              <Button 
                type="submit" 
                className="submit-btn"
                disabled={loading || !email}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Sending...
                  </>
                ) : (
                  'Send Reset Instructions'
                )}
              </Button>
            </Form>
            
            <Link to="/login" className="back-to-login">
              <i className="bi bi-arrow-left me-2"></i>
              Back to Login
            </Link>
          </>
        ) : (
          <div className="text-center">
            <div className="success-icon">
              <i className="bi bi-check-circle"></i>
            </div>
            <h1 className="title">Check Your Email</h1>
            <p className="subtitle">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
            
            {message && (
              <Alert variant="success" className="mb-4">
                <i className="bi bi-check-circle me-2"></i>
                {message}
              </Alert>
            )}
            
            <p className="text-muted mb-4" style={{fontSize: '0.9rem'}}>
              Didn't receive the email? Check your spam folder or try again.
            </p>
            
            <Button 
              onClick={() => {
                setEmailSent(false);
                setEmail('');
                setMessage('');
                setError('');
              }}
              variant="outline-primary"
              className="mb-3"
              style={{borderRadius: '12px', padding: '12px 30px'}}
            >
              Try Again
            </Button>
            
            <Link to="/login" className="back-to-login">
              <i className="bi bi-arrow-left me-2"></i>
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;