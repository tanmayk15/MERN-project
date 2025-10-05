# 🚀 Deployment Guide

> Production deployment guide for the MERN Project Management System

## Table of Contents

- [Overview](#overview)
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Database Configuration](#database-configuration)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)
- [Monitoring & Maintenance](#monitoring--maintenance)

---

## 📋 Overview

This guide covers deploying your MERN application to production using popular cloud platforms:

- **Backend**: Render, Railway, or Heroku
- **Frontend**: Vercel or Netlify
- **Database**: MongoDB Atlas (already cloud-based)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All features are tested locally
- [ ] No console.log statements in production code
- [ ] Environment variables are configured
- [ ] MongoDB Atlas cluster is production-ready
- [ ] API endpoints are tested
- [ ] Security best practices implemented
- [ ] CORS settings are correct
- [ ] JWT secret is strong and unique
- [ ] Error handling is comprehensive
- [ ] Code is committed to Git repository

---

## 🔧 Backend Deployment

### Option 1: Deploy to Render (Recommended)

**Why Render?**
- Free tier available
- Automatic deployments from Git
- Easy environment variable management
- Built-in SSL certificates
- Good performance

#### Step 1: Prepare Your Code

1. Ensure your `backend/package.json` has the correct start script:
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     }
   }
   ```

2. Create `backend/.gitignore`:
   ```
   node_modules
   .env
   .env.local
   .env.production
   ```

#### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub/GitLab/Bitbucket
3. Verify your email

#### Step 3: Create New Web Service

1. Click "New +" → "Web Service"
2. Connect your Git repository
3. Configure:
   - **Name**: `mern-project-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main` or `master`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

#### Step 4: Set Environment Variables

In Render dashboard, add these environment variables:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern_project?retryWrites=true&w=majority
JWT_SECRET=your_production_jwt_secret_at_least_32_characters
```

#### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for deployment (2-5 minutes)
3. Your backend will be available at: `https://mern-project-backend.onrender.com`

#### Step 6: Test Backend

```bash
curl https://mern-project-backend.onrender.com/api/health
```

---

### Option 2: Deploy to Railway

#### Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub

#### Step 2: Deploy

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Railway auto-detects Node.js

#### Step 3: Configure

1. Add environment variables in Settings
2. Set root directory to `backend` if needed
3. Railway automatically assigns a URL

---

### Option 3: Deploy to Heroku

#### Step 1: Install Heroku CLI

```bash
# Windows (with Chocolatey)
choco install heroku-cli

# Or download from
https://devcenter.heroku.com/articles/heroku-cli
```

#### Step 2: Login and Create App

```bash
heroku login
cd backend
heroku create mern-project-backend
```

#### Step 3: Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI="your-mongodb-uri"
heroku config:set JWT_SECRET="your-jwt-secret"
```

#### Step 4: Deploy

```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

---

## 🎨 Frontend Deployment

### Option 1: Deploy to Vercel (Recommended)

**Why Vercel?**
- Built for React applications
- Automatic deployments from Git
- Excellent performance (CDN)
- Free SSL certificates
- Zero configuration

#### Step 1: Prepare Your Code

1. Update `frontend/src/services/api.js` with production backend URL:
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 
     (process.env.NODE_ENV === 'production' 
       ? 'https://mern-project-backend.onrender.com/api'
       : 'http://localhost:5000/api');
   ```

2. Create `frontend/.env.production`:
   ```env
   REACT_APP_API_URL=https://mern-project-backend.onrender.com/api
   ```

#### Step 2: Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub

#### Step 3: Deploy

1. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```

2. **Option A - Using Vercel Website:**
   - Click "New Project"
   - Import your Git repository
   - Select `frontend` as root directory
   - Framework Preset: Create React App
   - Click "Deploy"

3. **Option B - Using CLI:**
   ```bash
   cd frontend
   vercel
   ```

#### Step 4: Configure

1. Set environment variables in Vercel dashboard
2. Add `REACT_APP_API_URL`
3. Redeploy if needed

Your app will be available at: `https://your-project.vercel.app`

---

### Option 2: Deploy to Netlify

#### Step 1: Create Netlify Account

1. Go to https://www.netlify.com
2. Sign up with GitHub

#### Step 2: Build Your App

```bash
cd frontend
npm run build
```

#### Step 3: Deploy

**Option A - Drag & Drop:**
1. Go to Netlify dashboard
2. Drag the `build` folder to the deploy area

