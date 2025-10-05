const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000', // Development
  'https://localhost:3000', // Development HTTPS
  'https://projectmanager-tanmay.vercel.app', // Production frontend (clean URL)
  'https://frontend-dkomc175b-tanmayk15s-projects.vercel.app', // Current Vercel URL
  'https://frontend-qqavbajaw-tanmayk15s-projects.vercel.app', // Previous Vercel URL
  process.env.FRONTEND_URL, // Production frontend from env
  process.env.CORS_ORIGIN // Additional allowed origin
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    // Also allow any vercel.app subdomain for your project
    if (origin && origin.includes('tanmayk15s-projects.vercel.app')) {
      return callback(null, true);
    }
    
    console.log('CORS blocked origin:', origin);
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  credentials: true
}));
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const dashboardRoutes = require('./routes/dashboard');

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok",
    message: "Backend server is running successfully",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Database test endpoint
app.get("/api/db-test", async (req, res) => {
  try {
    const User = require('./models/User');
    
    // Test database connection
    const userCount = await User.countDocuments();
    
    res.json({
      status: "ok",
      message: "Database connection successful",
      userCount: userCount,
      dbName: mongoose.connection.db.databaseName,
      readyState: mongoose.connection.readyState // 1 = connected
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error.message
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/dashboard', dashboardRoutes);

// MongoDB connection
console.log("🔍 Attempting to connect to MongoDB...");
console.log("📝 Connection string:", process.env.MONGO_URI ? "✅ Found" : "❌ Missing");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log("🏁 Database name:", mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("🔍 Full error:", err);
  });

// 404 handler for unmatched routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check available at: http://localhost:${PORT}/api/health`);
});