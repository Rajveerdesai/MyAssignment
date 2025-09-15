// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/login';
import SignUp from './pages/signup';
import UserDashboard from './pages/userdashboard';
import AdminDashboard from './pages/admindashboard';
import OwnerDashboard from './pages/ownerdashboard';
import StoreList from './pages/storelist';
import UpdatePassword from './pages/updatepassword';




// Admin pages
import AdminAddUser from './pages/adminadduser';
import AdminAddStore from './pages/adminaddstore';
import AdminViewUsers from './pages/adminviewusers';
import AdminViewStores from './pages/adminviewstores';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* User Routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stores"
            element={
              <ProtectedRoute role="user">
                <StoreList />
              </ProtectedRoute>
            }
          />

          {/* Owner Routes */}
          <Route
            path="/owner"
            element={
              <ProtectedRoute role="storeowner">
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-user"
            element={
              <ProtectedRoute role="admin">
                <AdminAddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-store"
            element={
              <ProtectedRoute role="admin">
                <AdminAddStore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/view-users"
            element={
              <ProtectedRoute role="admin">
                <AdminViewUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/view-stores"
            element={
              <ProtectedRoute role="admin">
                <AdminViewStores />
              </ProtectedRoute>
            }
          />

          {/* Update Password (accessible by all logged-in users) */}
          <Route
            path="/update-password"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
