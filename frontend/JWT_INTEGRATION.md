# JWT Token Integration - Frontend Update

## ✅ What Was Updated

The frontend has been updated to use a centralized JWT token management system. All API requests now automatically include the JWT token in the Authorization header.

## 📁 New Files Created

### `src/utils/api.js`
Centralized API utility that:
- Automatically adds JWT token to all requests
- Handles token expiration (401 errors)
- Provides helper functions for GET, POST, PUT, DELETE
- Manages token storage (localStorage)

## 🔄 Updated Files

### 1. `src/contexts/AuthContext.jsx`
- Now uses `api.js` utilities
- Simplified login/register/logout functions
- Automatic token validation

### 2. `src/components/Dashboard/PatientDashboard.jsx`
- All fetch calls updated to use `apiGetJSON`, `apiPutJSON`
- Removed manual token handling
- Cleaner, more maintainable code

### 3. `src/pages/AppointmentsPage.jsx`
- Updated to use API utilities
- Consistent error handling

### 4. `src/components/Modals/BookAppointmentModal.jsx`
- Uses `apiPostJSON` for booking appointments
- Automatic token inclusion

## 🚀 How to Use

### Making API Requests

**Before (Old Way):**
```javascript
const token = localStorage.getItem('token');
const response = await fetch(`${API_URL}/api/endpoint`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
const data = await response.json();
```

**After (New Way):**
```javascript
import { apiGetJSON, apiPostJSON, apiPutJSON, apiDeleteJSON } from '../utils/api';

// GET request
const data = await apiGetJSON('/api/patients/profile');

// POST request
const result = await apiPostJSON('/api/appointments/book', appointmentData);

// PUT request
await apiPutJSON('/api/appointments/123/status', { status: 'CANCELLED' });

// DELETE request
await apiDeleteJSON('/api/resource/123');
```

### Available Functions

#### Token Management
```javascript
import { getToken, setToken, removeToken, isAuthenticated } from '../utils/api';

const token = getToken();        // Get current token
setToken(newToken);              // Set token
removeToken();                   // Remove token
const isAuth = isAuthenticated(); // Check if authenticated
```

#### API Requests
```javascript
import { 
  apiRequest,      // Generic request
  apiGet,          // GET request (returns Response)
  apiPost,         // POST request (returns Response)
  apiPut,          // PUT request (returns Response)
  apiDelete,       // DELETE request (returns Response)
  apiGetJSON,      // GET with JSON parsing
  apiPostJSON,     // POST with JSON parsing
  apiPutJSON,      // PUT with JSON parsing
  apiDeleteJSON,   // DELETE with JSON parsing
} from '../utils/api';
```

## 🔐 Automatic Features

### 1. Token Inclusion
All requests automatically include:
```
Authorization: Bearer <token>
```

### 2. Token Expiration Handling
If a request returns 401 (Unauthorized):
- Token is automatically removed
- User is redirected to login page
- No manual error handling needed

### 3. Error Handling
All API functions handle:
- Network errors
- JSON parsing errors
- HTTP error statuses

## 📝 Example Usage

### Fetching Patient Data
```javascript
const fetchPatientData = async () => {
  try {
    const data = await apiGetJSON('/api/patients/profile');
    setPatientData(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Booking Appointment
```javascript
const bookAppointment = async (appointmentData) => {
  try {
    const result = await apiPostJSON('/api/appointments/book', appointmentData);
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
  }
};
```

### Updating Appointment Status
```javascript
const cancelAppointment = async (appointmentId) => {
  try {
    await apiPutJSON(`/api/appointments/${appointmentId}/status`, {
      status: 'CANCELLED'
    });
    // Success - refresh data
    fetchAppointments();
  } catch (error) {
    alert('Failed to cancel appointment');
  }
};
```

## 🔄 Migration Guide

If you have other components using manual fetch calls:

1. **Import the API utility:**
   ```javascript
   import { apiGetJSON, apiPostJSON } from '../utils/api';
   ```

2. **Replace fetch calls:**
   ```javascript
   // OLD
   const token = localStorage.getItem('token');
   const response = await fetch(url, {
     headers: { 'Authorization': `Bearer ${token}` }
   });
   const data = await response.json();
   
   // NEW
   const data = await apiGetJSON('/api/endpoint');
   ```

3. **Remove manual token handling:**
   - No need to get token from localStorage
   - No need to add Authorization header
   - No need to check response.ok

## ✅ Benefits

1. **Consistency**: All API calls use the same pattern
2. **Security**: Token automatically included, no chance of forgetting
3. **Maintainability**: Single place to update token handling
4. **Error Handling**: Centralized 401 handling
5. **Cleaner Code**: Less boilerplate, more readable

## 🐛 Troubleshooting

### Token Not Being Sent
- Check if token exists: `localStorage.getItem('token')`
- Verify API utility is imported correctly
- Check browser console for errors

### 401 Errors
- Token may be expired - user will be redirected to login
- Check backend JWT secret matches
- Verify token format is correct

### CORS Issues
- Ensure backend CORS is configured
- Check `VITE_API_URL` environment variable

## 📚 Related Documentation

- Backend JWT Guide: `backend/JWT_TOKEN_GUIDE.md`
- Backend JWT Examples: `backend/JWT_EXAMPLES.md`
- Backend JWT Code: `backend/JWT_CODE_SUMMARY.md`

