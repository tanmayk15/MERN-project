import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const features = [
    {
      icon: '🔐',
      title: 'Secure Authentication',
      description: 'JWT-based authentication with encrypted passwords and secure token management',
      color: '#667eea'
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Interactive dashboards with department-wise insights and project metrics',
      color: '#764ba2'
    },
    {
      icon: '🚀',
      title: 'Project Lifecycle',
      description: 'Complete project workflow from registration to closure with status tracking',
      color: '#f093fb'
    },
    {
      icon: '🔍',
      title: 'Advanced Search',
      description: 'Powerful filtering, sorting, and search across all project attributes',
      color: '#4facfe'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Beautiful UI that works seamlessly across all devices and screen sizes',
      color: '#43e97b'
    },
    {
      icon: '⚡',
      title: 'Fast Performance',
      description: 'Optimized queries and efficient data handling for lightning-fast responses',
      color: '#fa709a'
    }
  ];

  const stats = [
    { value: '100%', label: 'Secure', color: '#667eea' },
    { value: '24/7', label: 'Available', color: '#764ba2' },
    { value: '<100ms', label: 'Response', color: '#f093fb' },
    { value: '99.9%', label: 'Uptime', color: '#4facfe' }
  ];

  const workflow = [
    { step: '1', title: 'Register', description: 'Create your account', icon: '👤' },
    { step: '2', title: 'Create Project', description: 'Add project details', icon: '📝' },
    { step: '3', title: 'Track Progress', description: 'Monitor status updates', icon: '📈' },
    { step: '4', title: 'Analyze Data', description: 'View insights & reports', icon: '📊' }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-icon">🚀</div>
            <span className="brand-text">MERN Project Manager</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#workflow">How It Works</a>
            <a href="#tech">Technology</a>
            <Link to="/login" className="btn-nav-login">Login</Link>
            <Link to="/register" className="btn-nav-signup">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text fade-in-section">
            <h1 className="hero-title">
              Manage Projects
              <span className="gradient-text"> Effortlessly</span>
            </h1>
            <p className="hero-subtitle">
              A modern, full-stack project management solution built with the MERN stack. 
              Track projects, analyze performance, and collaborate seamlessly.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn-primary-hero">
                Start Free Today
                <span className="btn-arrow">→</span>
              </Link>
              <a href="#features" className="btn-secondary-hero">
                Explore Features
              </a>
            </div>
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item" style={{ '--stat-color': stat.color }}>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-illustration fade-in-section">
            <div className="floating-card card-1">
              <div className="card-header">
                <div className="card-dot"></div>
                <div className="card-dot"></div>
                <div className="card-dot"></div>
              </div>
              <div className="card-content">
                <div className="card-title">Dashboard Analytics</div>
                <div className="card-chart">
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                  <div className="chart-bar" style={{ height: '85%' }}></div>
                  <div className="chart-bar" style={{ height: '45%' }}></div>
                  <div className="chart-bar" style={{ height: '95%' }}></div>
                </div>
              </div>
            </div>
            <div className="floating-card card-2">
              <div className="card-content">
                <div className="project-item">
                  <div className="project-icon">📁</div>
                  <div className="project-info">
                    <div className="project-name">Website Redesign</div>
                    <div className="project-status status-running">Running</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="floating-card card-3">
              <div className="card-content">
                <div className="notification-item">
                  <div className="notif-icon">✓</div>
                  <div className="notif-text">Project completed successfully</div>
                </div>
              </div>
            </div>
            <div className="hero-circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-3"></div>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header fade-in-section">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">Everything you need to manage projects efficiently</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card fade-in-section" style={{ '--feature-color': feature.color }}>
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-overlay"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="workflow-section">
        <div className="section-container">
          <div className="section-header fade-in-section">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Get started in four simple steps</p>
          </div>
          <div className="workflow-container">
            {workflow.map((item, index) => (
              <React.Fragment key={index}>
                <div className="workflow-item fade-in-section">
                  <div className="workflow-icon-wrapper">
                    <span className="workflow-icon">{item.icon}</span>
                    <div className="workflow-step">{item.step}</div>
                  </div>
                  <h3 className="workflow-title">{item.title}</h3>
                  <p className="workflow-description">{item.description}</p>
                </div>
                {index < workflow.length - 1 && (
                  <div className="workflow-arrow fade-in-section">
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <path d="M10 20 L30 20 M30 20 L25 15 M30 20 L25 25" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="tech" className="tech-section">
        <div className="section-container">
          <div className="section-header fade-in-section">
            <h2 className="section-title">Built With Modern Technology</h2>
            <p className="section-subtitle">Powered by the MERN stack for optimal performance</p>
          </div>
          <div className="tech-grid">
            <div className="tech-card fade-in-section">
              <div className="tech-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
                </svg>
              </div>
              <h3 className="tech-name">MongoDB</h3>
              <p className="tech-description">NoSQL database for flexible data storage</p>
            </div>
            <div className="tech-card fade-in-section">
              <div className="tech-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"/>
                </svg>
              </div>
              <h3 className="tech-name">Express.js</h3>
              <p className="tech-description">Fast & minimalist web framework</p>
            </div>
            <div className="tech-card fade-in-section">
              <div className="tech-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
                </svg>
              </div>
              <h3 className="tech-name">React</h3>
              <p className="tech-description">Component-based UI library</p>
            </div>
            <div className="tech-card fade-in-section">
              <div className="tech-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
                </svg>
              </div>
              <h3 className="tech-name">Node.js</h3>
              <p className="tech-description">JavaScript runtime environment</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container fade-in-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">Join thousands managing projects efficiently</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-cta-primary">
                Create Free Account
                <span className="btn-sparkle">✨</span>
              </Link>
              <Link to="/login" className="btn-cta-secondary">
                Sign In
              </Link>
            </div>
          </div>
          <div className="cta-decoration">
            <div className="decoration-circle decoration-1"></div>
            <div className="decoration-circle decoration-2"></div>
            <div className="decoration-circle decoration-3"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="brand-icon">🚀</div>
                <span>MERN Project Manager</span>
              </div>
              <p className="footer-tagline">
                Built with ❤️ using the MERN Stack
              </p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#workflow">How It Works</a>
                <a href="#tech">Technology</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">Documentation</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 MERN Project Manager. All rights reserved.</p>
            <p className="footer-tech">MongoDB • Express.js • React • Node.js</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
