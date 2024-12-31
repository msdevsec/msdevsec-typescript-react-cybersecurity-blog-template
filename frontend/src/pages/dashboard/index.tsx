import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserDashboard } from './UserDashboard';
import { AdminDashboard } from './AdminDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return null; // or redirect to login
  }
  
  if (user.role === 'ADMIN') {
    return <AdminDashboard />;
  }
  
  return <UserDashboard />;
};

export default Dashboard;
