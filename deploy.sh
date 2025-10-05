#!/bin/bash

# 🚀 MERN Project Deployment Script
# This script helps you deploy your MERN stack application

echo "🚀 MERN Project Deployment Helper"
echo "=================================="
echo ""

# Check if git repository is clean
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes!"
    echo "Please commit all changes before deployment:"
    echo "  git add ."
    echo "  git commit -m 'Prepare for deployment'"
    echo "  git push origin main"
    echo ""
    exit 1
fi

echo "✅ Git repository is clean"
echo ""

echo "📋 Deployment Checklist:"
echo "1. ✅ Code is committed to Git"
echo "2. ⏳ MongoDB Atlas connection string ready"
echo "3. ⏳ JWT secret generated"
echo "4. ⏳ Backend deployment to Render"
echo "5. ⏳ Frontend deployment to Vercel"
echo ""

echo "🔗 Next Steps:"
echo ""
echo "BACKEND DEPLOYMENT (Render):"
echo "1. Go to https://render.com"
echo "2. Sign in with GitHub"
echo "3. Click 'New +' → 'Web Service'"
echo "4. Connect your GitHub repository"
echo "5. Configure:"
echo "   - Name: mern-project-backend"
echo "   - Root Directory: backend"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo "6. Add Environment Variables:"
echo "   - NODE_ENV=production"
echo "   - MONGO_URI=your_mongodb_atlas_uri"
echo "   - JWT_SECRET=your_32_character_secret"
echo "   - FRONTEND_URL=https://your-app.vercel.app"
echo ""

echo "FRONTEND DEPLOYMENT (Vercel):"
echo "1. Go to https://vercel.com"
echo "2. Sign in with GitHub"
echo "3. Click 'New Project'"
echo "4. Import your repository"
echo "5. Configure:"
echo "   - Framework Preset: Create React App"
echo "   - Root Directory: frontend"
echo "   - Build Command: npm run build"
echo "   - Output Directory: build"
echo "6. Add Environment Variable:"
echo "   - REACT_APP_API_URL=https://your-backend.onrender.com/api"
echo ""

echo "🔧 Environment Variables:"
echo "Backend (.env on Render):"
echo "  NODE_ENV=production"
echo "  MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern_project"
echo "  JWT_SECRET=your_super_secure_32_character_secret"
echo "  FRONTEND_URL=https://your-frontend.vercel.app"
echo ""
echo "Frontend (.env on Vercel):"
echo "  REACT_APP_API_URL=https://your-backend.onrender.com/api"
echo ""

echo "🧪 After Deployment - Test URLs:"
echo "Backend Health: https://your-backend.onrender.com/api/health"
echo "Frontend App: https://your-frontend.vercel.app"
echo ""

echo "✅ Deployment preparation complete!"
echo "Follow the steps above to deploy your application."