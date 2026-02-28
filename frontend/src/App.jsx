import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import RegisterInstitute from './pages/RegisterInstitute';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageTeachers from './pages/admin/ManageTeachers';
import ManageStudents from './pages/admin/ManageStudents';
import AddStudent from './pages/admin/AddStudent';
import AddTeacher from './pages/admin/AddTeacher';
import AddClass from './pages/admin/AddClass';
import ManageClasses from './pages/admin/ManageClasses';
import ManageFees from './pages/admin/ManageFees';
import ManageAttendance from './pages/admin/ManageAttendance';
import Messaging from './pages/admin/Messaging';
import Reports from './pages/admin/Reports';
import TeacherProfile from './pages/admin/TeacherProfile';
import StudentProfile from './pages/admin/StudentProfile';
import ClassDetails from './pages/admin/ClassDetails';
import Settings from './pages/admin/Settings';

import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import StudentDashboard from './pages/student/StudentDashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'superadmin' || user.role === 'institute') return <Navigate to="/admin/dashboard" />;
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return <MainLayout>{children}</MainLayout>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterInstitute />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/teachers" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <ManageTeachers />
            </ProtectedRoute>
          } />
          <Route path="/admin/teachers/add" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <AddTeacher />
            </ProtectedRoute>
          } />
          <Route path="/admin/teachers/:id" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <TeacherProfile />
            </ProtectedRoute>
          } />
          <Route path="/admin/classes/add" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <AddClass />
            </ProtectedRoute>
          } />
          <Route path="/admin/students" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <ManageStudents />
            </ProtectedRoute>
          } />
          <Route path="/admin/students/add" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <AddStudent />
            </ProtectedRoute>
          } />
          <Route path="/admin/students/:id" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <StudentProfile />
            </ProtectedRoute>
          } />
          <Route path="/admin/classes" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <ManageClasses />
            </ProtectedRoute>
          } />
          <Route path="/admin/classes/:id" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <ClassDetails />
            </ProtectedRoute>
          } />
          <Route path="/admin/fees" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <ManageFees />
            </ProtectedRoute>
          } />
          <Route path="/admin/attendance" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <ManageAttendance />
            </ProtectedRoute>
          } />
          <Route path="/admin/messages" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <Messaging />
            </ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <Reports />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute allowedRoles={['superadmin', 'institute']}>
              <Settings />
            </ProtectedRoute>
          } />

          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          } />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />

          {/* Parent Routes */}
          <Route path="/parent/dashboard" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
