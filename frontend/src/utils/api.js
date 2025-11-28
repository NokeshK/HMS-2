/**
 * API Utility for making authenticated requests with JWT tokens
 * Automatically includes Authorization header with Bearer token
 */

// Get API URL from environment or use current host's IP
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) return envUrl;
  
  // If no env URL, try to construct from current location
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // If accessing via IP, use that IP for API
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return `http://${hostname}:8081`;
    }
  }
  
  // Default fallback
  return '';
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Get the JWT token from localStorage
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Set the JWT token in localStorage
 */
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Remove the JWT token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('token');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Make an authenticated API request
 * Automatically includes JWT token in Authorization header
 * 
 * @param {string} endpoint - API endpoint (e.g., '/api/patients/profile')
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<Response>}
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  // Build full URL
  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${API_BASE_URL}${endpoint}`;

  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Merge options
  const fetchOptions = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, fetchOptions);

    // Handle 401 Unauthorized - token expired or invalid
    if (response.status === 401) {
      removeToken();
      // Redirect to login if not already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      throw new Error('Unauthorized - Please login again');
    }

    return response;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

/**
 * GET request helper
 */
export const apiGet = async (endpoint, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'GET',
  });
};

/**
 * POST request helper
 */
export const apiPost = async (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * PUT request helper
 */
export const apiPut = async (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * DELETE request helper
 */
export const apiDelete = async (endpoint, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'DELETE',
  });
};

/**
 * Parse JSON response with error handling
 */
export const parseJSON = async (response) => {
  const text = await response.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('JSON Parse Error:', error);
    return { error: text };
  }
};

/**
 * Make authenticated request and parse JSON response
 */
export const apiRequestJSON = async (endpoint, options = {}) => {
  const response = await apiRequest(endpoint, options);
  const data = await parseJSON(response);
  
  if (!response.ok) {
    throw new Error(data.error || data.message || `HTTP ${response.status}`);
  }
  
  return data;
};

/**
 * GET request with JSON parsing
 */
export const apiGetJSON = async (endpoint, options = {}) => {
  const response = await apiGet(endpoint, options);
  return parseJSON(response);
};

/**
 * POST request with JSON parsing
 */
export const apiPostJSON = async (endpoint, data, options = {}) => {
  const response = await apiPost(endpoint, data, options);
  return parseJSON(response);
};

/**
 * PUT request with JSON parsing
 */
export const apiPutJSON = async (endpoint, data, options = {}) => {
  const response = await apiPut(endpoint, data, options);
  return parseJSON(response);
};

/**
 * DELETE request with JSON parsing
 */
export const apiDeleteJSON = async (endpoint, options = {}) => {
  const response = await apiDelete(endpoint, options);
  return parseJSON(response);
};

/**
 * Validate JWT token with backend
 */
export const validateToken = async () => {
  try {
    const response = await apiGet('/api/auth/validate');
    if (response.ok) {
      const data = await parseJSON(response);
      return data.valid === true ? data.user : null;
    }
    return null;
  } catch (error) {
    console.error('Token validation failed:', error);
    return null;
  }
};

/**
 * Login and store token
 */
export const login = async (email, password) => {
  try {
    const response = await apiPost('/api/auth/login', { email, password });
    const data = await parseJSON(response);
    
    if (response.ok && data.token) {
      setToken(data.token);
      return { success: true, user: data.user, token: data.token };
    } else {
      return { success: false, error: data.error || 'Login failed' };
    }
  } catch (error) {
    return { success: false, error: error.message || 'Network error' };
  }
};

/**
 * Register new user
 */
export const register = async (userData) => {
  try {
    const response = await apiPost('/api/auth/register', userData);
    const data = await parseJSON(response);
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.error || 'Registration failed' };
    }
  } catch (error) {
    return { success: false, error: error.message || 'Network error' };
  }
};

/**
 * Logout - remove token
 */
export const logout = () => {
  removeToken();
};

