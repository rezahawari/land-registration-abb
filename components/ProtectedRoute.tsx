import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute - Melindungi halaman yang hanya bisa diakses user yang sudah login
 * Jika belum login, redirect ke halaman login
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

/**
 * PublicRoute - Melindungi halaman yang hanya bisa diakses user yang belum login
 * Jika sudah login, redirect ke halaman awal
 */
export const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
