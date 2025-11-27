import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Users,
  FileText,
  Clock,
  Plus,
  Eye,
  Edit,
  Upload,
  Activity,
  Bell,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { mockAppointments, mockMedicalRecords } from '../../data/mockData.js';
import { DoctorProfileSection } from './Doctor/DoctorProfileSection.jsx';
import { AppointmentManagement } from './Doctor/AppointmentManagement.jsx';
import { PatientManagement } from './Doctor/PatientManagement.jsx';
import { PrescriptionManagement } from './Doctor/PrescriptionManagement.jsx';
import { AvailabilitySchedule } from './Doctor/AvailabilitySchedule.jsx';
import { NotificationsPanel } from './Doctor/NotificationsPanel.jsx';
import { MedicalRecordsManagement } from './Doctor/MedicalRecordsManagement.jsx';
import { PatientRecordModal } from '../Modals/PatientRecordModal.jsx';
import { AddNotesModal } from '../Modals/AddNotesModal.jsx';

export function DoctorDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const todayAppointments = mockAppointments.filter(apt => apt.date === '2025-01-20');
  const recentRecords = mockMedicalRecords.slice(0, 5);

  const handleLogout = () => {
    logout();
    navigate('/login');
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
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // Dashboard tabs/sections
  const sections = [
    { id: 'overview', label: 'Overview', icon: <Activity size={18} /> },
    { id: 'profile', label: 'My Profile', icon: <Users size={18} /> },
    { id: 'appointments', label: 'Appointments', icon: <Calendar size={18} /> },
    { id: 'patients', label: 'Patients', icon: <Users size={18} /> },
    { id: 'prescriptions', label: 'Prescriptions', icon: <FileText size={18} /> },
    { id: 'records', label: 'Medical Records', icon: <FileText size={18} /> },
    { id: 'availability', label: 'Schedule', icon: <Clock size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Doctor Name and Logout */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Doctor Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 dark:text-gray-300 font-medium">Welcome, {user?.name || 'Doctor'}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`px-4 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === section.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Appointments</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{todayAppointments.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Patients</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">247</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Records Created</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">15</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Consultation</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">28m</p>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Appointments & Recent Records */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Today's Appointments</h3>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {todayAppointments.length > 0 ? (
                    todayAppointments.map((apt) => (
                      <div key={apt.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{apt.patientName}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{apt.time}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(apt.status)}`}>
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">No appointments today</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Records</h3>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {recentRecords.length > 0 ? (
                    recentRecords.map((record) => (
                      <div key={record.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-gray-900 dark:text-white">{record.patientName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{record.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{record.date}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">No records available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && <DoctorProfileSection />}

      {/* Appointments Tab */}
      {activeTab === 'appointments' && <AppointmentManagement />}

      {/* Patients Tab */}
      {activeTab === 'patients' && <PatientManagement />}

      {/* Prescriptions Tab */}
      {activeTab === 'prescriptions' && <PrescriptionManagement />}

      {/* Medical Records Tab */}
      {activeTab === 'records' && <MedicalRecordsManagement />}

      {/* Availability/Schedule Tab */}
      {activeTab === 'availability' && <AvailabilitySchedule />}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && <NotificationsPanel />}

      {/* Modals */}
      {selectedPatient && (
        <PatientRecordModal
          patientId={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}

      {showNotesModal && selectedAppointment && (
        <AddNotesModal
          appointmentId={selectedAppointment}
          onClose={() => {
            setShowNotesModal(false);
            setSelectedAppointment(null);
          }}
        />
      )}
    </div>
  );
}