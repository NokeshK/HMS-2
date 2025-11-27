import React from 'react';
import PropTypes from 'prop-types';
import { X, Calendar, User, FileText, Pill } from 'lucide-react';
import { mockPatients, mockMedicalRecords } from '../../data/mockData.js';

export function PatientRecordModal({ patientId, onClose }) {
  const patient = mockPatients.find(p => p.id === patientId);
  const records = mockMedicalRecords.filter(r => r.patientId === patientId);

  if (!patient) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-lg">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{patient.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Patient ID: {patient.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6 space-y-6">
            {/* Patient Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Patient Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Age:</span>
                    <span className="text-gray-900 dark:text-white">{patient.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Email:</span>
                    <span className="text-gray-900 dark:text-white">{patient.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                    <span className="text-gray-900 dark:text-white">{patient.phone}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Emergency Contact</h3>
                <div className="text-sm">
                  <p className="text-gray-900 dark:text-white">{patient.emergencyContact}</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Address: {patient.address}</p>
                </div>
              </div>
            </div>

            {/* AI Health Summary */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                AI Health Summary
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Overall Health Status: Good</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Based on recent consultations and test results</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Monitoring Required</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Blood pressure and cholesterol levels need regular monitoring</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Recommendations</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Continue current medication, follow-up in 3 months</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Records */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Medical History</h3>
              <div className="space-y-4">
                {records.map((record) => (
                  <div key={record.id} className="border dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">{record.date}</span>
                          <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${
                            record.type === 'consultation' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                            record.type === 'test' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                            'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          }`}>
                            {record.type}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{record.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{record.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-500">
                          <User className="h-3 w-3 mr-1" />
                          <span>{record.doctorName}</span>
                        </div>
                      </div>
                    </div>
                    
                    {record.prescription && record.prescription.length > 0 && (
                      <div className="mt-4 pt-4 border-t dark:border-gray-700">
                        <div className="flex items-center mb-2">
                          <Pill className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Prescribed Medications</span>
                        </div>
                        <div className="space-y-2">
                          {record.prescription.map((med) => (
                            <div key={med.id} className="bg-green-50 dark:bg-green-900/20 rounded p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-sm text-gray-900 dark:text-white">{med.medication}</p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">{med.dosage} - {med.frequency} for {med.duration}</p>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{med.instructions}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PatientRecordModal.propTypes = {
  patientId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};