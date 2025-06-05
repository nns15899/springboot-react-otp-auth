import React from 'react';

function Dashboard() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2 style={{ color: '#6366f1', fontWeight: 700 }}>Welcome! You are logged in.</h2>
      <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '1.5rem' }}>
        You have successfully completed OTP authentication.<br />
        Explore the app or log out as needed.
      </p>
    </div>
  );
}

export default Dashboard;
