# 🧪 Project Management APIs Testing Guide

## 🔐 Prerequisites
First, get your JWT token by logging in:

```powershell
$loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"john.doe@example.com","password":"securepass123"}'
$token = $loginResponse.data.token
$headers = @{ "Authorization" = "Bearer $token" }
```

## 📋 Project Management Endpoints

### 1. Create a New Project
```powershell
$projectData = @{
    projectName = "E-Commerce Platform"
    department = "IT"
    location = "New York"
    startDate = "2025-01-15"
    endDate = "2025-06-15"
    manager = "John Smith"
    description = "Building a modern e-commerce platform"
    priority = "High"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/projects" -Method POST -ContentType "application/json" -Body $projectData -Headers $headers
```

### 2. Get All Projects (with pagination)
```powershell
# Basic list
Invoke-RestMethod -Uri "http://localhost:5000/api/projects" -Method GET -Headers $headers

# With search and pagination
Invoke-RestMethod -Uri "http://localhost:5000/api/projects?page=1&limit=5&search=commerce&sortBy=projectName&sortOrder=asc" -Method GET -Headers $headers

# Filter by status
Invoke-RestMethod -Uri "http://localhost:5000/api/projects?status=Running" -Method GET -Headers $headers

# Filter by department
Invoke-RestMethod -Uri "http://localhost:5000/api/projects?department=IT" -Method GET -Headers $headers
```

### 3. Get Single Project
```powershell
# Replace PROJECT_ID with actual project ID from previous responses
Invoke-RestMethod -Uri "http://localhost:5000/api/projects/PROJECT_ID" -Method GET -Headers $headers
```

### 4. Update Project Status (Start/Close/Cancel)
```powershell
# Start a project
$statusUpdate = @{ status = "Running" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/projects/PROJECT_ID/status" -Method PATCH -ContentType "application/json" -Body $statusUpdate -Headers $headers

# Close a project
$statusUpdate = @{ status = "Closed" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/projects/PROJECT_ID/status" -Method PATCH -ContentType "application/json" -Body $statusUpdate -Headers $headers

# Cancel a project
$statusUpdate = @{ status = "Cancelled" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/projects/PROJECT_ID/status" -Method PATCH -ContentType "application/json" -Body $statusUpdate -Headers $headers
```

### 5. Update Project Details
```powershell
$updateData = @{
    projectName = "Advanced E-Commerce Platform"
    description = "Updated project description"
    priority = "Critical"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/projects/PROJECT_ID" -Method PUT -ContentType "application/json" -Body $updateData -Headers $headers
```

## 📊 Dashboard Endpoints

### 1. Get Dashboard Counters
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/counters" -Method GET -Headers $headers
```

Expected Response:
```json
{
  "status": "success",
  "data": {
    "counters": {
      "total": 10,
      "closed": 3,
      "running": 5,
      "cancelled": 1,
      "registered": 1,
      "runningDelayed": 2,
      "completed": 3,
      "active": 6,
      "completionRate": 30,
      "onTimeDelivery": 60
    }
  }
}
```

### 2. Get Department-wise Chart Data
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/chart" -Method GET -Headers $headers
```

Expected Response:
```json
{
  "status": "success",
  "data": {
    "chartData": {
      "categories": ["IT", "HR", "Finance"],
      "series": [
        {
          "name": "Completed",
          "data": [75, 50, 25],
          "color": "#28a745"
        }
      ]
    },
    "tableData": [...],
    "summary": {
      "totalDepartments": 3,
      "averageCompletion": 50
    }
  }
}
```

### 3. Get Timeline Statistics
```powershell
# Monthly timeline
Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/timeline?period=month" -Method GET -Headers $headers

# Weekly timeline
Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/timeline?period=week" -Method GET -Headers $headers

# Yearly timeline
Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/timeline?period=year" -Method GET -Headers $headers
```

## 🧪 Complete Testing Workflow

### Step 1: Create Sample Projects
```powershell
# Create multiple projects for testing
$projects = @(
    @{
        projectName = "CRM System"
        department = "IT"
        location = "Chicago"
        startDate = "2025-02-01"
        endDate = "2025-05-30"
        manager = "Sarah Johnson"
        description = "Customer relationship management system"
    },
    @{
        projectName = "HR Portal"
        department = "HR"
        location = "Los Angeles"
        startDate = "2025-01-01"
        endDate = "2025-04-01"
        manager = "Mike Wilson"
        description = "Employee self-service portal"
    },
    @{
        projectName = "Budget Planning Tool"
        department = "Finance"
        location = "New York"
        startDate = "2025-03-01"
        endDate = "2025-08-01"
        manager = "Lisa Chen"
        description = "Annual budget planning and tracking"
    }
)

foreach ($project in $projects) {
    $projectJson = $project | ConvertTo-Json
    $result = Invoke-RestMethod -Uri "http://localhost:5000/api/projects" -Method POST -ContentType "application/json" -Body $projectJson -Headers $headers
    Write-Host "Created project: $($result.data.project.projectName) with ID: $($result.data.project._id)"
}
```

### Step 2: Update Project Statuses
```powershell
# Get all projects and update their statuses
$allProjects = Invoke-RestMethod -Uri "http://localhost:5000/api/projects" -Method GET -Headers $headers

# Update first project to Running
if ($allProjects.data.projects.Count -gt 0) {
    $projectId = $allProjects.data.projects[0]._id
    $statusUpdate = @{ status = "Running" } | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:5000/api/projects/$projectId/status" -Method PATCH -ContentType "application/json" -Body $statusUpdate -Headers $headers
}

# Update second project to Closed
if ($allProjects.data.projects.Count -gt 1) {
    $projectId = $allProjects.data.projects[1]._id
    $statusUpdate = @{ status = "Closed" } | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:5000/api/projects/$projectId/status" -Method PATCH -ContentType "application/json" -Body $statusUpdate -Headers $headers
}
```

### Step 3: Test Dashboard APIs
```powershell
# Get updated counters
Write-Host "=== Dashboard Counters ==="
$counters = Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/counters" -Method GET -Headers $headers
$counters.data.counters

# Get chart data
Write-Host "=== Department Chart Data ==="
$chartData = Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/chart" -Method GET -Headers $headers
$chartData.data.tableData
```

## ✅ Expected Results
After running the complete workflow, you should see:
- Multiple projects created in different departments
- Various project statuses (Registered, Running, Closed)
- Dashboard counters reflecting the project states
- Department-wise completion percentages
- Search and filtering working correctly

## 🔍 Error Testing
Test error scenarios:
```powershell
# Invalid project creation (missing required fields)
$invalidProject = @{ projectName = "Test" } | ConvertTo-Json
try {
    Invoke-RestMethod -Uri "http://localhost:5000/api/projects" -Method POST -ContentType "application/json" -Body $invalidProject -Headers $headers
} catch {
    Write-Host "Expected validation error: $($_.Exception.Message)"
}

# Invalid status update
$invalidStatus = @{ status = "InvalidStatus" } | ConvertTo-Json
try {
    Invoke-RestMethod -Uri "http://localhost:5000/api/projects/PROJECT_ID/status" -Method PATCH -ContentType "application/json" -Body $invalidStatus -Headers $headers
} catch {
    Write-Host "Expected status validation error: $($_.Exception.Message)"
}
```

This comprehensive testing will verify all your project management and dashboard APIs are working correctly! 🚀