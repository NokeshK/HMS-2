import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MessageCircle, Send, User, Bot } from 'lucide-react';
import { ChatModal } from '../components/Modals/ChatModal.jsx';

export function ChatPage() {
  const navigate = useNavigate();
  const [showChatModal, setShowChatModal] = useState(false);

  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      lastMessage: 'Your test results are ready for review.',
      lastMessageTime: '2 min ago'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Orthopedics',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      status: 'offline',
      lastMessage: 'Please continue with the prescribed exercises.',
      lastMessageTime: '1 hour ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="text-gray-600 dark:text-gray-400">Communicate securely with your healthcare providers</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Secure Healthcare Communication</h2>
          <p className="text-xl opacity-90 mb-6">
            Connect with your doctors through our HIPAA-compliant messaging system. Get timely responses and maintain your health records securely.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>Instant Messaging</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Bot className="w-5 h-5 mr-2" />
              <span>AI Assistance</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <User className="w-5 h-5 mr-2" />
              <span>Doctor Connect</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setShowChatModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-6 text-left transition-all duration-300 transform hover:scale-105"
        >
          <MessageCircle className="h-8 w-8 mb-4" />
          <h3 className="font-semibold text-lg mb-2">Start New Chat</h3>
          <p className="text-sm text-blue-100">Message a healthcare provider</p>
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <Bot className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">AI Health Assistant</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Get instant health information</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <Send className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Emergency Contact</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Reach emergency services</p>
        </div>
      </div>

      {/* Conversations List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Conversations</h3>
        </div>
        <div className="divide-y dark:divide-gray-700">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => setShowChatModal(true)}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                    doctor.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 dark:text-white">{doctor.name}</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{doctor.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialization}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 truncate">{doctor.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Why Choose Our Messaging?</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">HIPAA Compliant</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your health information is fully protected</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">24/7 Access</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Communicate anytime, anywhere</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Secure Encryption</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">End-to-end encrypted conversations</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Tips</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Be Specific</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Describe symptoms clearly for better help</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Emergency Situations</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Call emergency services for urgent care</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Follow Up</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Keep track of your treatment progress</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && (
        <ChatModal onClose={() => setShowChatModal(false)} />
      )}
    </div>
  );
}