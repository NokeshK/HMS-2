import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { validateToken, login as apiLogin, register as apiRegister, logout as apiLogout, getToken } from '../utils/api';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if token exists and validate it
    const token = getToken();
    if (token) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await validateToken();
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const result = await apiLogin(email, password);
      if (result.success) {
        setUser(result.user);
        // Navigate to dashboard after successful login
        if (window.location.pathname === '/login' || window.location.pathname === '/register') {
          window.location.href = '/dashboard';
        }
        return true;
      } else {
        console.error('Login failed:', result.error);
        return false;
      }
    } catch (error) {
      console.error('Network error:', error);
      return false;
    }
  };

  const register = async (userData) => {
    const result = await apiRegister(userData);
    return result;
  };

  const logout = () => {
    setUser(null);
    apiLogout();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}