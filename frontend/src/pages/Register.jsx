import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ phoneNumber: '', name: '', password: '', email: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    try {
      await axios.post('http://localhost:8080/api/auth/register', form);
      setMessage('Registration successful! Redirecting to login...');
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
      setSuccess(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Create Account</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} required />
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <div style={{ color: success ? 'green' : 'red', marginTop: 10, textAlign: 'center' }}>{message}</div>
      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <Link to="/login" style={{ textDecoration: 'none', color: 'blue' }}>Already have an account? Login</Link>
      </div>
    </div>
  );
}

export default Register;
