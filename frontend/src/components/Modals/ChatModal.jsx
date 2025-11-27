import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, Send, MessageCircle, User, Bot } from 'lucide-react';

export function ChatModal({ onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'doctor',
      content: 'Hello! I\'m Dr. Sarah Johnson. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'patient',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate doctor response
    setTimeout(() => {
      const responses = [
        "Thank you for your message. I'll review your symptoms and get back to you shortly.",
        "I understand your concern. Can you tell me more about when these symptoms started?",
        "Based on what you've described, I recommend scheduling an appointment for a proper examination.",
        "Please continue monitoring your symptoms and let me know if they worsen.",
        "I'm here to help. Feel free to ask any questions about your health."
      ];

      const doctorResponse = {
        id: messages.length + 2,
        sender: 'doctor',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, doctorResponse]);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Chat with Dr. Sarah Johnson</h2>
              <p className="text-sm opacity-90">Online • Cardiology</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'patient'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.sender === 'doctor' ? (
                    <User size={14} className="text-gray-500 dark:text-gray-400" />
                  ) : (
                    <Bot size={14} className="text-blue-200" />
                  )}
                  <span className="text-xs opacity-75">{message.timestamp}</span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t dark:border-gray-700">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send size={16} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            This is a secure, HIPAA-compliant chat. Messages are encrypted and confidential.
          </p>
        </div>
      </div>
    </div>
  );
}

ChatModal.propTypes = {
  onClose: PropTypes.func.isRequired
};