**Option B - Git Integration:**
1. Click "New site from Git"
2. Choose your repository
3. Build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`

#### Step 4: Environment Variables

1. Go to Site Settings → Build & Deploy → Environment
2. Add `REACT_APP_API_URL`
3. Trigger redeploy

---

## 🍃 Database Configuration

### MongoDB Atlas Production Setup

#### Step 1: Upgrade Cluster (Optional)

1. For production, consider upgrading from M0 (free) to M2 or higher
2. Provides better performance and features
3. Go to Cluster → "Upgrade" button

#### Step 2: Secure Network Access

1. Remove `0.0.0.0/0` (allow from anywhere)
2. Add specific IP addresses:
   - Your backend server IPs (Render/Railway/Heroku)
   - Your office/home IP for admin access

#### Step 3: Database Backups

1. Enable automatic backups (available on paid tiers)
2. Or use mongodump manually:
   ```bash
   mongodump --uri="your-mongodb-uri"
   ```

#### Step 4: Monitor Performance

1. Use MongoDB Atlas monitoring dashboard
2. Set up alerts for:
   - High CPU usage
   - Low available connections
   - Disk space

---

## 🔐 Environment Variables

### Production Environment Variables

#### Backend (.env.production)

```env
# Server
NODE_ENV=production
PORT=5000

# Database
MONGO_URI=mongodb+srv://produser:strongpassword@cluster.mongodb.net/mern_project_prod?retryWrites=true&w=majority

# Security
JWT_SECRET=super_secure_random_string_minimum_64_characters_recommended_for_production
JWT_EXPIRE=7d

# CORS
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://www.yourdomain.com

# Optional
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env.production)

```env
REACT_APP_API_URL=https://your-backend-domain.onrender.com/api
REACT_APP_NAME=MERN Project Management
REACT_APP_VERSION=1.0.0
```

---

## 🔄 Update Backend CORS for Production

In `backend/server.js`, update CORS configuration:

```javascript
const allowedOrigins = [
  'http://localhost:3000', // Development
  'https://your-frontend-domain.vercel.app', // Production
  'https://www.yourdomain.com' // Custom domain
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
```

---

## ✅ Post-Deployment

### Verification Steps

1. **Backend Health Check**
   ```bash
   curl https://your-backend-domain.onrender.com/api/health
   ```

2. **Test Authentication**
   - Register a new user
   - Login
   - Verify JWT token is received

3. **Test CRUD Operations**
   - Create a project
   - List projects
   - Update project status
   - Delete a project

4. **Test Dashboard**
   - Verify counters display
   - Check charts render correctly

5. **Cross-Browser Testing**
   - Chrome
   - Firefox
   - Safari
   - Edge

6. **Mobile Testing**
   - Test on actual mobile devices
   - Check responsive design

### Security Checklist

- [ ] HTTPS enabled (automatic with Vercel/Render)
- [ ] Environment variables secured
- [ ] MongoDB credentials rotated
- [ ] JWT secret is production-ready
- [ ] CORS restricted to your domain
- [ ] Rate limiting enabled (optional)
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (Mongoose handles this)
- [ ] XSS protection enabled
- [ ] Dependencies updated (run `npm audit`)

---

## 📊 Monitoring & Maintenance

### Application Monitoring

1. **Render/Railway/Heroku Logs**
   - Monitor application logs
   - Set up log alerts

2. **MongoDB Atlas Monitoring**
   - Database performance metrics
   - Query optimization

3. **Error Tracking** (Recommended)
   - Sentry: https://sentry.io
   - LogRocket: https://logrocket.com

### Performance Optimization

1. **Backend**
   - Enable compression
   - Add Redis caching (advanced)
   - Database indexing
   - Query optimization

2. **Frontend**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Minification (automatic with build)

### Regular Maintenance

- [ ] Weekly: Check application logs
- [ ] Weekly: Monitor database performance
- [ ] Monthly: Update dependencies
- [ ] Monthly: Review security advisories
- [ ] Quarterly: Database backup verification
- [ ] Quarterly: Performance optimization review

---

## 🔄 Continuous Deployment

### Automatic Deployments

Both Render and Vercel support automatic deployments:

1. **Main Branch** → Production
2. **Develop Branch** → Staging (optional)
3. **Pull Requests** → Preview deployments

### Git Workflow

```bash
# Development
git checkout -b feature/new-feature
# Make changes
git commit -m "Add new feature"
git push origin feature/new-feature
# Create pull request

# After review and merge
git checkout main
git pull origin main
# Automatic deployment triggers
```

---

## 🐛 Troubleshooting Production Issues

### Backend Issues

**Problem:** 502 Bad Gateway

**Solutions:**
- Check backend logs
- Verify environment variables
- Ensure MongoDB is accessible
- Check if port is correct

**Problem:** Authentication not working

**Solutions:**
- Verify JWT_SECRET matches
- Check CORS settings
- Ensure credentials are included in requests

### Frontend Issues

**Problem:** API calls failing

**Solutions:**
- Check REACT_APP_API_URL
- Verify CORS settings
- Check network tab in DevTools

**Problem:** Blank page after deployment

**Solutions:**
- Check build logs
- Verify all dependencies installed
- Check for console errors

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Railway Docs**: https://docs.railway.app/

---

## 🎉 Deployment Complete!

Your MERN application is now live and accessible to users worldwide!

**Production URLs:**
- Frontend: `https://your-project.vercel.app`
- Backend API: `https://your-backend.onrender.com/api`
- Database: MongoDB Atlas (Cloud)

---

**Last Updated:** October 5, 2025

Happy Deploying! 🚀
