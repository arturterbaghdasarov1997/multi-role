// src/router/AppRouter.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import EditProfile from '../components/EditProfile';
import UserManagementPage from '../pages/UserManagementPage';
import ProtectedRoute from './ProtectedRoute';
import { RoleProvider } from '../context/Rolecontext';

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
        </Routes>
      </Router>
    </RoleProvider>
  );
};

export default AppRouter;
