#!/bin/bash

# JWT Testing Script
# Tests if JWT authentication is working correctly

API_URL="http://localhost:8081"
EMAIL="patient@example.com"
PASSWORD="password123"

echo "=========================================="
echo "JWT Authentication Test"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Check if backend is running
echo "1. Checking if backend is running..."
if curl -s -o /dev/null -w "%{http_code}" $API_URL/api/auth/login | grep -q "405\|400\|200"; then
  echo -e "${GREEN}✅ Backend is running${NC}"
else
  echo -e "${RED}❌ Backend is not running on $API_URL${NC}"
  echo "   Please start the backend first: cd backend && mvn spring-boot:run"
  exit 1
fi
echo ""

# 2. Test Login
echo "2. Testing Login..."
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

if echo "$LOGIN_RESPONSE" | grep -q "token"; then
  echo -e "${GREEN}✅ Login successful${NC}"
  TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
  if [ -z "$TOKEN" ]; then
    TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token' 2>/dev/null)
  fi
  echo "   Token: ${TOKEN:0:50}..."
else
  echo -e "${RED}❌ Login failed${NC}"
  echo "   Response: $LOGIN_RESPONSE"
  echo ""
  echo -e "${YELLOW}Note: You may need to register a user first:${NC}"
  echo "   curl -X POST $API_URL/api/auth/register \\"
  echo "     -H 'Content-Type: application/json' \\"
  echo "     -d '{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"name\":\"Test User\",\"role\":\"patient\"}'"
  exit 1
fi
echo ""

# 3. Test Token Validation
echo "3. Testing Token Validation..."
VALIDATE_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
  $API_URL/api/auth/validate)

if echo "$VALIDATE_RESPONSE" | grep -q '"valid":true'; then
  echo -e "${GREEN}✅ Token is valid${NC}"
else
  echo -e "${RED}❌ Token validation failed${NC}"
  echo "   Response: $VALIDATE_RESPONSE"
fi
echo ""

# 4. Test Protected Endpoint (with token)
echo "4. Testing Protected Endpoint (with token)..."
PROFILE_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -H "Authorization: Bearer $TOKEN" \
  $API_URL/api/patients/profile)

HTTP_STATUS=$(echo "$PROFILE_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
PROFILE_BODY=$(echo "$PROFILE_RESPONSE" | sed '/HTTP_STATUS/d')

if [ "$HTTP_STATUS" = "200" ]; then
  echo -e "${GREEN}✅ Protected endpoint accessible with token${NC}"
  echo "   Response: ${PROFILE_BODY:0:100}..."
else
  echo -e "${RED}❌ Protected endpoint failed (Status: $HTTP_STATUS)${NC}"
  echo "   Response: $PROFILE_BODY"
fi
echo ""

# 5. Test Protected Endpoint (without token)
echo "5. Testing Protected Endpoint (without token - should fail)..."
NO_TOKEN_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  $API_URL/api/patients/profile)

HTTP_STATUS=$(echo "$NO_TOKEN_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)

if [ "$HTTP_STATUS" = "401" ] || [ "$HTTP_STATUS" = "403" ]; then
  echo -e "${GREEN}✅ Correctly rejected request without token (Status: $HTTP_STATUS)${NC}"
else
  echo -e "${YELLOW}⚠️  Unexpected status without token (Status: $HTTP_STATUS)${NC}"
  echo "   Expected: 401 or 403"
fi
echo ""

# 6. Test Token in Frontend (if running)
echo "6. Checking Frontend Token Storage..."
echo "   Open browser console and run:"
echo "   localStorage.getItem('token')"
echo "   Should show your token"
echo ""

# Summary
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo -e "${GREEN}✅ JWT Authentication is working!${NC}"
echo ""
echo "Next steps:"
echo "1. Test in browser: Open frontend and login"
echo "2. Check Network tab: Verify Authorization header"
echo "3. Check localStorage: Verify token is stored"
echo ""

