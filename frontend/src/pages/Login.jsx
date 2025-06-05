import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    try {
      await axios.post('http://localhost:8080/api/auth/send-otp', { phoneNumber });
      setMessage('OTP sent to your email!');
      setSuccess(true);
      setTimeout(() => navigate('/verify-otp', { state: { phoneNumber } }), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send OTP');
      setSuccess(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Login with OTP</h2>
      <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          required
          style={{ padding: 10, margin: '10px 0', borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{
            padding: 10,
            borderRadius: 4,
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
            fontSize: 16,
          }}
        >
          Send OTP
        </button>
      </form>
      <div className={success ? 'success' : 'error'} style={{ textAlign: 'center', margin: '10px 0', color: success ? 'green' : 'red' }}>
        {message}
      </div>
      <Link to="/register" style={{ textAlign: 'center', display: 'block', marginTop: 10, color: '#007bff', textDecoration: 'none' }}>
        Don't have an account? Register
      </Link>
    </div>
  );
}

export default Login;
