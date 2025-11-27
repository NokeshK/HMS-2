import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, Calendar, Clock, User, Zap, MessageSquare, Video, Star, ChevronRight, Loader } from 'lucide-react';

export function BookAppointmentModal({ onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    appointmentType: '',
    urgency: 'normal',
    communicationPreference: 'in-person',
    reason: '',
    symptoms: '',
    notes: ''
  });

  // Fetch doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/doctors`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const doctorsData = await response.json();
          setDoctors(doctorsData);
        } else {
          setError('Failed to load doctors');
        }
      } catch (err) {
        setError('Network error while loading doctors');
        console.error('Error fetching doctors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
    setSelectedDoctor(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBooking(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const appointmentData = {
        doctorId: selectedDoctor.id,
        date: formData.date,
        time: formData.time,
        reason: formData.reason || 'General consultation'
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Appointment booked successfully:', result);
        onClose();
        // You might want to show a success message or refresh the appointments list
        window.location.reload(); // Simple way to refresh and show new appointment
      } else {
        const errorData = await response.text();
        setError('Failed to book appointment: ' + errorData);
      }
    } catch (err) {
      setError('Network error while booking appointment');
      console.error('Error booking appointment:', err);
    } finally {
      setBooking(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <div className="flex items-center space-x-4">
            {currentStep === 2 && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronRight size={20} className="transform rotate-180" />
              </button>
            )}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentStep === 1 ? 'Select a Doctor' : `Book Appointment with ${selectedDoctor?.name}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {currentStep === 1 ? (
            /* Doctor Selection Step */
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="animate-spin h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-gray-600 dark:text-gray-400">Loading doctors...</span>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-600 dark:text-red-400 mb-2">Error loading doctors</div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">{error}</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => handleDoctorSelect(doctor)}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 transform hover:scale-105 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-700"
                    >
                      <div className="flex flex-col items-center text-center">
                        <img
                          src={doctor.avatar || 'https://via.placeholder.com/80x80?text=Doctor'}
                          alt={doctor.name}
                          className="w-20 h-20 rounded-full object-cover mb-3"
                        />
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{doctor.name}</h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{doctor.specialization}</p>
                        <div className="flex items-center mb-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{doctor.rating || 'N/A'}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-500 ml-2">• {doctor.experience || 'N/A'}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{doctor.bio || 'Experienced medical professional'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Appointment Details Step */
            <div className="p-6">
              {/* Selected Doctor Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedDoctor.avatar}
                    alt={selectedDoctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{selectedDoctor.name}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{selectedDoctor.specialization}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{selectedDoctor.rating}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-500 ml-2">• {selectedDoctor.experience} experience</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Time
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Appointment Type
                    </label>
                    <select
                      name="appointmentType"
                      value={formData.appointmentType}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select type</option>
                      <option value="consultation">General Consultation</option>
                      <option value="follow-up">Follow-up Visit</option>
                      <option value="emergency">Emergency</option>
                      <option value="checkup">Annual Checkup</option>
                      <option value="specialist">Specialist Referral</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Zap className="inline h-4 w-4 mr-1" />
                      Urgency Level
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="normal">Normal (within 1-2 weeks)</option>
                      <option value="urgent">Urgent (within 3-5 days)</option>
                      <option value="emergency">Emergency (same day)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Communication
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input
                        type="radio"
                        name="communicationPreference"
                        value="in-person"
                        checked={formData.communicationPreference === 'in-person'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <User className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm">In-Person Visit</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input
                        type="radio"
                        name="communicationPreference"
                        value="video"
                        checked={formData.communicationPreference === 'video'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <Video className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm">Video Consultation</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input
                        type="radio"
                        name="communicationPreference"
                        value="phone"
                        checked={formData.communicationPreference === 'phone'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <MessageSquare className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm">Phone Consultation</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reason for Visit
                    </label>
                    <input
                      type="text"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., Regular checkup, Follow-up"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Symptoms (Optional)
                    </label>
                    <input
                      type="text"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Describe symptoms..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Any additional information..."
                  />
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t dark:border-gray-700">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    disabled={booking}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={booking}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    {booking ? (
                      <>
                        <Loader className="animate-spin h-4 w-4 mr-2" />
                        Booking...
                      </>
                    ) : (
                      'Book Appointment'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

BookAppointmentModal.propTypes = {
  onClose: PropTypes.func.isRequired
};