# How to Check if JWT is Working

## 🧪 Quick Test Methods

### Method 1: Test via Browser Console (Easiest)

1. **Open your frontend** (http://localhost:3000 or your frontend URL)
2. **Open Browser DevTools** (F12 or Right-click → Inspect)
3. **Go to Console tab**
4. **Run these commands:**

```javascript
// 1. Login and get token
fetch('http://localhost:8081/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'patient@example.com',
    password: 'password123'
  })
})
.then(res => res.json())
.then(data => {
  console.log('Login Response:', data);
  if (data.token) {
    localStorage.setItem('token', data.token);
    console.log('✅ Token saved!');
  }
});

// 2. Check if token is stored
console.log('Token:', localStorage.getItem('token'));

// 3. Test protected endpoint
const token = localStorage.getItem('token');
fetch('http://localhost:8081/api/patients/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log('Profile Data:', data))
.catch(err => console.error('Error:', err));
```

### Method 2: Test via Command Line (curl)

```bash
# 1. Login and get token
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"patient@example.com","password":"password123"}' \
  | jq .

# Save token to variable (copy token from response)
TOKEN="your-token-here"

# 2. Test protected endpoint with token
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8081/api/patients/profile

# 3. Validate token
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8081/api/auth/validate
```

### Method 3: Test via Frontend UI

1. **Login through the UI**
   - Go to login page
   - Enter credentials
   - Check browser console for token

2. **Check Network Tab**
   - Open DevTools → Network tab
   - Login again
   - Check the login request response
   - Look for `token` in the response body

3. **Check Subsequent Requests**
   - After login, navigate to dashboard
   - In Network tab, check any API request
   - Look at Request Headers
   - Should see: `Authorization: Bearer <token>`

## ✅ What to Check

### 1. Token Generation (Login)
- ✅ Login endpoint returns `token` in response
- ✅ Token is stored in `localStorage`
- ✅ Token is a long string (JWT format)

### 2. Token Usage (Protected Endpoints)
- ✅ API requests include `Authorization: Bearer <token>` header
- ✅ Protected endpoints return data (not 401/403)
- ✅ Without token, endpoints return 401/403

### 3. Token Validation
- ✅ `/api/auth/validate` returns `{"valid": true}`
- ✅ Token expiration works (after 24 hours)
- ✅ Invalid token returns 401

## 🔍 Debugging Steps

### Step 1: Check Backend is Running
```bash
curl http://localhost:8081/api/auth/login
# Should return error (needs POST), but confirms backend is up
```

### Step 2: Test Login Endpoint
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User",
    "role": "patient"
  }
}
```

### Step 3: Test Token Validation
```bash
# Replace YOUR_TOKEN with actual token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8081/api/auth/validate
```

**Expected Response:**
```json
{
  "valid": true,
  "user": { ... }
}
```

### Step 4: Test Protected Endpoint
```bash
# Without token (should fail)
curl http://localhost:8081/api/patients/profile
# Expected: 401 or 403

# With token (should work)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8081/api/patients/profile
# Expected: 200 with data
```

## 🐛 Common Issues

### Issue 1: Token Not Generated
**Symptoms:** Login returns error or no token
**Check:**
- Backend is running
- Database connection works
- User exists in database
- Password is correct

### Issue 2: Token Not Sent
**Symptoms:** API returns 401 even after login
**Check:**
- Token is in localStorage: `localStorage.getItem('token')`
- Frontend API utility is used
- Authorization header is included

### Issue 3: Token Expired
**Symptoms:** Works initially, then 401 errors
**Check:**
- Token expiration time (default: 24 hours)
- Re-login to get new token

### Issue 4: CORS Errors
**Symptoms:** Browser blocks requests
**Check:**
- Backend CORS configuration
- Frontend URL matches allowed origins

## 📝 Test Script

Save this as `test-jwt.sh`:

```bash
#!/bin/bash

API_URL="http://localhost:8081"
EMAIL="patient@example.com"
PASSWORD="password123"

echo "=== Testing JWT Authentication ==="
echo ""

# 1. Test Login
echo "1. Testing Login..."
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

echo "Login Response: $LOGIN_RESPONSE"
echo ""

# Extract token
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Login failed - No token received"
  exit 1
fi

echo "✅ Token received: ${TOKEN:0:50}..."
echo ""

# 2. Test Token Validation
echo "2. Testing Token Validation..."
VALIDATE_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
  $API_URL/api/auth/validate)

echo "Validate Response: $VALIDATE_RESPONSE"
echo ""

# 3. Test Protected Endpoint
echo "3. Testing Protected Endpoint..."
PROFILE_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
  $API_URL/api/patients/profile)

echo "Profile Response: $PROFILE_RESPONSE"
echo ""

# 4. Test Without Token (should fail)
echo "4. Testing Without Token (should fail)..."
NO_TOKEN_RESPONSE=$(curl -s -w "\nHTTP Status: %{http_code}" \
  $API_URL/api/patients/profile)

echo "$NO_TOKEN_RESPONSE"
echo ""

echo "=== Test Complete ==="
```

Make it executable:
```bash
chmod +x test-jwt.sh
./test-jwt.sh
```

## 🎯 Quick Checklist

- [ ] Backend is running on port 8081
- [ ] Frontend can reach backend
- [ ] Login endpoint returns token
- [ ] Token is stored in localStorage
- [ ] Protected endpoints work with token
- [ ] Protected endpoints fail without token
- [ ] Token validation endpoint works
- [ ] Token expiration works correctly

## 📊 Expected Results

### ✅ Working JWT:
- Login: Returns token
- With Token: API returns 200 + data
- Without Token: API returns 401/403
- Validate: Returns `{"valid": true}`

### ❌ Not Working:
- Login: No token or error
- With Token: Still 401/403
- Token: Not in localStorage
- Validate: Returns `{"valid": false}`

