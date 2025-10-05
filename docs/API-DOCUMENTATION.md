# 📡 API Documentation

> Complete API reference for the MERN Project Management System

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Projects API](#projects-api)
- [Dashboard API](#dashboard-api)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

## Overview

### Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Response Format

All API responses follow this standard format:

```json
{
  "status": "success" | "error",
  "message": "Human-readable message",
  "data": {
    // Response data
  }
}
```

### Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication API

### Register User

Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Access:** Public

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Validation:**
- `name`: Required, minimum 2 characters
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters

**Success Response (201):**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "60d5ec49f1b2c72b8c8e4f1a",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
```json
// 400 - Validation Error
{
  "status": "error",
  "message": "Please provide name, email, and password"
}

// 400 - User Exists
{
  "status": "error",
  "message": "User with this email already exists"
}
```

---

### Login User

Authenticate a user and receive a JWT token.

**Endpoint:** `POST /api/auth/login`

**Access:** Public

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "60d5ec49f1b2c72b8c8e4f1a",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
```json
// 401 - Invalid Credentials
{
  "status": "error",
  "message": "Invalid user credentials"
}

// 401 - Account Deactivated
{
  "status": "error",
  "message": "Account is deactivated. Please contact administrator."
}
```

---

### Get Current User

Retrieve the authenticated user's profile.

**Endpoint:** `GET /api/auth/me`

**Access:** Private (Requires JWT)

**Headers:**
```http
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "60d5ec49f1b2c72b8c8e4f1a",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user",
      "createdAt": "2025-10-01T10:30:00.000Z"
    }
  }
}
```

---

### Forgot Password

Request a password reset email.

**Endpoint:** `POST /api/auth/forgot-password`

**Access:** Public

**Request Body:**
```json
{
  "email": "john.doe@example.com"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Password reset instructions sent to your email"
}
```

---

### Reset Password

Reset password using a token.

**Endpoint:** `POST /api/auth/reset-password`

**Access:** Public

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "password": "newSecurePassword123"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Password reset successful"
}
```

---

## 📁 Projects API

### Get All Projects

Retrieve a paginated list of projects with filtering and search.

**Endpoint:** `GET /api/projects`

**Access:** Private

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |
| `search` | string | '' | Search across name, manager, location |
| `status` | string | '' | Filter by status |
| `department` | string | '' | Filter by department |
| `location` | string | '' | Filter by location |
| `sortBy` | string | 'createdAt' | Sort field |
| `sortOrder` | string | 'desc' | Sort order (asc/desc) |

**Example Request:**
```http
GET /api/projects?page=1&limit=10&status=Running&department=IT&search=website
```

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "projects": [
      {
        "_id": "60d5ec49f1b2c72b8c8e4f1a",
        "projectName": "E-Commerce Website",
        "department": "IT",
        "location": "Pune",
        "manager": "Amit Kumar",
        "startDate": "2025-09-01T00:00:00.000Z",
        "endDate": "2025-12-31T00:00:00.000Z",
        "status": "Running",
        "description": "Building a modern e-commerce platform",
        "priority": "High",
        "isDelayed": false,
        "durationInDays": 121,
        "createdBy": {
          "_id": "60d5ec49f1b2c72b8c8e4f1b",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "createdAt": "2025-09-01T10:00:00.000Z",
        "updatedAt": "2025-10-01T15:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalProjects": 48,
      "hasNextPage": true,
      "hasPrevPage": false,
      "limit": 10
    },
    "filters": {
      "search": "website",
      "status": "Running",
      "department": "IT",
      "location": null,
      "sortBy": "createdAt",
      "sortOrder": "desc"
    }
  }
}
```

---

### Create Project

Create a new project.

**Endpoint:** `POST /api/projects`

**Access:** Private

**Request Body:**
```json
{
  "projectName": "Mobile App Development",
  "department": "IT",
  "location": "Mumbai",
  "manager": "Rajesh Sharma",
  "startDate": "2025-11-01",
  "endDate": "2026-03-31",
  "description": "Developing a mobile application for customer engagement",
  "priority": "High"
}
```

**Validation Rules:**

| Field | Required | Type | Constraints |
|-------|----------|------|-------------|
| `projectName` | Yes | String | Max 200 characters |
| `department` | Yes | Enum | IT, HR, Finance, Marketing, Operations, Sales |
| `location` | Yes | Enum | Pune, Mumbai, Bangalore, Hyderabad, Gurugram, Noida, Nagpur, Wardha |
| `manager` | Yes | String | - |
| `startDate` | Yes | Date | - |
| `endDate` | Yes | Date | Must be after startDate |
| `description` | No | String | Max 1000 characters |
| `priority` | No | Enum | Low, Medium, High, Critical (Default: Medium) |

**Success Response (201):**
```json
{
  "status": "success",
  "message": "Project created successfully",
  "data": {
    "project": {
      "_id": "60d5ec49f1b2c72b8c8e4f1c",
      "projectName": "Mobile App Development",
      "department": "IT",
      "location": "Mumbai",
      "manager": "Rajesh Sharma",
      "startDate": "2025-11-01T00:00:00.000Z",
      "endDate": "2026-03-31T00:00:00.000Z",
      "status": "Registered",
      "description": "Developing a mobile application for customer engagement",
      "priority": "High",
      "createdBy": {
        "_id": "60d5ec49f1b2c72b8c8e4f1b",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2025-10-05T10:00:00.000Z"
    }
  }
}
```

**Error Responses:**
```json
// 400 - Validation Error
{
  "status": "error",
  "message": "Please provide all required fields: projectName, department, location, startDate, endDate, manager"
}

// 400 - Date Validation
{
  "status": "error",
  "message": "End date must be after start date"
}
```

---

### Update Project Status

Update the status of a project.

**Endpoint:** `PATCH /api/projects/:id/status`

**Access:** Private

**URL Parameters:**
- `id`: Project ID

**Request Body:**
```json
{
  "status": "Running"
}
```

**Valid Status Values:**
- `Registered` - Initial status
- `Running` - Project in progress
- `Closed` - Successfully completed
- `Cancelled` - Project cancelled

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Project status updated successfully",
  "data": {
    "project": {
      "_id": "60d5ec49f1b2c72b8c8e4f1c",
      "projectName": "Mobile App Development",
      "status": "Running",
      // ... other fields
    }
  }
}
```

---

### Get Single Project

Retrieve details of a specific project.

**Endpoint:** `GET /api/projects/:id`

**Access:** Private

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "project": {
      "_id": "60d5ec49f1b2c72b8c8e4f1c",
      "projectName": "Mobile App Development",
      // ... all project fields
    }
  }
}
```

