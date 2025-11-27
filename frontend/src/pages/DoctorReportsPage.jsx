import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BarChart3, Download, Calendar, TrendingUp, Users, FileText, Activity } from 'lucide-react';
import { mockMedicalRecords, mockAppointments, mockPatients } from '../data/mockData.js';

export function DoctorReportsPage() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('month');

  // Get data for the current doctor (assuming doctor ID 1)
  const doctorRecords = mockMedicalRecords.filter(record => record.doctorId === '1');
  const doctorAppointments = mockAppointments.filter(apt => apt.doctorId === '1');
  const uniquePatients = new Set(doctorRecords.map(r => r.patientId)).size;

  // Calculate metrics
  const completedAppointments = doctorAppointments.filter(apt => apt.status === 'completed').length;
  const totalConsultations = doctorRecords.filter(r => r.type === 'consultation').length;
  const avgConsultationTime = 28; // Mock data

  const getDateRangeText = () => {
    switch (dateRange) {
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case 'quarter': return 'This Quarter';
      case 'year': return 'This Year';
      default: return 'All Time';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Track your performance and patient care metrics</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Practice Insights</h2>
          <p className="text-xl opacity-90 mb-6">
            Monitor your practice performance, patient outcomes, and operational efficiency with comprehensive analytics.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <BarChart3 className="w-5 h-5 mr-2" />
              <span>Data-Driven Insights</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span>Performance Tracking</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Download className="w-5 h-5 mr-2" />
              <span>Export Reports</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Patients</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{uniquePatients}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Appointments</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{completedAppointments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Medical Records</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{doctorRecords.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Activity className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Consultation Time</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{avgConsultationTime}m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Status Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Appointment Status Distribution</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {['completed', 'pending', 'confirmed', 'cancelled'].map((status) => {
                const count = doctorAppointments.filter(apt => apt.status === status).length;
                const percentage = doctorAppointments.length > 0 ? Math.round((count / doctorAppointments.length) * 100) : 0;

                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'completed' ? 'bg-green-500' :
                        status === 'pending' ? 'bg-yellow-500' :
                        status === 'confirmed' ? 'bg-blue-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{status}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{count}</span>
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            status === 'completed' ? 'bg-green-500' :
                            status === 'pending' ? 'bg-yellow-500' :
                            status === 'confirmed' ? 'bg-blue-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Record Types Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Record Types Distribution</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {['consultation', 'test', 'imaging'].map((type) => {
                const count = doctorRecords.filter(record => record.type === type).length;
                const percentage = doctorRecords.length > 0 ? Math.round((count / doctorRecords.length) * 100) : 0;

                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        type === 'consultation' ? 'bg-blue-500' :
                        type === 'test' ? 'bg-purple-500' : 'bg-orange-500'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{count}</span>
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            type === 'consultation' ? 'bg-blue-500' :
                            type === 'test' ? 'bg-purple-500' : 'bg-orange-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {doctorRecords.slice(0, 5).map((record) => (
              <div key={record.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{record.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Patient: {record.patientName} • {record.date}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  record.type === 'consultation' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                  record.type === 'test' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                  'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                }`}>
                  {record.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-blue-300 dark:border-blue-700 rounded-lg text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <Download className="h-6 w-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-blue-600 dark:text-blue-400">Patient Summary</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive patient reports</p>
          </button>

          <button className="p-4 border border-green-300 dark:border-green-700 rounded-lg text-left hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
            <BarChart3 className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-medium text-green-600 dark:text-green-400">Performance Report</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Practice analytics and metrics</p>
          </button>

          <button className="p-4 border border-purple-300 dark:border-purple-700 rounded-lg text-left hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
            <Calendar className="h-6 w-6 text-purple-600 mb-2" />
            <h4 className="font-medium text-purple-600 dark:text-purple-400">Appointment Report</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Schedule and appointment data</p>
          </button>
        </div>
      </div>
    </div>
  );
}