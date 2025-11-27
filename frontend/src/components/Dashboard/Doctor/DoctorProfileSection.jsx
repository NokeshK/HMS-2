import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Edit, Mail, Phone, MapPin, Clock, Award } from 'lucide-react';

export function DoctorProfileSection() {
  const { user } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Dr. John Doe',
    specialization: user?.specialization || 'Cardiology',
    experience: user?.experience || '8 years',
    email: user?.email || 'doctor@medixhub.com',
    phone: user?.phone || '+1 (555) 123-4567',
    address: user?.address || '123 Medical Center, Healthcare City',
    availableHours: user?.availableHours || '9:00 AM - 5:00 PM',
    consultationFee: user?.consultationFee || '$50'
  });

  const handleChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      // TODO: Send update request to backend
      console.log('Updating profile:', profileData);
      setIsEditMode(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Header with background gradient */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

      <div className="px-6 pb-6">
        {/* Profile Content */}
        <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-20">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-gray-800 shadow-lg">
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 pt-4">
            {isEditMode ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Doctor Name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  value={profileData.specialization}
                  onChange={(e) => handleChange('specialization', e.target.value)}
                  placeholder="Specialization"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  value={profileData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                  placeholder="Experience"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Phone"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Address"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  value={profileData.availableHours}
                  onChange={(e) => handleChange('availableHours', e.target.value)}
                  placeholder="Available Hours"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  value={profileData.consultationFee}
                  onChange={(e) => handleChange('consultationFee', e.target.value)}
                  placeholder="Consultation Fee"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditMode(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{profileData.name}</h2>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">{profileData.specialization}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Award size={18} className="text-blue-600" />
                    <span>{profileData.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Clock size={18} className="text-green-600" />
                    <span>{profileData.availableHours}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Mail size={18} className="text-purple-600" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Phone size={18} className="text-orange-600" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 md:col-span-2">
                    <MapPin size={18} className="text-red-600" />
                    <span>{profileData.address}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditMode(true)}
                  className="mt-6 flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  <Edit size={18} />
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
