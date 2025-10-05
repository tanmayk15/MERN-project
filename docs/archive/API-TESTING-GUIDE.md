# Authentication API Testing Guide

## 🧪 Test Your Authentication Endpoints

### Available Endpoints:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### 1. Register a New User
```bash
# PowerShell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -ContentType "application/json" -Body '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

Expected Response:
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login User
```bash
# PowerShell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"john@example.com","password":"password123"}'
```

### 3. Get Current User (Protected Route)
```bash
# PowerShell - Replace YOUR_JWT_TOKEN with actual token from login/register
$headers = @{ "Authorization" = "Bearer YOUR_JWT_TOKEN" }
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/me" -Method GET -Headers $headers
```

### 🔧 Alternative: Use Postman or Insomnia
1. Import the following requests:
   - POST `http://localhost:5000/api/auth/register`
   - POST `http://localhost:5000/api/auth/login`
   - GET `http://localhost:5000/api/auth/me`

2. For protected routes, add header:
   - Key: `Authorization`
   - Value: `Bearer YOUR_JWT_TOKEN`

### ✅ What to Expect:
- Registration creates new user and returns JWT token
- Login validates credentials and returns JWT token
- JWT tokens expire in 7 days
- Protected routes require valid JWT token in Authorization header
- Passwords are automatically hashed using bcrypt