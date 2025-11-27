import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Download, FileText, Calendar, Filter, Search, Eye } from 'lucide-react';

export function ReportsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const reports = [
    {
      id: '1',
      title: 'Complete Blood Count Report',
      type: 'lab',
      date: '2025-01-15',
      doctor: 'Dr. Sarah Johnson',
      size: '2.4 MB',
      status: 'ready'
    },
    {
      id: '2',
      title: 'Cardiac Stress Test Results',
      type: 'test',
      date: '2025-01-10',
      doctor: 'Dr. Sarah Johnson',
      size: '5.1 MB',
      status: 'ready'
    },
    {
      id: '3',
      title: 'Annual Physical Examination',
      type: 'exam',
      date: '2025-01-05',
      doctor: 'Dr. Michael Chen',
      size: '1.8 MB',
      status: 'ready'
    },
    {
      id: '4',
      title: 'MRI Scan - Right Knee',
      type: 'imaging',
      date: '2024-12-20',
      doctor: 'Dr. Michael Chen',
      size: '12.3 MB',
      status: 'ready'
    },
    {
      id: '5',
      title: 'Vaccination Record',
      type: 'record',
      date: '2024-12-15',
      doctor: 'Dr. Amanda Rodriguez',
      size: '890 KB',
      status: 'ready'
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || report.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getReportTypeColor = (type) => {
    switch (type) {
      case 'lab': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'test': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'exam': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'imaging': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'record': return 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleDownload = (reportId) => {
    // Simulate download
    console.log('Downloading report:', reportId);
  };

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medical Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Download and manage your medical reports and test results</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Your Health Records at Your Fingertips</h2>
          <p className="text-xl opacity-90 mb-6">
            Access all your medical reports, test results, and health documents securely. Download anytime, anywhere.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Download className="w-5 h-5 mr-2" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FileText className="w-5 h-5 mr-2" />
              <span>Multiple Formats</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Organized by Date</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{reports.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center">
            <Download className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Downloaded</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">22.5 MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="lab">Lab Reports</option>
              <option value="test">Test Results</option>
              <option value="exam">Examinations</option>
              <option value="imaging">Imaging</option>
              <option value="record">Records</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{report.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Dr. {report.doctor}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getReportTypeColor(report.type)}`}>
                    {report.type}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{report.size}</span>
                  <button
                    onClick={() => handleDownload(report.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                    title="Download Report"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Generated on {report.date}</span>
                <span className="text-green-600 dark:text-green-400">✓ Ready for download</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No reports found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Download History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Downloads</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Complete Blood Count Report</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Downloaded 2 days ago</p>
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">Completed</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Cardiac Stress Test Results</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Downloaded 1 week ago</p>
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}