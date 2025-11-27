import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, User, Eye, Edit, Plus, Filter } from 'lucide-react';
import { mockAppointments, mockPatients } from '../data/mockData.js';

export function DoctorAppointmentsPage() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Get appointments for the current doctor (assuming doctor ID 1)
  const doctorAppointments = mockAppointments.filter(apt => apt.doctorId === '1');

  const filteredAppointments = doctorAppointments.filter(apt => {
    if (filterStatus === 'all') return true;
    return apt.status === filterStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPatientInfo = (patientId) => {
    return mockPatients.find(patient => patient.id === patientId);
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Appointments</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your patient appointments and consultations</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus size={16} />
          <span>Schedule New</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Appointment Management</h2>
          <p className="text-xl opacity-90 mb-6">
            Efficiently manage your patient schedule, track consultations, and provide excellent care to your patients.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Smart Scheduling</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <User className="w-5 h-5 mr-2" />
              <span>Patient Care</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Clock className="w-5 h-5 mr-2" />
              <span>Time Management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-blue-600">{doctorAppointments.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Appointments</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-green-600">
              {doctorAppointments.filter(apt => apt.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-yellow-600">
              {doctorAppointments.filter(apt => apt.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-purple-600">
              {doctorAppointments.filter(apt => new Date(apt.date) > new Date()).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Appointments</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No appointments found</h3>
            <p className="text-gray-600 dark:text-gray-400">You don't have any appointments matching the selected filter.</p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => {
            const patient = getPatientInfo(appointment.patientId);
            return (
              <div key={appointment.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {appointment.patientName}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {appointment.time}
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">{appointment.reason}</p>
                        {patient && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Age: {patient.age} • Phone: {patient.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => setSelectedAppointment(appointment)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </button>
                      <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Add Notes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-blue-300 dark:border-blue-700 rounded-lg text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <Plus className="h-6 w-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-blue-600 dark:text-blue-400">Schedule Appointment</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Book a new consultation</p>
          </button>

          <button className="p-4 border border-green-300 dark:border-green-700 rounded-lg text-left hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
            <User className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-medium text-green-600 dark:text-green-400">Patient Records</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">View patient history</p>
          </button>

          <button className="p-4 border border-purple-300 dark:border-purple-700 rounded-lg text-left hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
            <Edit className="h-6 w-6 text-purple-600 mb-2" />
            <h4 className="font-medium text-purple-600 dark:text-purple-400">Add Notes</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Document consultation</p>
          </button>
        </div>
      </div>
    </div>
  );
}
