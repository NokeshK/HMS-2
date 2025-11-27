import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { LoginForm } from './Auth/LoginForm.jsx';
import { RegisterForm } from './Auth/RegisterForm.jsx';
import { Layout } from './Layout/Layout.jsx';
import { DoctorDashboard } from './Dashboard/DoctorDashboard.jsx';
import { PatientDashboard } from './Dashboard/PatientDashboard.jsx';
import { AdminDashboard } from './Dashboard/AdminDashboard.jsx';

 // Import page components
import { LandingPage } from '../pages/LandingPage.jsx';
import { BookAppointmentPage } from '../pages/BookAppointmentPage.jsx';
import { AppointmentsPage } from '../pages/AppointmentsPage.jsx';
import { MedicalRecordsPage } from '../pages/MedicalRecordsPage.jsx';
import { ChatPage } from '../pages/ChatPage.jsx';
import { ReportsPage } from '../pages/ReportsPage.jsx';
import { SettingsPage } from '../pages/SettingsPage.jsx';

// Import doctor pages
import { DoctorAppointmentsPage } from '../pages/DoctorAppointmentsPage.jsx';
import { DoctorPatientsPage } from '../pages/DoctorPatientsPage.jsx';
import { DoctorMedicalRecordsPage } from '../pages/DoctorMedicalRecordsPage.jsx';
import { DoctorReportsPage } from '../pages/DoctorReportsPage.jsx';

// Protected Route Component
function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// Auth Route Component
function AuthRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// Component to handle SPA redirects from 404.html
function SPARedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we have a redirect from 404.html
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get('/');

    if (redirectPath) {
      // Remove the query parameter and navigate to the actual route
      const cleanPath = redirectPath.replace(/~and~/g, '&');
      navigate(cleanPath, { replace: true });
    }
  }, [location, navigate]);

  return null;
}

export function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SPARedirectHandler />
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginForm onNavigateToRegister={() => window.location.href = `${import.meta.env.BASE_URL}register`} />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <RegisterForm onNavigateToLogin={() => window.location.href = `${import.meta.env.BASE_URL}login`} />
            </AuthRoute>
          }
        />

        {/* Public landing page as default route */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardRouter />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Patient Routes */}
        <Route
          path="/book-appointment"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <Layout>
                <BookAppointmentPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <Layout>
                <AppointmentsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/medical-records"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <Layout>
                <MedicalRecordsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <Layout>
                <ChatPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <Layout>
                <ReportsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Doctor Routes */}
        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <Layout>
                <DoctorAppointmentsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <Layout>
                <DoctorPatientsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/medical-records"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <Layout>
                <DoctorMedicalRecordsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/reports"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <Layout>
                <DoctorReportsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Settings/Profile Routes */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <SettingsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// Dashboard Router Component
function DashboardRouter() {
  const { user } = useAuth();

  switch (user?.role) {
    case 'doctor':
      return <DoctorDashboard />;
    case 'patient':
      return <PatientDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <div>Invalid role</div>;
  }
}
