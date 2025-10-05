# MongoDB Atlas Setup Guide

Follow these steps to connect your MERN backend to MongoDB Atlas (free cloud database):

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas/database
2. Click "Try Free" and create an account
3. Choose the FREE tier (M0 Sandbox)

## Step 2: Create a Cluster
1. Choose a cloud provider (AWS recommended)
2. Choose a region closest to you
3. Keep cluster name as "Cluster0" or change to "MernCluster"
4. Click "Create Cluster"

## Step 3: Create Database User
1. In the Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `mernUser` (or your preferred username)
5. Password: Generate a secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

## Step 4: Configure Network Access
1. Go to "Network Access" in Atlas dashboard
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0) for development
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" in Atlas dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select Node.js and version 4.1 or later
5. Copy the connection string

## Step 6: Update Your .env File
Replace the connection string in `backend/.env`:

```env
MONGO_URI=mongodb+srv://mernUser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mern_project?retryWrites=true&w=majority&appName=Cluster0
```

**Important:** Replace:
- `mernUser` with your actual username
- `YOUR_PASSWORD` with your actual password
- `cluster0.xxxxx.mongodb.net` with your actual cluster address
- `mern_project` is your database name (you can keep this)

## Step 7: Test Connection
Run your backend server:
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

## Step 8: Verify API
Open browser and go to: http://localhost:5000/api/health

You should see:
```json
{
  "status": "ok",
  "message": "Backend server is running successfully",
  "timestamp": "2025-09-29T...",
  "environment": "development"
}
```

## Troubleshooting
- **Authentication failed**: Check username/password in connection string
- **Network timeout**: Ensure IP address is whitelisted in Network Access
- **Database connection error**: Verify the connection string format

## Security Notes
- Never commit your actual .env file to version control
- Use strong passwords for database users
- In production, restrict IP access to your server's IP only

---
**Once MongoDB is connected, you're ready for Phase 2: API Development! 🚀**