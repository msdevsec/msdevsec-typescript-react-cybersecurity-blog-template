import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/dashboard';
import PrivateRoute from './components/guards/PrivateRoute';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { PostPage } from './pages/PostPage';
import { TutorialsPage } from './pages/TutorialsPage';
import { PentestingPage } from './pages/PentestingPage';
import Hero from './components/Hero';
import LatestTutorials from './components/LatestTutorials';
import LatestPentesting from './components/LatestPentesting';
import PremiumSection from './components/PremiumSection';

const HomePage = () => (
  <>
    <Hero />
    <LatestTutorials />
    <LatestPentesting />
    <PremiumSection />
  </>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/pentesting" element={<PentestingPage />} />
          <Route path="/tutorials/:slug" element={<PostPage />} />
          <Route path="/pentesting/:slug" element={<PostPage />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </MainLayout>
    </AuthProvider>
  );
};

export default App;