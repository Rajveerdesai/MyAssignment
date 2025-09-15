import React, { useState } from 'react';
import API from '../api/api';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put('/auth/update-password', { password });
      alert('Password updated successfully');
    } catch(err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  }

  return (
    <div className="container mt-5">
      <h2>Update Password</h2>
      <form onSubmit={handleUpdate}>
        <input type="password" className="form-control mb-2" placeholder="New Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
