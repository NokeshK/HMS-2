import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeartBeatLogo from '../components/Brand/HeartBeatLogo.jsx';
import { PrimaryAppBar } from '../components/Layout/PrimaryAppBar.jsx';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex flex-col">
      <PrimaryAppBar />

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full text-center">
          <div className="flex justify-center mb-6">
            <HeartBeatLogo size={24} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome to MedixHub
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            Manage appointments, medical records, and communication seamlessly.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <img
                src="https://www.shutterstock.com/image-photo/high-angle-cctv-shot-busy-260nw-2557673787.jpg"
                alt="Hospital operations overview"
                className="w-full h-40 sm:h-48 object-cover rounded-md"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">MedixHub</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Secure patient records, appointments, and messaging to streamline care.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJAmErgYLGkp2xNzGVcwGOFmud3gebLFtI2Q&s"
                alt="Care coordination"
                className="w-full h-40 sm:h-48 object-cover rounded-md"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Care Workflow</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Real-time scheduling, reports, and collaboration for clinicians and patients.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 font-semibold shadow-lg transition-transform hover:scale-[1.02]"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-blue-700 bg-white border border-blue-300 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-300 dark:border-blue-600 dark:hover:bg-gray-700 shadow-md"
            >
              Sign Up
            </button>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 MedixHub. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
