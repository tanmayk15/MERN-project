# 🚀 MERN Project Management System

A modern, full-stack web application for managing projects with real-time analytics and intuitive user interface.

[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18.2-blue?logo=express)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green?logo=node.js)](https://nodejs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.1-purple?logo=bootstrap)](https://getbootstrap.com/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API (Quick Reference)](#-api-quick-reference)
- [Status Workflow](#-status-workflow)
- [Routes](#-routes)
- [Deployment Summary](#-deployment-summary)
- [Troubleshooting](#-troubleshooting)
- [What Not to Commit](#-what-not-to-commit)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

The application provides secure project tracking with analytics (departmental distribution, completion metrics) and a modern responsive UI. Built with the MERN stack and structured for clarity and maintainability.

### Highlights
✅ Secure JWT auth + password reset
✅ Project lifecycle & status workflow
✅ Search / filter / sort / paginate projects
✅ Dashboard counters + Highcharts visualizations
✅ Indian city location support
✅ Modern gradient UI + responsive design

---

## ✨ Features

### Authentication
- Register / Login
- JWT (7‑day expiry)
- Password reset request + token-based reset
- Bcrypt password hashing

### Projects
- Create with validation
- Advanced filtering (status, department, location)
- Text search (name, manager, location, description)
- Sort (date, name, newest/oldest)
- Pagination (default 10/page)
- Status transitions with safeguards

### Dashboard
- Total / Running / Closed / Cancelled / Delayed counters
- Department-wise (total vs closed) chart

### UX
- Floating label forms
- Status badges
- Mobile-friendly layout
- Accessible structure

---

## 🛠️ Tech Stack
| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, React Router 6, Bootstrap 5, Axios, Highcharts |
| Backend | Node.js, Express.js, Mongoose, JWT, bcryptjs, CORS, dotenv |
| Database | MongoDB Atlas |
| Tooling | nodemon, Git, Postman |

---

## 📁 Project Structure
```
backend/
  config/            # DB connection
  controllers/       # auth, project, dashboard
  middleware/        # auth middleware
  models/            # User, Project
  routes/            # Express routers
  server.js          # App entry
  .env.example
frontend/
  public/
  src/
    pages/           # Login, Register, ForgotPassword, Dashboard, Projects, AddProject
    services/        # API service wrappers
    context/         # Auth context (if implemented)
    components/
    App.js / index.js
  .env.example
docs/                # Extended documentation set
```

---

## 🚀 Getting Started

### Prerequisites
Node.js 16+, MongoDB Atlas account, Git.

### Backend Setup
```powershell
cd backend
copy .env.example .env
npm install
npm run dev
```
Edit `.env` values (Mongo URI, JWT secret, etc.). Health check: `http://localhost:5000/api/health`.

### Frontend Setup
```powershell
cd frontend
copy .env.example .env
npm install
npm start
```
App: `http://localhost:3000`.

---

## 📡 API (Quick Reference)
Base URL (dev): `http://localhost:5000/api`

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login (JWT) |
| POST | /auth/forgot-password | Request password reset |
| POST | /auth/reset-password | Complete password reset |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /projects | List (search/filter/paginate) |
| POST | /projects | Create project |
| PATCH | /projects/:id/status | Update status |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /dashboard/counters | KPI counters |
| GET | /dashboard/chart | Department data |

Auth header:
```
Authorization: Bearer <token>
```
Full details: `docs/API-DOCUMENTATION.md`

---

## 🔄 Status Workflow
```
Registered → Running → Closed
              ↘
               Cancelled
```
Invalid transitions rejected with 400.

---

## 🧭 Routes
| Path | Access | Purpose |
|------|--------|---------|
| / | Public | Redirect logic |
| /login | Public | Login form |
| /register | Public | Registration |
| /forgot-password | Public | Reset request |
| /dashboard | Protected | Analytics |
| /projects | Protected | Browse/manage |
| /add-project | Protected | Create project |

---

## 🚢 Deployment Summary
1. Deploy backend (Render/Railway) – set env: `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`.
2. Deploy frontend (Vercel/Netlify) – set `REACT_APP_API_URL`.
3. Adjust CORS origins.
4. Verify auth, project CRUD, dashboard data.
Full guide: `docs/DEPLOYMENT-GUIDE.md`.

---

## 🛠️ Troubleshooting (Common)
| Issue | Cause | Fix |
|-------|-------|-----|
| Mongo connect fail | IP not whitelisted | Add 0.0.0.0/0 in Atlas (dev) |
| CORS error | Origin mismatch | Update CORS + FRONTEND_URL |
| 401 Unauthorized | Missing/expired token | Re-login, resend request |
| Empty projects | No data / auth fail | Create project / check token |
| Reset email missing | SMTP not set | Implement mailer (prod) |
More: `docs/SETUP-GUIDE.md#-troubleshooting`.

---

## 📦 What Not to Commit
| Do NOT Commit | Reason |
|---------------|--------|
| backend/.env / frontend/.env | Secrets |
| node_modules/ | Reinstallable |
| *.log | Noise |
| build/ or dist/ | Generated |
| coverage/ | Test output |
| .DS_Store / Thumbs.db | System |

Examples tracked instead: `.env.example`.

---

## 🤝 Contributing
```powershell
git checkout -b feature/your-feature
# make changes
git commit -m "feat: add your feature"
git push origin feature/your-feature
```
Then open a Pull Request with description & screenshots (if UI).

Guidelines: small focused functions, validate inputs, update docs when adding features.

---

## 🙌 Support
| Type | Action |
|------|--------|
| Bug | Open GitHub Issue |
| Feature | Create Feature Request |
| Question | Discussions / Issues |

---


   - Register a new user
   - Login
   - Test password reset

2. **Test Project Management:**
   - Create a project
   - View projects list
   - Update project status
   - Check dashboard analytics

3. **Monitor Performance:**
   - Check response times
   - Monitor error logs
   - Set up uptime monitoring (UptimeRobot, Pingdom)

**📋 For detailed deployment instructions, see [DEPLOYMENT-GUIDE.md](docs/DEPLOYMENT-GUIDE.md)**

---

## 🧪 Testing

### Backend Testing

```powershell
cd backend

# Health check
curl http://localhost:5000/api/health

# Test authentication
# (Use Postman or cURL with the endpoints above)
```

### Frontend Testing

```powershell
cd frontend

# Run tests (if configured)
npm test

# Build for production
npm run build
```

### Test User Flow

1. **Register** a new account at `/register`
2. **Login** with your credentials at `/login`
3. **View Dashboard** to see analytics
4. **Create a Project** at `/add-project`
5. **View Projects** at `/projects`
6. **Update Status** by clicking Start/Close/Cancel buttons
7. **Test Search** and filtering options
8. **Test Forgot Password** flow

---

## 🔧 Troubleshooting

### Common Issues

#### MongoDB Connection Failed

**Error:** `MongooseError: Could not connect to any servers`

**Solution:**
1. Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for development)
2. Verify connection string in `.env`
3. Ensure username/password are correct
4. Check if database user has read/write permissions

#### CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Ensure backend CORS is configured with frontend URL
2. Check `server.js` has correct CORS settings
3. For production, update CORS origin to match frontend domain

#### JWT Token Errors

**Error:** `No token provided` or `Invalid token`

**Solution:**
1. Check if token is being sent in Authorization header
2. Verify JWT_SECRET is same on server and during token creation
3. Check token expiration (7 days default)
4. Clear localStorage and login again

#### Frontend Not Connecting to Backend

**Error:** Network errors or `Cannot connect to server`

**Solution:**
1. Ensure backend is running on port 5000
2. Check `package.json` proxy setting in frontend
3. Verify API calls use correct base URL
4. Check browser console for specific error messages

#### Projects Not Showing

**Solution:**
1. Check if user is authenticated (token in localStorage)
2. Verify MongoDB has data in `projects` collection
3. Check browser console for API errors
4. Test API endpoint directly with Postman/cURL

**📋 For comprehensive troubleshooting, see [SETUP-GUIDE.md](docs/SETUP-GUIDE.md#-troubleshooting)**

---

## 📚 Additional Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[SETUP-GUIDE.md](docs/SETUP-GUIDE.md)** - Detailed installation and configuration guide with MongoDB Atlas setup
- **[API-DOCUMENTATION.md](docs/API-DOCUMENTATION.md)** - Complete API reference with request/response examples
- **[DEPLOYMENT-GUIDE.md](docs/DEPLOYMENT-GUIDE.md)** - Production deployment instructions for multiple platforms
- **[FEATURES.md](docs/FEATURES.md)** - Comprehensive feature documentation with usage examples
- **[DOCUMENTATION-CONSOLIDATION.md](docs/DOCUMENTATION-CONSOLIDATION.md)** - Documentation review summary

---

## 🎯 Features Roadmap

### ✅ Current Features (v1.0)

- [x] User authentication (register, login, password reset)
- [x] JWT-based authorization
- [x] Project CRUD operations
- [x] Advanced search and filtering
- [x] Pagination
- [x] Status workflow management
- [x] Dashboard analytics with charts
- [x] Responsive modern UI
- [x] Indian city locations support

### 🔮 Upcoming Features (v2.0)

- [ ] Role-based access control (Admin, Manager, User)
- [ ] Project assignment to team members
- [ ] Task management within projects
- [ ] File attachments
- [ ] Comments and collaboration
- [ ] Email notifications
- [ ] Real-time updates with WebSockets
- [ ] Export to PDF/Excel
- [ ] Advanced reporting
- [ ] Calendar integration
- [ ] Time tracking
- [ ] Gantt charts
- [ ] Resource allocation

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
   ```powershell
   git clone https://github.com/your-username/mern-project-management.git
   ```

2. **Create a feature branch**
   ```powershell
   git checkout -b feature/AmazingFeature
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments where necessary
   - Update documentation if needed

4. **Commit your changes**
   ```powershell
   git commit -m 'Add some AmazingFeature'
   ```

5. **Push to the branch**
   ```powershell
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Wait for review

### Code Style Guidelines

- Use meaningful variable and function names
- Follow ESLint rules
- Write clear comments
- Keep functions small and focused
- Use async/await for asynchronous operations

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 📞 Support & Contact

### Getting Help

- 📖 **Documentation:** Check the `/docs` folder for comprehensive guides
- 🐛 **Issues:** [Open an issue](https://github.com/your-repo/issues) on GitHub
- 💬 **Discussions:** [Join discussions](https://github.com/your-repo/discussions)

### Project Maintainers

This project is actively maintained and updated.

### Acknowledgments

- MongoDB Atlas for cloud database hosting
- Highcharts for beautiful data visualizations
- Bootstrap for responsive UI components
- The MERN community for inspiration and support

---

## 🌟 Show Your Support

If you find this project helpful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Built with ❤️ using the MERN Stack**

MongoDB • Express.js • React • Node.js

**Last Updated:** October 5, 2025

</div>

