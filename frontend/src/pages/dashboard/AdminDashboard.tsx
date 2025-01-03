import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 2rem 2rem;
`;

const DashboardCard = styled.div`
  background: rgba(13, 13, 13, 0.8);
  border: 1px solid rgba(128, 0, 255, 0.3);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(128, 0, 255, 0.1);
`;

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  color: #9F00FF;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(159, 0, 255, 0.5);
`;

const WelcomeMessage = styled.p`
  color: #9F00FF;
  font-family: 'Roboto Mono', monospace;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  text-shadow: 0 0 5px rgba(159, 0, 255, 0.3);
  max-width: 800px;
`;

const SectionTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  color: #9F00FF;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 8px rgba(159, 0, 255, 0.4);
`;

const ButtonGrid = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  background: rgba(159, 0, 255, 0.1);
  border: 1px solid #9F00FF;
  padding: 1.5rem;
  border-radius: 8px;
  color: #9F00FF;
  font-family: 'Orbitron', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 0 5px rgba(159, 0, 255, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(159, 0, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(159, 0, 255, 0.2);
  }

  span:first-child {
    font-size: 1.2rem;
    font-weight: bold;
  }

  span:last-child {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <DashboardCard>
        <Title>Admin Dashboard</Title>
        <WelcomeMessage>
          Welcome to the MSDEVSEC Blog administration panel. You have been granted full administrative access to manage and curate content across the platform. From here, you can create engaging new posts, manage existing content, and oversee user accounts. Your role is crucial in maintaining the quality and security of our community's knowledge base.
        </WelcomeMessage>
        
        <SectionTitle>Content Management</SectionTitle>
        <ButtonGrid>
          <ActionButton onClick={() => navigate('/dashboard/posts/new')}>
            <span>Create New Post</span>
            <span>Write a new blog post</span>
          </ActionButton>
          
          <ActionButton onClick={() => navigate('/dashboard/drafts')}>
            <span>Drafts</span>
            <span>View saved drafts</span>
          </ActionButton>
          
          <ActionButton onClick={() => navigate('/dashboard/posts')}>
            <span>Manage Posts</span>
            <span>Edit and moderate posts</span>
          </ActionButton>
          
          <ActionButton onClick={() => navigate('/dashboard/users')}>
            <span>Manage Users</span>
            <span>View and manage users</span>
          </ActionButton>
        </ButtonGrid>
      </DashboardCard>
    </Container>
  );
};
