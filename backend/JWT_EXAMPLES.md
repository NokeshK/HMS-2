# JWT Token Examples & Test Commands

## 🔑 Complete JWT Token Flow

### 1. Register a New User
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@example.com",
    "password": "password123",
    "name": "John Doe",
    "role": "patient",
    "phone": "+1234567890",
    "address": "123 Main St",
    "dateOfBirth": "1990-01-01",
    "bloodGroup": "O+",
    "emergencyContact": "+1234567891"
  }'
```

**Response:**
```json
{
  "id": 1,
  "email": "patient@example.com",
  "name": "John Doe",
  "role": "PATIENT"
}
```

### 2. Login to Get JWT Token
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYXRpZW50QGV4YW1wbGUuY29tIiwiaWF0IjoxNzM1Mzg5NjAwLCJleHAiOjE3MzU0NzYwMDB9.signature",
  "user": {
    "id": 1,
    "email": "patient@example.com",
    "name": "John Doe",
    "role": "patient"
  }
}
```

### 3. Use Token in API Requests

**Save token to variable:**
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Get Patient Profile:**
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8081/api/patients/profile
```

**Get Appointments:**
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8081/api/appointments/patient
```

**Get Doctors:**
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8081/api/doctors
```

### 4. Validate Token
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8081/api/auth/validate
```

**Response:**
```json
{
  "valid": true,
  "user": {
    "id": 1,
    "email": "patient@example.com",
    "name": "John Doe",
    "role": "PATIENT"
  }
}
```

## 📋 Complete Test Script

```bash
#!/bin/bash

API_URL="http://localhost:8081"

echo "=== Testing JWT Token Flow ==="
echo ""

# 1. Register
echo "1. Registering user..."
REGISTER_RESPONSE=$(curl -s -X POST $API_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User",
    "role": "patient"
  }')
echo "Register Response: $REGISTER_RESPONSE"
echo ""

# 2. Login
echo "2. Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }')

# Extract token
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "Token: ${TOKEN:0:50}..."
echo ""

# 3. Validate Token
echo "3. Validating token..."
curl -s -H "Authorization: Bearer $TOKEN" \
  $API_URL/api/auth/validate | jq .
echo ""

# 4. Use Token
echo "4. Getting patient profile..."
curl -s -H "Authorization: Bearer $TOKEN" \
  $API_URL/api/patients/profile | jq .
```

## 🔍 Decode JWT Token (for debugging)

### Using Online Tool
1. Go to https://jwt.io
2. Paste your token
3. View decoded payload

### Using Command Line
```bash
# Install jq if needed: brew install jq

# Decode JWT token (without verification)
TOKEN="your-token-here"
echo $TOKEN | cut -d'.' -f2 | base64 -d | jq .
```

## 🧪 Test Different Roles

### Doctor Login
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "password": "doctor123"
  }'
```

### Admin Login
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

## 📝 Token Payload Example

When decoded, a token looks like:

```json
{
  "sub": "patient@example.com",
  "iat": 1735389600,
  "exp": 1735476000
}
```

- **sub**: Subject (user email)
- **iat**: Issued at (timestamp)
- **exp**: Expiration (timestamp)

## 🔐 Frontend Usage

### Store Token
```javascript
// After login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const data = await response.json();
localStorage.setItem('token', data.token);
```

### Use Token in Requests
```javascript
const token = localStorage.getItem('token');

fetch('/api/patients/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## ⚠️ Common Errors

### 401 Unauthorized
- Token expired → Re-login
- Invalid token → Check token format
- Missing Authorization header → Add "Bearer <token>"

### 403 Forbidden
- Token valid but insufficient permissions
- Check user role matches required role

### Token Malformed
- Ensure token starts with "Bearer "
- Check token hasn't been corrupted
- Verify token is complete (3 parts separated by dots)

