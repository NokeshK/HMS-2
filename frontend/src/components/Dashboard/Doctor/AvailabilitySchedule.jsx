import React, { useState } from 'react';
import { Clock, Edit, Plus, CheckCircle, AlertCircle } from 'lucide-react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function AvailabilitySchedule() {
  const [schedule, setSchedule] = useState({
    monday: { startTime: '09:00', endTime: '17:00', isAvailable: true },
    tuesday: { startTime: '09:00', endTime: '17:00', isAvailable: true },
    wednesday: { startTime: '09:00', endTime: '17:00', isAvailable: true },
    thursday: { startTime: '09:00', endTime: '17:00', isAvailable: true },
    friday: { startTime: '09:00', endTime: '17:00', isAvailable: true },
    saturday: { startTime: '10:00', endTime: '14:00', isAvailable: false },
    sunday: { startTime: '', endTime: '', isAvailable: false }
  });

  const [vacationDays, setVacationDays] = useState([
    { id: 1, startDate: '2025-02-01', endDate: '2025-02-05', reason: 'Medical Conference' }
  ]);

  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [showVacationModal, setShowVacationModal] = useState(false);
  const [vacationForm, setVacationForm] = useState({ startDate: '', endDate: '', reason: '' });

  const handleTimeChange = (day, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const handleAvailabilityToggle = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], isAvailable: !prev[day].isAvailable }
    }));
  };

  const handleSaveSchedule = async () => {
    try {
      console.log('Saving schedule:', schedule);
      alert('Schedule updated successfully!');
      setIsEditingSchedule(false);
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };

  const handleAddVacation = () => {
    if (!vacationForm.startDate || !vacationForm.endDate) {
      alert('Please fill in all fields');
      return;
    }

    const newVacation = {
      id: vacationDays.length + 1,
      ...vacationForm
    };

    setVacationDays([...vacationDays, newVacation]);
    setVacationForm({ startDate: '', endDate: '', reason: '' });
    setShowVacationModal(false);
    alert('Vacation added successfully!');
  };

  const handleDeleteVacation = (id) => {
    setVacationDays(vacationDays.filter(v => v.id !== id));
    alert('Vacation removed!');
  };

  return (
    <div className="space-y-6">
      {/* Working Hours */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Clock size={24} />
            Working Hours
          </h2>
          <button
            onClick={() => setIsEditingSchedule(!isEditingSchedule)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Edit size={18} />
            {isEditingSchedule ? 'Done' : 'Edit'}
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {daysOfWeek.map((day, index) => {
              const dayKey = day.toLowerCase();
              const dayData = schedule[dayKey];

              return (
                <div key={day} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="font-semibold text-gray-900 dark:text-white min-w-24">{day}</span>

                    {isEditingSchedule ? (
                      <div className="flex items-center gap-3 flex-1">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={dayData.isAvailable}
                            onChange={() => handleAvailabilityToggle(dayKey)}
                            className="w-4 h-4 rounded"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Available</span>
                        </label>

                        {dayData.isAvailable && (
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={dayData.startTime}
                              onChange={(e) => handleTimeChange(dayKey, 'startTime', e.target.value)}
                              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                            />
                            <span className="text-gray-700 dark:text-gray-300">to</span>
                            <input
                              type="time"
                              value={dayData.endTime}
                              onChange={(e) => handleTimeChange(dayKey, 'endTime', e.target.value)}
                              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        {dayData.isAvailable ? (
                          <>
                            <CheckCircle size={18} className="text-green-600" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {dayData.startTime} - {dayData.endTime}
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertCircle size={18} className="text-red-600" />
                            <span className="text-gray-500 dark:text-gray-400">Not available</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {isEditingSchedule && (
            <button
              onClick={handleSaveSchedule}
              className="mt-6 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Vacation Days */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Vacation & Days Off</h2>
          <button
            onClick={() => setShowVacationModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus size={18} />
            Add Vacation
          </button>
        </div>

        <div className="p-6">
          {vacationDays.length > 0 ? (
            <div className="space-y-3">
              {vacationDays.map(vacation => (
                <div key={vacation.id} className="flex items-start justify-between p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{vacation.reason}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {vacation.startDate} to {vacation.endDate}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteVacation(vacation.id)}
                    className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 dark:text-gray-400">No vacation days scheduled</p>
            </div>
          )}
        </div>
      </div>

      {/* Vacation Modal */}
      {showVacationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Vacation Days</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From Date</label>
                <input
                  type="date"
                  value={vacationForm.startDate}
                  onChange={(e) => setVacationForm({ ...vacationForm, startDate: e.target.value })}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To Date</label>
                <input
                  type="date"
                  value={vacationForm.endDate}
                  onChange={(e) => setVacationForm({ ...vacationForm, endDate: e.target.value })}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Reason</label>
                <input
                  type="text"
                  value={vacationForm.reason}
                  onChange={(e) => setVacationForm({ ...vacationForm, reason: e.target.value })}
                  placeholder="e.g., Medical Conference, Personal Leave"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleAddVacation}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Vacation
              </button>
              <button
                onClick={() => setShowVacationModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
