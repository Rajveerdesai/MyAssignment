import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div className="container mt-5">
      <h2>User Dashboard</h2>
      <p>Welcome! You can browse and rate stores.</p>
      <Link to="/stores" className="btn btn-primary">View Stores</Link>
    </div>
  );
};

export default UserDashboard;
