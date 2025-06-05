import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function VerifyOtp() {
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState(location.state?.phoneNumber || '');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    try {
      await axios.post('http://localhost:8080/api/auth/verify-otp', { phoneNumber, otp });
      setMessage('OTP verified! Redirecting to dashboard...');
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'OTP verification failed');
      setSuccess(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Verify OTP</h2>
      <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          required
          style={{ marginBottom: 10, padding: 10, fontSize: 16 }}
        />
        <input
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
          style={{ marginBottom: 10, padding: 10, fontSize: 16 }}
        />
        <button
          type="submit"
          style={{
            padding: 10,
            fontSize: 16,
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            marginBottom: 10
          }}
        >
          Verify OTP
        </button>
      </form>
      <div className={success ? 'success' : 'error'} style={{ textAlign: 'center', marginBottom: 10 }}>
        {message}
      </div>
      <Link to="/login" style={{ textAlign: 'center', display: 'block', color: '#007bff', textDecoration: 'none' }}>
        Back to Login
      </Link>
    </div>
  );
}

export default VerifyOtp;
