import React from 'react';
import { useAuth } from '../services/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div style={{ marginTop: '80px', padding: '20px' }}>
      <h1>Welcome to DateZone</h1>
      <p>You are logged in as: {currentUser.email}</p>
    </div>
  );
};

export default Home; 