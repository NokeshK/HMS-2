import React, { useState } from 'react';
import { Bell, CheckCircle, XCircle, FileText, AlertCircle, Trash2 } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    type: 'new_appointment',
    title: 'New Appointment',
    message: 'Sarah Johnson has scheduled an appointment for Jan 25 at 2:00 PM',
    timestamp: '2025-01-18T10:30:00',
    read: false
  },
  {
    id: 2,
    type: 'cancelled_appointment',
    title: 'Appointment Cancelled',
    message: 'Michael Chen has cancelled his appointment scheduled for Jan 20',
    timestamp: '2025-01-17T14:15:00',
    read: true
  },
  {
    id: 3,
    type: 'report_uploaded',
    title: 'Report Uploaded',
    message: 'Patient medical report uploaded by Emily Rodriguez',
    timestamp: '2025-01-16T09:45:00',
    read: false
  },
  {
    id: 4,
    type: 'urgent_message',
    title: 'Urgent Message from Admin',
    message: 'Please review the new clinic guidelines update',
    timestamp: '2025-01-15T11:20:00',
    read: true
  }
];

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_appointment':
        return <CheckCircle size={18} className="text-blue-600" />;
      case 'cancelled_appointment':
        return <XCircle size={18} className="text-red-600" />;
      case 'report_uploaded':
        return <FileText size={18} className="text-purple-600" />;
      case 'urgent_message':
        return <AlertCircle size={18} className="text-orange-600" />;
      default:
        return <Bell size={18} className="text-gray-600" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'new_appointment':
        return 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-600';
      case 'cancelled_appointment':
        return 'bg-red-50 dark:bg-red-900/10 border-l-4 border-red-600';
      case 'report_uploaded':
        return 'bg-purple-50 dark:bg-purple-900/10 border-l-4 border-purple-600';
      case 'urgent_message':
        return 'bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-600';
      default:
        return 'bg-gray-50 dark:bg-gray-700 border-l-4 border-gray-600';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell size={24} className="text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400">{unreadCount} unread</p>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-8 px-6 overflow-x-auto">
          {[
            { id: 'all', label: 'All Notifications', count: notifications.length },
            { id: 'unread', label: 'Unread', count: unreadCount }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                filter === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              {tab.label} <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-6">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg transition-all ${getNotificationColor(notification.type)} ${
                  !notification.read ? 'shadow-md' : 'opacity-75'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{formatTime(notification.timestamp)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors whitespace-nowrap"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bell size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
