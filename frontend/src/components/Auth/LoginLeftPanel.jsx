import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function LoginLeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-md text-center relative z-10">
        <div className="mb-8">
          <svg className="w-32 h-32 mx-auto mb-4 animate-bounce" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M30 40 L50 20 L70 40 L70 70 L30 70 Z" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="50" cy="35" r="8" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M42 35 L58 35" stroke="white" strokeWidth="2"/>
            <path d="M50 27 L50 43" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4 animate-pulse">MedixHub</h1>
        <p className="text-xl mb-6 opacity-90">
          Smart Medical Record Management
        </p>
        <p className="text-lg opacity-90">
          Secure, efficient, and user-friendly healthcare management system designed for doctors, patients, and administrators.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <div className="text-center group">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2 transition-all duration-300 group-hover:bg-opacity-40 group-hover:scale-110 group-hover:shadow-lg cursor-pointer">
              <svg className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm transition-colors duration-300 group-hover:text-yellow-300">Secure</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2 transition-all duration-300 group-hover:bg-opacity-40 group-hover:scale-110 group-hover:shadow-lg cursor-pointer">
              <svg className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm transition-colors duration-300 group-hover:text-yellow-300">Fast</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2 transition-all duration-300 group-hover:bg-opacity-40 group-hover:scale-110 group-hover:shadow-lg cursor-pointer">
              <svg className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm transition-colors duration-300 group-hover:text-yellow-300">Reliable</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm opacity-80 mb-4">Follow us on social media</p>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com/medixhub" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-110">
                <Facebook className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </a>
            <a href="https://twitter.com/medixhub" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-400 group-hover:scale-110">
                <Twitter className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </a>
            <a href="https://instagram.com/medixhub" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-pink-500 group-hover:scale-110">
                <Instagram className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </a>
            <a href="https://linkedin.com/company/medixhub" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-700 group-hover:scale-110">
                <Linkedin className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
