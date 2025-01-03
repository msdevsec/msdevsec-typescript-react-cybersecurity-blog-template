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
import { default as PremiumPage } from './pages/premium';
import { default as CommunityPage } from './pages/community';
import { CreatePost } from './pages/dashboard/CreatePost';
import { EditPost } from './pages/dashboard/EditPost';
import { DraftsPage } from './pages/dashboard/DraftsPage';
import ManagePosts from './pages/dashboard/ManagePosts';
import ManageUsers from './pages/dashboard/ManageUsers';
import UserComments from './pages/dashboard/UserComments';

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
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard/posts/new" 
            element={
              <PrivateRoute requireAdmin>
                <CreatePost />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard/posts/:id/edit" 
            element={
              <PrivateRoute requireAdmin>
                <EditPost />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard/drafts" 
            element={
              <PrivateRoute requireAdmin>
                <DraftsPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard/posts" 
            element={
              <PrivateRoute requireAdmin>
                <ManagePosts />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard/users" 
            element={
              <PrivateRoute requireAdmin>
                <ManageUsers />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard/comments" 
            element={
              <PrivateRoute>
                <UserComments />
              </PrivateRoute>
            } 
          />
        </Routes>
      </MainLayout>
    </AuthProvider>
  );
};

export default App;
