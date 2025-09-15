import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', { name, email, address, password });
      alert('Signup successful! Please login.');
      navigate('/');
    } catch(err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  }

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input type="text" placeholder="Full Name" className="form-control mb-2" value={name} onChange={e=>setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="form-control mb-2" value={email} onChange={e=>setEmail(e.target.value)} required />
        <textarea placeholder="Address" className="form-control mb-2" value={address} onChange={e=>setAddress(e.target.value)} required />
        <input type="password" placeholder="Password" className="form-control mb-2" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-success">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
