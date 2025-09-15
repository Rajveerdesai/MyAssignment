import React, { useEffect, useState } from 'react';
import API from '../api/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users:0, stores:0, ratings:0 });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await API.get('/admin/stats');
      setStats(res.data);
    };
    fetchStats();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="card p-3 mb-3">
        <p>Total Users: {stats.users}</p>
        <p>Total Stores: {stats.stores}</p>
        <p>Total Ratings: {stats.ratings}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
