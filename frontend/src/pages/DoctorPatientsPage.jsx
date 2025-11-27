import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Users, Search, Phone, Mail, Calendar, Eye, MessageSquare } from 'lucide-react';
import { mockPatients, mockMedicalRecords } from '../data/mockData.js';

export function DoctorPatientsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Get patients that have records with the current doctor (assuming doctor ID 1)
  const doctorPatientIds = [...new Set(mockMedicalRecords.filter(record => record.doctorId === '1').map(record => record.patientId))];
  const doctorPatients = mockPatients.filter(patient => doctorPatientIds.includes(patient.id));

  const filteredPatients = doctorPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPatientRecords = (patientId) => {
    return mockMedicalRecords.filter(record => record.patientId === patientId && record.doctorId === '1');
  };

  const getLastVisit = (patientId) => {
    const records = getPatientRecords(patientId);
    if (records.length === 0) return null;
    return records.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date;
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Patients</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your patient relationships and care</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Patient Care Management</h2>
          <p className="text-xl opacity-90 mb-6">
            Keep track of your patients, their medical history, and provide personalized healthcare services.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Users className="w-5 h-5 mr-2" />
              <span>Patient Management</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Care Continuity</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <MessageSquare className="w-5 h-5 mr-2" />
              <span>Communication</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="text-2xl font-bold text-blue-600">{doctorPatients.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Patients</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="text-2xl font-bold text-green-600">
            {doctorPatients.filter(p => getLastVisit(p.id) && new Date(getLastVisit(p.id)) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active (30 days)</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="text-2xl font-bold text-purple-600">
            {doctorPatients.reduce((sum, p) => sum + getPatientRecords(p.id).length, 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Records</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="text-2xl font-bold text-orange-600">
            {Math.round(doctorPatients.reduce((sum, p) => sum + getPatientRecords(p.id).length, 0) / Math.max(doctorPatients.length, 1))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Records/Patient</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Patients List */}
      <div className="space-y-4">
        {filteredPatients.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No patients found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria.</p>
          </div>
        ) : (
          filteredPatients.map((patient) => {
            const records = getPatientRecords(patient.id);
            const lastVisit = getLastVisit(patient.id);

            return (
              <div key={patient.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-lg">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {patient.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {patient.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {patient.phone}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>Age: {patient.age}</span>
                          <span>Records: {records.length}</span>
                          {lastVisit && <span>Last Visit: {lastVisit}</span>}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          Emergency Contact: {patient.emergencyContact}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => setSelectedPatient(patient)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        View Profile
                      </button>
                      <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Message
                      </button>
                    </div>
                  </div>

                  {records.length > 0 && (
                    <div className="mt-4 pt-4 border-t dark:border-gray-700">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recent Records</h4>
                      <div className="space-y-2">
                        {records.slice(0, 2).map((record) => (
                          <div key={record.id} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                            <span className="font-medium">{record.title}</span> - {record.date}
                          </div>
                        ))}
                        {records.length > 2 && (
                          <p className="text-sm text-blue-600 dark:text-blue-400">
                            +{records.length - 2} more records
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}