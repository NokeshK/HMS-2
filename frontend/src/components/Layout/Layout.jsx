import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Sidebar } from './Sidebar.jsx';
import { Navbar } from './Navbar.jsx';
import { Facebook, Twitter, Instagram, Linkedin, Heart, Mail, Phone, MapPin } from 'lucide-react';

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Hide sidebar for doctor role
  const shouldShowSidebar = user?.role !== 'doctor';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="flex flex-1">
        {shouldShowSidebar && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            user={user}
          />
        )}

        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          shouldShowSidebar
            ? sidebarCollapsed
              ? 'lg:ml-16'
              : 'lg:ml-64'
            : 'ml-0'
        }`}>
          <Navbar onMenuClick={() => shouldShowSidebar ? setSidebarOpen(true) : null} />

          <main className="flex-1 px-4 py-4 lg:px-6 overflow-y-auto" style={{ height: 'calc(100vh - 64px - 80px)' }}>
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Full-width Footer */}
      <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-white rounded-full animate-ping"></div>
        </div>

        <div className="relative z-10 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Heart className="h-8 w-8 text-red-400 animate-pulse" />
                  <span className="text-2xl font-bold">MedixHub</span>
                </div>
                <p className="text-blue-100">
                  Your trusted healthcare management platform. Secure, efficient, and patient-centered care.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com/medixhub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="https://twitter.com/medixhub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="https://instagram.com/medixhub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/company/medixhub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => navigate('/book-appointment')}
                      className="text-blue-100 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      Book Appointment
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/medical-records')}
                      className="text-blue-100 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      Medical Records
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/chat')}
                      className="text-blue-100 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      Messages
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/settings')}
                      className="text-blue-100 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      Settings
                    </button>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 group">
                    <Phone className="h-5 w-5 text-blue-300 group-hover:text-white transition-colors" />
                    <span className="text-blue-100 group-hover:text-white transition-colors">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <Mail className="h-5 w-5 text-blue-300 group-hover:text-white transition-colors" />
                    <span className="text-blue-100 group-hover:text-white transition-colors">support@medixhub.com</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <MapPin className="h-5 w-5 text-blue-300 group-hover:text-white transition-colors" />
                    <span className="text-blue-100 group-hover:text-white transition-colors">123 Health St, Medical City</span>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Stay Updated</h3>
                <p className="text-blue-100">Subscribe to our newsletter for health tips and updates.</p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-300"
                  />
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-200 hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-blue-500 mt-8 pt-6 text-center">
              <p className="text-blue-200">
                © 2025 MedixHub. All rights reserved. | Privacy Policy | Terms of Service
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
