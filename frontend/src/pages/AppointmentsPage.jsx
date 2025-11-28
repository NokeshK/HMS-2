import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, User, MapPin, Phone, Video, MessageSquare, Plus } from 'lucide-react';
import { apiGetJSON, apiPutJSON } from '../utils/api';

export function AppointmentsPage() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await apiGetJSON('/api/appointments/patient');
      // Transform data to match expected format
      const transformedAppointments = data.map(apt => ({
        id: apt.id,
        patientId: apt.patient.id,
        patientName: apt.patient.name,
        doctorId: apt.doctor.id,
        doctorName: apt.doctor.name,
        date: apt.date,
        time: apt.time,
        status: apt.status.toLowerCase(),
        reason: apt.reason,
        notes: apt.notes,
      }));
      setAppointments(transformedAppointments);
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await apiPutJSON(`/api/appointments/${appointmentId}/status`, { status: 'CANCELLED' });
      // Update local state
      setAppointments(prev => prev.map(apt =>
        apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
      ));
    } catch (err) {
      setError('Failed to cancel appointment');
    }
  };

  const patientAppointments = appointments;

  const filteredAppointments = patientAppointments.filter(apt => {
    if (filterStatus === 'all') return true;
    return apt.status === filterStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getAppointmentTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5 text-blue-600" />;
      case 'phone': return <Phone className="h-5 w-5 text-green-600" />;
      default: return <MapPin className="h-5 w-5 text-purple-600" />;
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Appointments</h1>
            <p className="text-gray-600 dark:text-gray-400">View and manage your scheduled appointments</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/book-appointment')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Book New</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Your Healthcare Schedule</h2>
          <p className="text-xl opacity-90 mb-6">
            Stay on top of your appointments with our comprehensive scheduling system. Get reminders and manage your healthcare visits effortlessly.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Easy Scheduling</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Clock className="w-5 h-5 mr-2" />
              <span>Timely Reminders</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <MessageSquare className="w-5 h-5 mr-2" />
              <span>Direct Communication</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-blue-600">{patientAppointments.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Appointments</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-green-600">
              {patientAppointments.filter(apt => apt.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-yellow-600">
              {patientAppointments.filter(apt => apt.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-purple-600">
              {patientAppointments.filter(apt => new Date(apt.date) > new Date() && apt.status !== 'cancelled').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
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

      {/* Loading and Error */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading appointments...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Appointments List */}
      <div className="space-y-4">
        {!loading && !error && filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No appointments found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">You don't have any appointments matching the selected filter.</p>
            <button
              onClick={() => navigate('/book-appointment')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Book Your First Appointment
            </button>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
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
                          Appointment with Dr. {appointment.doctorName}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {appointment.time}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">{appointment.reason}</p>
                      {appointment.notes && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                          Notes: {appointment.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      Reschedule
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      disabled={appointment.status === 'cancelled'}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/book-appointment')}
            className="p-4 border border-blue-300 dark:border-blue-700 rounded-lg text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <Plus className="h-6 w-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-blue-600 dark:text-blue-400">Book New Appointment</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Schedule a consultation</p>
          </button>

          <button className="p-4 border border-green-300 dark:border-green-700 rounded-lg text-left hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
            <MessageSquare className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-medium text-green-600 dark:text-green-400">Contact Doctor</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Send a message</p>
          </button>

          <button className="p-4 border border-purple-300 dark:border-purple-700 rounded-lg text-left hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
            <Calendar className="h-6 w-6 text-purple-600 mb-2" />
            <h4 className="font-medium text-purple-600 dark:text-purple-400">View Calendar</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">See all appointments</p>
          </button>
        </div>
      </div>
    </div>
  );
}
