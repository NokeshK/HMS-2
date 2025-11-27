import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import HeartBeatLogo from '../Brand/HeartBeatLogo.jsx';

export function PrimaryAppBar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goHome = () => {
    navigate('/');
  };

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <HeartBeatLogo size={20} />
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            MedixHub
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={goHome}
            className="px-4 py-2 rounded-md text-sm font-medium text-blue-700 bg-white border border-blue-300 hover:bg-blue-50 dark:bg-gray-700 dark:text-blue-300 dark:border-blue-600 dark:hover:bg-gray-600 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-4 py-2 rounded-md text-sm font-medium text-blue-700 bg-white border border-blue-300 hover:bg-blue-50 dark:bg-gray-700 dark:text-blue-300 dark:border-blue-600 dark:hover:bg-gray-600 transition-colors"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}

export default PrimaryAppBar;
