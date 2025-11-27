import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  FileText,
  Download,
  MessageSquare,
  Clock,
  Pill,
  Activity,
  Plus,
  User
} from 'lucide-react';
import { mockMedicalRecords, mockNotifications } from '../../data/mockData.js';
import { BookAppointmentModal } from '../Modals/BookAppointmentModal.jsx';
import { ChatModal } from '../Modals/ChatModal.jsx';

export function PatientDashboard() {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  const patientRecords = mockMedicalRecords.filter(record => record.patientId === '1');
  const patientNotifications = mockNotifications.filter(notif => notif.userId === '1');

  const prescriptions = [
    {
      id: '1',
      medication: 'Lisinopril 10mg',
      prescribedBy: 'Dr. Sarah Johnson',
      date: '2025-01-15',
      status: 'Active',
      instructions: 'Take once daily with food'
    },
    {
      id: '2',
      medication: 'Metformin 500mg',
      prescribedBy: 'Dr. Sarah Johnson',
      date: '2025-01-10',
      status: 'Completed',
      instructions: 'Take twice daily with meals'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => navigate('/book-appointment')}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-6 text-left transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg shadow-sm"
        >
          <Calendar className="h-8 w-8 mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110" />
          <h3 className="font-semibold text-lg mb-2">Book Appointment</h3>
          <p className="text-sm text-blue-100">Schedule with your doctor</p>
        </button>

        <button
          onClick={() => navigate('/medical-records')}
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-left transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg shadow-sm"
        >
           <FileText className="h-8 w-8 text-green-600 mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110" />
           <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Medical Records</h3>
           <p className="text-sm text-gray-500 dark:text-gray-400">Access medical history</p>
         </button>

        <button
          onClick={() => navigate('/chat')}
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-left transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg shadow-sm"
        >
           <MessageSquare className="h-8 w-8 text-purple-600 mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110" />
           <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Messages</h3>
           <p className="text-sm text-gray-500 dark:text-gray-400">Chat with doctors</p>
         </button>

        <button
          onClick={() => navigate('/reports')}
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-left transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg shadow-sm"
        >
           <Download className="h-8 w-8 text-orange-600 mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110" />
           <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Reports</h3>
           <p className="text-sm text-gray-500 dark:text-gray-400">Download medical reports</p>
         </button>
       </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Medical Records */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">My Medical Records</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {patientRecords.map((record) => (
                <div key={record.id} className="border dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{record.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{record.description}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-500">
                        <span>Dr. {record.doctorName}</span>
                        <span className="mx-2">•</span>
                        <span>{record.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        record.type === 'consultation' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                        record.type === 'test' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                        {record.type}
                      </span>
                    </div>
                  </div>
                  
                  {record.prescription && record.prescription.length > 0 && (
                    <div className="mt-3 pt-3 border-t dark:border-gray-700">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Prescribed Medications:</p>
                      {record.prescription.map((med) => (
                        <div key={med.id} className="text-xs text-gray-600 dark:text-gray-400">
                          {med.medication} - {med.dosage} {med.frequency}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Upcoming Appointments</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Dr. Sarah Johnson</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tomorrow, 9:00 AM</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowBookingModal(true)}
                className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md"
              >
                <Plus size={16} className="mr-2 transition-transform duration-200 ease-in-out group-hover:scale-110" />
                Book New Appointment
              </button>
            </div>
          </div>

          {/* Prescription Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Prescriptions</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {prescriptions.map((prescription) => (
                  <div key={prescription.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full ${
                        prescription.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{prescription.medication}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{prescription.instructions}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {prescription.prescribedBy} • {prescription.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Health Summary */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-purple-200 dark:border-purple-800">
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">AI Health Summary</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Overall health status: Good</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Blood pressure needs monitoring</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Annual checkup due in 2 months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showBookingModal && (
        <BookAppointmentModal onClose={() => setShowBookingModal(false)} />
      )}
      {showChatModal && (
        <ChatModal onClose={() => setShowChatModal(false)} />
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChatModal(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl z-40"
        title="Chat with Doctor"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
}