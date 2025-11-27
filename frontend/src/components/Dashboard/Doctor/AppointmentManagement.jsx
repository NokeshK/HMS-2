import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Eye, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { mockAppointments } from '../../../data/mockData';

export function AppointmentManagement() {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Filter appointments
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = mockAppointments.filter(apt => apt.date === today);
  const upcomingAppointments = mockAppointments.filter(apt => new Date(apt.date) > new Date(today));
  const appointmentHistory = mockAppointments.filter(apt => new Date(apt.date) < new Date(today));

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-600" />;
      case 'pending':
        return <AlertCircle size={16} className="text-yellow-600" />;
      default:
        return <Clock size={16} className="text-blue-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  const handleAccept = (appointmentId) => {
    console.log('Accept appointment:', appointmentId);
    // TODO: Call API to accept appointment
  };

  const handleCancel = (appointmentId) => {
    console.log('Cancel appointment:', appointmentId);
    // TODO: Call API to cancel appointment
  };

  const AppointmentCard = ({ appointment }) => (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
            {appointment.patientName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{appointment.patientName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.reason}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)} flex items-center gap-1`}>
          {getStatusIcon(appointment.status)}
          {appointment.status}
        </span>
      </div>

      <div className="space-y-2 mb-4 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-blue-500" />
          <span>{appointment.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-green-500" />
          <span>{appointment.time}</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => {
            setSelectedAppointment(appointment);
            setShowDetails(true);
          }}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-sm"
        >
          <Eye size={14} />
          Details
        </button>
        {appointment.status === 'pending' && (
          <>
            <button
              onClick={() => handleAccept(appointment.id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors text-sm"
            >
              <CheckCircle size={14} />
              Accept
            </button>
            <button
              onClick={() => handleCancel(appointment.id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors text-sm"
            >
              <XCircle size={14} />
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );

  const currentAppointments = activeTab === 'today' ? todayAppointments : activeTab === 'upcoming' ? upcomingAppointments : appointmentHistory;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Appointment Management</h2>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-8 px-6 overflow-x-auto">
          {[
            { id: 'today', label: "Today's Appointments", count: todayAppointments.length },
            { id: 'upcoming', label: 'Upcoming Appointments', count: upcomingAppointments.length },
            { id: 'history', label: 'Appointment History', count: appointmentHistory.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              {tab.label} <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {currentAppointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No appointments found</p>
          </div>
        )}
      </div>

      {/* Appointment Details Modal */}
      {showDetails && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Appointment Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Patient Name</label>
                <p className="text-gray-900 dark:text-white font-semibold">{selectedAppointment.patientName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Date</label>
                  <p className="text-gray-900 dark:text-white font-semibold">{selectedAppointment.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Time</label>
                  <p className="text-gray-900 dark:text-white font-semibold">{selectedAppointment.time}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Reason</label>
                <p className="text-gray-900 dark:text-white">{selectedAppointment.reason}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
                <span className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedAppointment.status)}`}>
                  {selectedAppointment.status}
                </span>
              </div>
              <div className="pt-4 flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
                  <Phone size={16} />
                  Call
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors">
                  <MessageSquare size={16} />
                  Message
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="mt-6 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
