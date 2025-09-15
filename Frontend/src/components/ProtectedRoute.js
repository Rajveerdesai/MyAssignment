// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * @param {ReactNode} children - The component(s) to render if access is allowed
 * @param {string} role - Optional: role required to access this route ('admin', 'user', 'storeowner')
 */
const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem('role');  // get role from localStorage
  const token = localStorage.getItem('token');    // get token from localStorage

  // If user is not logged in, redirect to login
  if (!token) return <Navigate to="/" />;

  // If role is specified and doesn't match user's role, redirect to login
  if (role && role !== userRole) return <Navigate to="/" />;

  // Access allowed
  return children;
};

export default ProtectedRoute;