---

### Update Project

Update project details.

**Endpoint:** `PUT /api/projects/:id`

**Access:** Private

**Request Body:** (All fields optional)
```json
{
  "projectName": "Updated Project Name",
  "department": "Marketing",
  "description": "Updated description"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Project updated successfully",
  "data": {
    "project": {
      // Updated project object
    }
  }
}
```

---

### Delete Project

Delete a project.

**Endpoint:** `DELETE /api/projects/:id`

**Access:** Private (Admin only)

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Project deleted successfully"
}
```

---

## 📊 Dashboard API

### Get Dashboard Counters

Retrieve statistical counters for the dashboard.

**Endpoint:** `GET /api/dashboard/counters`

**Access:** Private

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "counters": {
      "totalProjects": 48,
      "closedProjects": 12,
      "runningProjects": 25,
      "cancelledProjects": 3,
      "closureDelay": 8
    }
  }
}
```

**Counter Definitions:**
- `totalProjects`: All projects regardless of status
- `closedProjects`: Projects with status "Closed"
- `runningProjects`: Projects with status "Running"
- `cancelledProjects`: Projects with status "Cancelled"
- `closureDelay`: Running projects past their end date

---

### Get Chart Data

Retrieve department-wise completion data for charts.

**Endpoint:** `GET /api/dashboard/chart-data`

**Access:** Private

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "chartData": [
      {
        "department": "IT",
        "total": 15,
        "closed": 8
      },
      {
        "department": "HR",
        "total": 10,
        "closed": 6
      },
      {
        "department": "Finance",
        "total": 8,
        "closed": 5
      },
      {
        "department": "Marketing",
        "total": 12,
        "closed": 7
      },
      {
        "department": "Operations",
        "total": 6,
        "closed": 4
      },
      {
        "department": "Sales",
        "total": 9,
        "closed": 3
      }
    ]
  }
}
```

---

## ⚠️ Error Handling

### Standard Error Response

```json
{
  "status": "error",
  "message": "Error description",
  "errors": [] // Optional: Array of specific validation errors
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request - Validation error |
| `401` | Unauthorized - Invalid/missing token |
| `404` | Not Found - Resource doesn't exist |
| `500` | Internal Server Error |

### Common Errors

**401 Unauthorized:**
```json
{
  "status": "error",
  "message": "No authorization token provided"
}
```

**401 Invalid Token:**
```json
{
  "status": "error",
  "message": "Invalid or expired token"
}
```

**404 Not Found:**
```json
{
  "status": "error",
  "message": "Project not found"
}
```

**500 Server Error:**
```json
{
  "status": "error",
  "message": "Server error during operation"
}
```

---

## 🔒 Rate Limiting

Currently, no rate limiting is implemented. Consider adding in production:

```javascript
// Recommended limits
- Login: 5 requests per 15 minutes
- Registration: 3 requests per hour
- API calls: 100 requests per 15 minutes
```

---

## 📝 Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Projects (with token)
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "projectName": "Test Project",
    "department": "IT",
    "location": "Pune",
    "manager": "Test Manager",
    "startDate": "2025-11-01",
    "endDate": "2025-12-31",
    "description": "Test project description"
  }'
```

---

## 📮 Testing with Postman

1. Import the API collection
2. Set up environment variables:
   - `baseUrl`: http://localhost:5000/api
   - `token`: (will be set after login)
3. Test authentication flow
4. Use token for protected endpoints

---

**Last Updated:** October 5, 2025

For support or questions, please open an issue on GitHub.
