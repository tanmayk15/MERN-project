@echo off
echo ========================================
echo   MERN Project Management System
echo   Phase 1 - Development Setup
echo ========================================
echo.

echo [1/3] Starting Backend Server...
echo.
cd /d "%~dp0backend"
start "Backend Server" cmd /k "npm run dev"

echo [2/3] Waiting 3 seconds for backend to initialize...
timeout /t 3 /nobreak >nul

echo [3/3] Starting Frontend Server...
echo.
cd /d "%~dp0frontend"
start "Frontend Server" cmd /k "npm start"

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Backend: http://localhost:5000/api/health
echo Frontend: http://localhost:3000
echo.
echo Note: Backend requires MongoDB to be running
echo Install MongoDB or use MongoDB Atlas
echo.
echo Press any key to exit...
pause >nul