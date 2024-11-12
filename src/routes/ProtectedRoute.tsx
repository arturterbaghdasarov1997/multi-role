import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  role: string;
  requiredRole: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, requiredRole, children }) => {
  if (role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
