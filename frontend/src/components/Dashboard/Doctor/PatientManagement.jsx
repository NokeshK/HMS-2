import React, { useState } from 'react';
import { Users, Search, Eye, FileText, Edit, Plus } from 'lucide-react';

const mockPatients = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 45,
    gender: 'Female',
    phone: '+1 (555) 123-4567',
    email: 'sarah@example.com',
    lastVisit: '2025-01-15',
    conditions: ['Hypertension', 'Diabetes'],
    prescriptions: 5,
    notes: 'Regular checkup patient'
  },
  {
    id: 2,
    name: 'Michael Chen',
    age: 38,
    gender: 'Male',
    phone: '+1 (555) 234-5678',
    email: 'michael@example.com',
    lastVisit: '2025-01-18',
    conditions: ['High Cholesterol'],
    prescriptions: 3,
    notes: 'Regular monitoring required'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    age: 52,
    gender: 'Female',
    phone: '+1 (555) 345-6789',
    email: 'emily@example.com',
    lastVisit: '2025-01-10',
    conditions: ['Asthma', 'Allergies'],
    prescriptions: 4,
    notes: 'Needs medication refill'
  }
];

export function PatientManagement() {
  const [patients, setPatients] = useState(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [notes, setNotes] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setNotes(patient.notes);
    setShowDetails(true);
  };

  const handleSaveNotes = () => {
    if (selectedPatient) {
      setPatients(patients.map(p =>
        p.id === selectedPatient.id ? { ...p, notes } : p
      ));
      alert('Notes updated successfully!');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Management</h2>
      </div>

      {/* Search and Actions */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors whitespace-nowrap">
            <Plus size={18} />
            Add New Patient
          </button>
        </div>
      </div>

      {/* Patient List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Last Visit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Conditions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPatients.map(patient => (
              <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{patient.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{patient.age} years, {patient.gender}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    <p className="text-gray-900 dark:text-white">{patient.email}</p>
                    <p className="text-gray-500 dark:text-gray-400">{patient.phone}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {patient.lastVisit}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {patient.conditions.map((condition, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 rounded-full">
                        {condition}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(patient)}
                      className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded transition-colors"
                      title="View Medical History"
                    >
                      <FileText size={16} />
                    </button>
                    <button
                      className="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded transition-colors"
                      title="Add Notes"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patient Details Modal */}
      {showDetails && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg font-semibold">
                  {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedPatient.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedPatient.age} years old, {selectedPatient.gender}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                <p className="text-gray-900 dark:text-white">{selectedPatient.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
                <p className="text-gray-900 dark:text-white">{selectedPatient.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Visit</label>
                <p className="text-gray-900 dark:text-white">{selectedPatient.lastVisit}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Prescriptions</label>
                <p className="text-gray-900 dark:text-white">{selectedPatient.prescriptions}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Medical Conditions</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedPatient.conditions.map((condition, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 rounded-full text-sm">
                    {condition}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Medical Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full mt-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Add or update patient notes..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveNotes}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Save Notes
              </button>
              <button
                onClick={() => setShowDetails(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
