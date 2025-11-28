import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiGetJSON, apiPutJSON } from '../../utils/api';
import {
  Bell,
  User,
  ChevronDown,
  Edit,
  Calendar,
  Clock,
  X,
  Pill,
  FileText,
  Download,
  Eye,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  MessageSquare,
  Stethoscope,
  Shield,
  History,
  FileCheck,
  Heart,
  Activity,
  Plus,
  CalendarCheck,
  Receipt,
  HelpCircle,
  Ambulance,
  Ticket,
  Lock
} from 'lucide-react';
import HeartBeatLogo from '../Brand/HeartBeatLogo';

export function PatientDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicalReports, setMedicalReports] = useState([]);
  const [billing, setBilling] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicationReminders, setMedicationReminders] = useState([]);
  const [visitHistory, setVisitHistory] = useState([]);
  const [insurance, setInsurance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchPatientData();
    fetchAppointments();
    fetchPrescriptions();
    fetchMedicalReports();
    fetchBilling();
    fetchDoctors();
    fetchMedicationReminders();
    fetchVisitHistory();
    fetchInsurance();
  }, []);

  const fetchPatientData = async () => {
    try {
      const data = await apiGetJSON('/api/patients/profile');
      setPatientData(data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const data = await apiGetJSON('/api/appointments/patient');
      setAppointments(data.map(apt => ({
        id: apt.id,
        appointmentId: `APT-${apt.id.toString().padStart(6, '0')}`,
        doctorName: apt.doctor?.name || 'Dr. Unknown',
        specialization: apt.doctor?.specialization || 'General',
        department: apt.doctor?.specialization || 'General Medicine',
        date: apt.date,
        time: apt.time,
        status: apt.status
      })));
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const data = await apiGetJSON('/api/prescriptions/patient');
      setPrescriptions(data.map(p => ({
        id: p.id,
        prescriptionId: `PRES-${p.id.toString().padStart(6, '0')}`,
        medicines: p.medicines || [],
        doctorName: p.doctor?.name || 'Dr. Unknown',
        issueDate: p.date || p.createdAt
      })));
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      setPrescriptions([
    {
      id: '1',
          prescriptionId: 'PRES-000001',
          medicines: [
            { name: 'Lisinopril 10mg', dosage: '10mg', frequency: 'Once daily' },
            { name: 'Amlodipine 5mg', dosage: '5mg', frequency: 'Once daily' }
          ],
          doctorName: 'Dr. Sarah Johnson',
          issueDate: '2025-01-15'
        }
      ]);
    }
  };

  const fetchMedicalReports = async () => {
    try {
      const data = await apiGetJSON('/api/medical-records/patient');
      setMedicalReports(data.map(r => ({
        id: r.id,
        name: r.title || r.name,
        testType: r.type || 'General',
        date: r.date || r.createdAt,
        type: r.type || 'pdf'
      })));
    } catch (error) {
      console.error('Error fetching medical reports:', error);
      setMedicalReports([
        { id: '1', name: 'Complete Blood Count (CBC)', testType: 'CBC', date: '2025-01-10', type: 'blood' },
        { id: '2', name: 'Chest X-Ray', testType: 'X-Ray', date: '2025-01-05', type: 'xray' },
        { id: '3', name: 'ECG Report', testType: 'ECG', date: '2024-12-20', type: 'ecg' },
        { id: '4', name: 'MRI Brain Scan', testType: 'MRI', date: '2024-12-15', type: 'mri' }
      ]);
    }
  };

  const fetchBilling = async () => {
    try {
      setBilling([
        { id: '1', invoiceNo: 'INV-2025-001', service: 'Consultation', amount: 500, status: 'Paid' },
        { id: '2', invoiceNo: 'INV-2025-002', service: 'Lab Tests', amount: 1200, status: 'Unpaid' },
        { id: '3', invoiceNo: 'INV-2025-003', service: 'X-Ray', amount: 800, status: 'Paid' },
        { id: '4', invoiceNo: 'INV-2025-004', service: 'MRI Scan', amount: 3500, status: 'Unpaid' }
      ]);
    } catch (error) {
      console.error('Error fetching billing:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const data = await apiGetJSON('/api/doctors');
      setDoctors(data.map(d => ({
        id: d.id,
        name: d.name,
        specialization: d.specialization || 'General',
        qualifications: d.qualifications || 'MBBS, MD',
        experience: d.experience || '10+ Years',
        consultationFee: d.consultationFee || 500
      })));
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([
        { id: '1', name: 'Dr. Sarah Johnson', specialization: 'Cardiology', qualifications: 'MBBS, MD', experience: '12+ Years', consultationFee: 800 },
        { id: '2', name: 'Dr. Michael Chen', specialization: 'Neurology', qualifications: 'MBBS, MD, DM', experience: '15+ Years', consultationFee: 1000 },
        { id: '3', name: 'Dr. Emily Davis', specialization: 'Pediatrics', qualifications: 'MBBS, MD', experience: '8+ Years', consultationFee: 600 }
      ]);
    }
  };

  const fetchMedicationReminders = async () => {
    try {
      setMedicationReminders([
        { id: '1', medicine: 'Lisinopril 10mg', time: 'Morning', dosage: '1 tablet', taken: false },
        { id: '2', medicine: 'Amlodipine 5mg', time: 'Evening', dosage: '1 tablet', taken: false },
        { id: '3', medicine: 'Metformin 500mg', time: 'Afternoon', dosage: '1 tablet', taken: true }
      ]);
    } catch (error) {
      console.error('Error fetching medication reminders:', error);
    }
  };

  const fetchVisitHistory = async () => {
    try {
      const data = await apiGetJSON('/api/appointments/patient');
      const completed = data
        .filter(apt => apt.status === 'COMPLETED')
        .map(apt => ({
          id: apt.id,
          visitDate: apt.date,
          doctorName: apt.doctor?.name || 'Dr. Unknown',
          department: apt.doctor?.specialization || 'General',
          diagnosis: apt.diagnosis || 'Routine Checkup',
          prescriptionLink: apt.prescriptionId,
          reportsLink: apt.reportId
        }));
      setVisitHistory(completed);
    } catch (error) {
      console.error('Error fetching visit history:', error);
    }
  };

  const fetchInsurance = async () => {
    try {
      setInsurance({
        provider: 'HealthCare Insurance Co.',
        policyNumber: 'POL-2025-123456',
        validity: '2025-12-31',
        coverageAmount: 500000,
        cardNumber: 'INS-987654321'
      });
    } catch (error) {
      console.error('Error fetching insurance:', error);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await apiPutJSON(`/api/appointments/${appointmentId}/status`, { status: 'CANCELLED' });
      fetchAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'PENDING': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: AlertCircle, text: 'Pending' },
      'CONFIRMED': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle, text: 'Confirmed' },
      'COMPLETED': { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, text: 'Completed' },
      'CANCELLED': { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle, text: 'Cancelled' },
      'Paid': { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, text: 'Paid' },
      'Unpaid': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: AlertCircle, text: 'Unpaid' }
    };

    const statusInfo = statusMap[status] || statusMap['PENDING'];
    const Icon = statusInfo.icon;

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border ${statusInfo.color}`}>
        <Icon size={12} />
        {statusInfo.text}
      </span>
    );
  };

  const getReportIcon = (type) => {
    const iconMap = {
      'blood': <Activity size={20} className="text-red-500" />,
      'xray': <FileText size={20} className="text-blue-500" />,
      'ecg': <Heart size={20} className="text-green-500" />,
      'mri': <FileCheck size={20} className="text-purple-500" />,
      'pdf': <FileText size={20} className="text-gray-500" />
    };
    return iconMap[type] || iconMap['pdf'];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const patient = patientData || {
    name: user?.name || 'Patient Name',
    mrn: 'MRN-2025-001234',
    age: 35,
    gender: 'Male',
    bloodGroup: 'O+',
    contactNumber: '+1 234 567 8900',
    email: user?.email || 'patient@example.com',
    insuranceProvider: 'HealthCare Insurance Co.'
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'PENDING' || apt.status === 'CONFIRMED').length;
  const activePrescriptions = prescriptions.length;
  const availableReports = medicalReports.length;
  const pendingPayments = billing.filter(b => b.status === 'Unpaid').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP HEADER - NO SIDEBAR */}
      <header className="bg-white shadow-sm h-[70px] flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <HeartBeatLogo size={24} />
          <span className="text-xl font-semibold text-gray-900">Hospital Management System</span>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
        </button>

          <div className="relative">
        <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {patient.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-gray-900">{patient.name}</span>
              <ChevronDown size={18} className="text-gray-600" />
         </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
        <button
                  onClick={() => navigate('/settings')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
                  Profile Settings
         </button>
        <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
         </button>
       </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* 1. PATIENT OVERVIEW CARD */}
        <div className="bg-white rounded-[20px] shadow-md p-[30px] border border-gray-100">
                  <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                {patient.name.charAt(0).toUpperCase()}
                      </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
                <p className="text-sm text-gray-500">Patient ID: <span className="font-semibold text-gray-700">{patient.mrn}</span></p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Age: {patient.age} years</span>
                  <span>•</span>
                  <span>Gender: {patient.gender}</span>
                  <span>•</span>
                  <span>Blood Group: <span className="font-semibold text-red-600">{patient.bloodGroup}</span></span>
                    </div>
                <p className="text-sm text-gray-600">Contact: {patient.contactNumber}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Shield size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {patient.insuranceProvider}
                      </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/settings')}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit size={16} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* 2. HEALTH SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{upcomingAppointments}</p>
                <p className="text-sm text-gray-500">Upcoming Appointments</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Pill size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activePrescriptions}</p>
                <p className="text-sm text-gray-500">Active Prescriptions</p>
              </div>
                    </div>
                  </div>
                  
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{availableReports}</p>
                <p className="text-sm text-gray-500">Medical Reports</p>
              </div>
            </div>
                        </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Receipt size={24} className="text-yellow-600" />
                    </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingPayments}</p>
                <p className="text-sm text-gray-500">Pending Payments</p>
                </div>
            </div>
          </div>
        </div>

        {/* 3. OFFICIAL APPOINTMENTS SECTION */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
            <p className="text-sm text-gray-500 mt-1">View your upcoming and past visits</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Appointment ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.appointmentId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.doctorName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span>{appointment.date}</span>
                          <Clock size={16} className="text-gray-400" />
                          <span>{appointment.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(appointment.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {(appointment.status === 'PENDING' || appointment.status === 'CONFIRMED') && (
                            <>
                              <button
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                Cancel
                              </button>
                              <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                Reschedule
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No appointments found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. DOCTOR DIRECTORY */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Doctor Directory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white shadow">
                    <Stethoscope size={24} className="text-blue-600" />
            </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-blue-600">{doctor.specialization}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><span className="font-medium">Qualifications:</span> {doctor.qualifications}</p>
                  <p><span className="font-medium">Experience:</span> {doctor.experience}</p>
                  <p><span className="font-medium">Consultation Fee:</span> ₹{doctor.consultationFee}</p>
              </div>
              <button
                  onClick={() => navigate('/book-appointment', { state: { doctorId: doctor.id } })}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                  Book Appointment
              </button>
              </div>
            ))}
            </div>
          </div>

        {/* 5. PRESCRIPTIONS - Official Pharmacy Format */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-[#E3F2FD] px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Prescriptions</h2>
            </div>
          <div className="p-6 space-y-4">
                {prescriptions.map((prescription) => (
              <div key={prescription.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Prescription ID</p>
                    <p className="font-semibold text-gray-900">{prescription.prescriptionId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Issue Date</p>
                    <p className="font-semibold text-gray-900">{prescription.issueDate}</p>
                  </div>
                    </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Medicines:</p>
                  <div className="space-y-2">
                    {prescription.medicines.map((med, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-gray-900">{med.name || med}</p>
                          <p className="text-sm text-gray-600">
                            {med.dosage && `${med.dosage} • `}{med.frequency || 'As prescribed'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Prescribed by: <span className="font-medium">{prescription.doctorName}</span></p>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download size={16} />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
            </div>
          </div>

        {/* 6. MEDICAL REPORTS - Official Lab Format */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Medical Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {medicalReports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
                <div className="flex items-start space-x-3 mb-3">
                  {getReportIcon(report.type)}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{report.name}</h3>
                    <p className="text-sm text-gray-500">Test Type: {report.testType}</p>
                    <p className="text-xs text-gray-400 mt-1">{report.date}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    <Eye size={16} />
                    <span className="text-sm">View</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Download size={16} />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. BILLING & INVOICE SECTION */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-[#E3F2FD] px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Billing & Invoices</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {billing.map((bill) => (
                  <tr key={bill.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bill.invoiceNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bill.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{bill.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(bill.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Download size={14} className="inline mr-1" />
                          Receipt
                        </button>
                        {bill.status === 'Unpaid' && (
                          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                            Pay Now
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
            </div>

        {/* 8. MEDICATION REMINDER */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Medication Reminder</h2>
              <div className="space-y-3">
            {medicationReminders.map((reminder) => (
              <div key={reminder.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${reminder.taken ? 'bg-green-100' : 'bg-blue-100'}`}>
                    <Pill size={20} className={reminder.taken ? 'text-green-600' : 'text-blue-600'} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{reminder.medicine}</p>
                    <p className="text-sm text-gray-500">{reminder.time} • {reminder.dosage}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!reminder.taken && (
                    <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Mark Taken
                    </button>
                  )}
                  {reminder.taken && (
                    <span className="text-sm text-green-600 flex items-center">
                      <CheckCircle size={16} className="mr-1" />
                      Taken
                    </span>
                  )}
                </div>
              </div>
            ))}
            <button className="w-full mt-4 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2">
              <Plus size={16} />
              <span>Add Reminder</span>
            </button>
          </div>
        </div>

        {/* 9. SUPPORT & EMERGENCY CONTACT */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Support & Emergency Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Phone size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Hospital Helpline</p>
                  <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
                <Ambulance size={20} className="text-red-600" />
                <div>
                  <p className="font-medium text-gray-900">Emergency Number</p>
                  <p className="text-sm text-gray-600">+1 (555) 911-HELP</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
                <Ambulance size={20} className="text-yellow-600" />
                <div>
                  <p className="font-medium text-gray-900">Ambulance</p>
                  <p className="text-sm text-gray-600">+1 (555) 911-AMB</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <MessageSquare size={20} />
                <span>Start Chat with Support</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                <Ticket size={20} />
                <span>Raise a Ticket</span>
              </button>
            </div>
          </div>
        </div>

        {/* 10. VISIT HISTORY */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Visit History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visit Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor Consulted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Diagnosis Summary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Links</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {visitHistory.length > 0 ? (
                  visitHistory.map((visit) => (
                    <tr key={visit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visit.visitDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visit.doctorName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visit.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{visit.diagnosis}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {visit.prescriptionLink && (
                            <button className="text-sm text-blue-600 hover:underline">Prescription</button>
                          )}
                          {visit.reportsLink && (
                            <button className="text-sm text-blue-600 hover:underline">Reports</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No visit history available</td>
                  </tr>
                )}
              </tbody>
            </table>
        </div>
      </div>

        {/* 11. INSURANCE & POLICY DETAILS */}
        {insurance && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Insurance & Policy Details</h2>
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Insurance Provider</p>
                  <p className="font-semibold text-gray-900">{insurance.provider}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Policy Number</p>
                  <p className="font-semibold text-gray-900">{insurance.policyNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Validity</p>
                  <p className="font-semibold text-gray-900">{insurance.validity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Coverage Amount</p>
                  <p className="font-semibold text-gray-900">₹{insurance.coverageAmount.toLocaleString()}</p>
                </div>
              </div>
              <button className="mt-4 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download size={16} />
                <span>Download Insurance Card</span>
              </button>
            </div>
          </div>
        )}

        {/* 12. DATA PRIVACY MESSAGE */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Lock size={20} className="text-gray-600 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Data Privacy & Security</p>
              <p className="text-xs text-gray-600 mb-3">
                Your data is protected under HIPAA / NABH / GDPR standards. All medical information is encrypted and securely stored.
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <button className="hover:text-blue-600 hover:underline">Privacy Policy</button>
                <span>•</span>
                <button className="hover:text-blue-600 hover:underline">Terms & Conditions</button>
                <span>•</span>
                <span>Contact: privacy@hospital.com</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
