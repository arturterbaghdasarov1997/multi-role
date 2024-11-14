import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import EditProfile from '../components/EditProfile';
import UserManagementPage from '../pages/UserManagementPage';
import ProtectedRoute from './ProtectedRoute';
import { RoleProvider } from '../context/Rolecontext';
import CourierManagementPage from '../pages/CourierManagementPage';
import AssignTaskForm from '../components/AssignTaskForm';
import CourierTasksPage from '../pages/CourierTasksPage';

const AppRouter: React.FC = () => {
  return (
    <RoleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route
            path="/user-management"
            element={
              <ProtectedRoute role={"admin"} requiredRole="admin">
                <UserManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courier-management"
            element={
              <ProtectedRoute role={"admin"} requiredRole="admin">
                <CourierManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courier-tasks"
            element={
              <ProtectedRoute role={"courier"} requiredRole="courier">
                <CourierTasksPage />
              </ProtectedRoute>
            }
          />
          <Route path="/assign-task" element={<AssignTaskForm />} />
        </Routes>
      </Router>
    </RoleProvider>
  );
};

export default AppRouter;
