import React, { useState } from 'react';
import { Plus, Pill, Download, Share2, Trash2, Eye } from 'lucide-react';

const mockMedicines = [
  { id: 1, name: 'Amoxicillin', category: 'Antibiotic' },
  { id: 2, name: 'Aspirin', category: 'Pain Relief' },
  { id: 3, name: 'Metformin', category: 'Diabetes' },
  { id: 4, name: 'Lisinopril', category: 'Blood Pressure' },
  { id: 5, name: 'Atorvastatin', category: 'Cholesterol' },
  { id: 6, name: 'Omeprazole', category: 'Stomach' },
  { id: 7, name: 'Ibuprofen', category: 'Pain Relief' },
  { id: 8, name: 'Cetirizine', category: 'Allergy' }
];

export function PrescriptionManagement() {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      date: '2025-01-18',
      medicines: [
        { name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days' },
        { name: 'Aspirin', dosage: '100mg', frequency: 'Once daily', duration: 'Ongoing' }
      ],
      notes: 'For respiratory infection'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [formData, setFormData] = useState({
    patientName: '',
    medicines: [{ medicineId: '', dosage: '', frequency: '', duration: '' }],
    notes: ''
  });

  const handleAddMedicine = () => {
    setFormData(prev => ({
      ...prev,
      medicines: [...prev.medicines, { medicineId: '', dosage: '', frequency: '', duration: '' }]
    }));
  };

  const handleRemoveMedicine = (index) => {
    setFormData(prev => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index)
    }));
  };

  const handleMedicineChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      medicines: prev.medicines.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const handleCreatePrescription = () => {
    if (!formData.patientName || formData.medicines.some(m => !m.medicineId)) {
      alert('Please fill in all required fields');
      return;
    }

    const newPrescription = {
      id: prescriptions.length + 1,
      ...formData,
      medicines: formData.medicines.map(med => {
        const medicine = mockMedicines.find(m => m.id === parseInt(med.medicineId));
        return { name: medicine.name, ...med };
      }),
      date: new Date().toISOString().split('T')[0]
    };

    setPrescriptions([...prescriptions, newPrescription]);
    setFormData({ patientName: '', medicines: [{ medicineId: '', dosage: '', frequency: '', duration: '' }], notes: '' });
    setShowCreateModal(false);
    alert('Prescription created successfully!');
  };

  const handlePrint = (prescription) => {
    const printContent = `
      <html>
        <head>
          <title>Prescription</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .header { text-align: center; margin-bottom: 30px; }
            .patient-info { margin-bottom: 20px; }
            .medicines { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .footer { margin-top: 30px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>MedixHub</h1>
            <p>Medical Prescription</p>
          </div>
          <div class="patient-info">
            <p><strong>Patient:</strong> ${prescription.patientName}</p>
            <p><strong>Date:</strong> ${prescription.date}</p>
          </div>
          <div class="medicines">
            <h3>Medications</h3>
            <table>
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                ${prescription.medicines.map(med => `
                  <tr>
                    <td>${med.name}</td>
                    <td>${med.dosage}</td>
                    <td>${med.frequency}</td>
                    <td>${med.duration}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ${prescription.notes ? `<div><p><strong>Notes:</strong> ${prescription.notes}</p></div>` : ''}
          <div class="footer">
            <p>This prescription was generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Prescription Management</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus size={18} />
          Create Prescription
        </button>
      </div>

      {/* Prescriptions List */}
      <div className="p-6">
        {prescriptions.length > 0 ? (
          <div className="space-y-4">
            {prescriptions.map(prescription => (
              <div key={prescription.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{prescription.patientName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{prescription.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedPrescription(prescription);
                        setShowViewModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handlePrint(prescription)}
                      className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded transition-colors"
                      title="Print"
                    >
                      <Download size={18} />
                    </button>
                    <button
                      className="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded transition-colors"
                      title="Share"
                    >
                      <Share2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setPrescriptions(prescriptions.filter(p => p.id !== prescription.id));
                        alert('Prescription deleted!');
                      }}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Pill size={16} />
                    Medications
                  </h4>
                  <div className="ml-6 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {prescription.medicines.map((med, idx) => (
                      <p key={idx}>{med.name} - {med.dosage} ({med.frequency})</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Pill size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No prescriptions yet</p>
          </div>
        )}
      </div>

      {/* Create Prescription Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Prescription</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Patient Name</label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  placeholder="Select or enter patient name"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Medications</label>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {formData.medicines.map((med, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
                      <select
                        value={med.medicineId}
                        onChange={(e) => handleMedicineChange(index, 'medicineId', e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Medicine</option>
                        {mockMedicines.map(med => (
                          <option key={med.id} value={med.id}>{med.name}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={med.dosage}
                        onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                        placeholder="Dosage (e.g., 500mg)"
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={med.frequency}
                        onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                        placeholder="Frequency (e.g., Twice daily)"
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={med.duration}
                        onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                        placeholder="Duration (e.g., 7 days)"
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {formData.medicines.length > 1 && (
                        <button
                          onClick={() => handleRemoveMedicine(index)}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddMedicine}
                  className="mt-3 flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                >
                  <Plus size={16} />
                  Add Medicine
                </button>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Additional Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special instructions or notes..."
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCreatePrescription}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Create Prescription
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Prescription Modal */}
      {showViewModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Prescription Details</h3>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Patient</label>
                  <p className="text-gray-900 dark:text-white font-semibold">{selectedPrescription.patientName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Date</label>
                  <p className="text-gray-900 dark:text-white font-semibold">{selectedPrescription.date}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-3">Medications</label>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <th className="px-4 py-2 text-left text-sm font-medium">Medicine</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Dosage</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Frequency</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPrescription.medicines.map((med, idx) => (
                        <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-2 text-sm">{med.name}</td>
                          <td className="px-4 py-2 text-sm">{med.dosage}</td>
                          <td className="px-4 py-2 text-sm">{med.frequency}</td>
                          <td className="px-4 py-2 text-sm">{med.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {selectedPrescription.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Notes</label>
                  <p className="text-gray-900 dark:text-white">{selectedPrescription.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handlePrint(selectedPrescription)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Download size={16} />
                Print
              </button>
              <button
                onClick={() => setShowViewModal(false)}
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
