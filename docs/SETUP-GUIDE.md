# 🛠️ Setup Guide

> Complete installation and configuration guide for the MERN Project Management System

## Table of Contents

- [Prerequisites](#prerequisites)
- [MongoDB Atlas Setup](#mongodb-atlas-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Configuration](#environment-configuration)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

---

## 📋 Prerequisites

Before starting, ensure you have the following installed on your system:

### Required Software

1. **Node.js (v16.0.0 or higher)**
   - Download: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Git**
   - Download: https://git-scm.com/
   - Verify installation:
     ```bash
     git --version
     ```

3. **Code Editor** (Recommended)
   - Visual Studio Code: https://code.visualstudio.com/
   - Or any IDE of your choice

4. **MongoDB Atlas Account** (Free)
   - Sign up: https://www.mongodb.com/cloud/atlas

### Optional Tools

- **Postman** - For API testing: https://www.postman.com/
- **MongoDB Compass** - GUI for MongoDB: https://www.mongodb.com/products/compass

---

## 🍃 MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create an account
3. Verify your email address

### Step 2: Create a Cluster

1. After logging in, click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select a cloud provider and region (closest to your location)
4. Cluster Name: `MernCluster` (or any name you prefer)
5. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Create Database User

1. In the Security section, click "Database Access"
2. Click "Add New Database User"
3. Choose **Password** authentication
4. Username: `mernuser` (or your choice)
5. Password: Create a strong password (save it securely!)
6. Database User Privileges: **Read and write to any database**
7. Click "Add User"

### Step 4: Configure Network Access

1. In the Security section, click "Network Access"
2. Click "Add IP Address"
3. **For Development:**
   - Click "Allow Access from Anywhere"
   - IP Address: `0.0.0.0/0`
   - Click "Confirm"
4. **For Production:**
   - Add your specific IP address
   - Or your server's IP address

### Step 5: Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: **Node.js**
5. Version: **4.1 or later**
6. Copy the connection string:
   ```
   mongodb+srv://mernuser:<password>@merncluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. Replace `<password>` with your database user password
8. Add database name: `/mern_project` before the `?`
   ```
   mongodb+srv://mernuser:yourpassword@merncluster.xxxxx.mongodb.net/mern_project?retryWrites=true&w=majority
   ```

**Important Notes:**
- If your password contains special characters, URL-encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - `%` → `%25`

---

## 🔧 Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- nodemon (dev dependency)

### Step 3: Configure Environment Variables

1. Locate the `.env` file in the `backend` directory
2. Update it with your configuration:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGO_URI=mongodb+srv://mernuser:yourpassword@merncluster.xxxxx.mongodb.net/mern_project?retryWrites=true&w=majority&appName=MernCluster

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production_2025
NODE_ENV=development
```

**Security Best Practices:**
- Never commit `.env` file to version control
- Use strong, random JWT_SECRET (minimum 32 characters)
- Change JWT_SECRET in production
- Keep MongoDB credentials secure

### Step 4: Start Backend Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### Step 5: Verify Backend

You should see:
```
🔍 Attempting to connect to MongoDB...
📝 Connection string: ✅ Found
🚀 Server running on port 5000
📊 Health check available at: http://localhost:5000/api/health
✅ MongoDB connection successful!
```

Test the health endpoint:
```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/api/health"

# Or visit in browser
http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Backend server is running successfully",
  "timestamp": "2025-10-05T10:30:00.000Z",
  "environment": "development"
}
```

---

## ⚛️ Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

(If you're in backend directory: `cd ../frontend`)

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- bootstrap
- axios
- highcharts
- react-datepicker
- and other dependencies

### Step 3: Start Frontend Server

```bash
npm start
```

The development server will start and automatically open in your default browser at:
```
http://localhost:3000
```

### Step 4: Verify Frontend

You should see:
- Login page with modern gradient design
- No console errors in browser DevTools
- Ability to navigate to register page

---

## 🔐 Environment Configuration

### Backend (.env)

```env
# =================================
# Server Configuration
# =================================
PORT=5000                          # Backend server port

# =================================
# Database Configuration
# =================================
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern_project?retryWrites=true&w=majority&appName=Cluster

# =================================
# JWT Configuration
# =================================
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_recommended
NODE_ENV=development               # development | production

# =================================
# CORS Configuration (Optional)
# =================================
# ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Frontend Environment (Optional)

Create `frontend/.env` if you need custom configuration:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=MERN Project Management
```

---

## ✅ Verification

### Complete System Check

1. **Backend Health Check**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Expected: `{ "status": "ok", ... }`

2. **Register a Test User**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "password": "test123"
     }'
   ```

3. **Login Test User**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "test123"
     }'
   ```

4. **Frontend Access**
   - Open http://localhost:3000
   - You should see the login page
   - Click "Create Account" to test registration
   - Try logging in

5. **Dashboard Access**
   - After login, you should be redirected to dashboard
   - Navigate to "Projects" to see the projects list
   - Try creating a new project

---

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Problem:** "Could not connect to any servers in your MongoDB Atlas cluster"

**Solutions:**
1. Check if IP address is whitelisted (use 0.0.0.0/0 for development)
2. Verify MongoDB URI is correct
3. Ensure password doesn't contain special characters (or is URL-encoded)
4. Check if cluster is active (not paused)
5. Wait 1-2 minutes for IP whitelist changes to apply

**Problem:** "Authentication failed"

**Solutions:**
1. Verify database username and password
2. Check if user has correct permissions
3. Ensure password is URL-encoded if it contains special characters

### Backend Issues

**Problem:** Port 5000 already in use

**Solutions:**
```bash
# Windows PowerShell
netstat -ano | findstr :5000
taskkill /PID <process-id> /F

# Or change port in .env
PORT=5001
```

**Problem:** "Module not found" errors

**Solutions:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Frontend Issues

**Problem:** Port 3000 already in use

**Solutions:**
- Press `Y` when prompted to use a different port
- Or kill the process using port 3000

**Problem:** Blank page or errors

**Solutions:**
1. Check browser console for errors
2. Verify backend is running
3. Clear browser cache
4. Reinstall dependencies:
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

### CORS Issues

**Problem:** "Access-Control-Allow-Origin" error

**Solutions:**
1. Verify backend CORS configuration in `server.js`
2. Ensure frontend is running on http://localhost:3000
3. Check if proxy is configured in frontend `package.json`

### API Connection Issues

**Problem:** API calls failing from frontend

**Solutions:**
1. Verify backend is running on http://localhost:5000
2. Check `frontend/src/services/api.js` base URL
3. Open browser DevTools → Network tab to see request details
4. Ensure JWT token is being sent in headers

---

## 🚀 Quick Start Scripts

For convenience, use the provided startup scripts:

### Windows (PowerShell)

```powershell
# Start both frontend and backend
.\start-dev.ps1
```

### Windows (Command Prompt)

```bash
# Start both frontend and backend
start-dev.bat
```

These scripts will:
1. Open two terminal windows
2. Start backend server in one
3. Start frontend server in another
4. Display status messages

---

## 📝 Post-Setup Checklist

- [ ] MongoDB Atlas cluster created and active
- [ ] Database user created with proper permissions
- [ ] IP address whitelisted (0.0.0.0/0 for development)
- [ ] Backend `.env` file configured correctly
- [ ] Backend dependencies installed (`npm install`)
- [ ] Backend server starts without errors
- [ ] Health endpoint accessible
- [ ] Frontend dependencies installed
- [ ] Frontend server starts without errors
- [ ] Login page displays correctly
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Dashboard displays after login
- [ ] Can navigate between pages

---

## 🎓 Next Steps

After completing the setup:

1. **Explore the Application**
   - Register a user account
   - Login and explore the dashboard
   - Create a few test projects
   - Try different filters and searches

2. **API Testing**
   - Use Postman to test API endpoints
   - Review API documentation
   - Test authentication flows

3. **Customization**
   - Modify UI colors and styles
   - Add custom features
   - Extend functionality

4. **Development**
   - Review code structure
   - Understand data flow
   - Make your first contribution

---

## 📞 Support

If you encounter issues not covered here:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review MongoDB Atlas documentation
3. Check Node.js and npm versions
4. Ensure all prerequisites are met

---

**Last Updated:** October 5, 2025

Happy Coding! 🚀
