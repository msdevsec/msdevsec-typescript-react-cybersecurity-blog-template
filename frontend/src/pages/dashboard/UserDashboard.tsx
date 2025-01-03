import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface UserComment {
  id: string;
  content: string;
  createdAt: string;
  post: {
    title: string;
    slug: string;
    category: string;
  };
}

const Container = styled.div`
  padding: 8rem 2rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GoBackButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: rgba(159, 0, 255, 0.1);
  border: 1px solid #9F00FF;
  border-radius: 4px;
  color: #9F00FF;
  font-family: 'Orbitron', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 120px;
  margin-bottom: 1rem;

  &:hover {
    background: rgba(159, 0, 255, 0.2);
    box-shadow: 0 0 10px rgba(159, 0, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const DashboardCard = styled.div`
  background: rgba(0, 20, 0, 0.6);
  border: 1px solid #0F0;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
`;

const Title = styled.h1`
  color: #9F00FF;
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(159, 0, 255, 0.5);
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 255, 0, 0.2);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const SectionTitle = styled.h2`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  align-items: stretch;
`;

const InfoItem = styled.div`
  background: rgba(0, 20, 0, 0.4);
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid rgba(0, 255, 0, 0.2);
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Label = styled.p`
  color: rgba(0, 255, 0, 0.7);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Value = styled.p<{ isAccountType?: boolean }>`
  color: ${props => props.isAccountType ? 'inherit' : '#0F0'};
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: clamp(0.75rem, 1.1rem, 1.1rem);
  transition: all 0.2s ease;

  &:hover {
    white-space: normal;
    word-break: break-all;
    position: relative;
    z-index: 1;
    background: rgba(0, 20, 0, 0.9);
    padding: 0.25rem;
    border-radius: 4px;
  }
`;

const AccountTypeValue = styled(Value)`
  color: ${props => props.children === 'Premium' ? '#FFD700' : '#0F0'};
  text-shadow: ${props => props.children === 'Premium' ? '0 0 5px rgba(255, 215, 0, 0.3)' : '0 0 5px rgba(0, 255, 0, 0.3)'};
`;

const PremiumCard = styled.div`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid #FFD700;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const PremiumTitle = styled(SectionTitle)`
  color: #FFD700;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
`;

const PremiumText = styled.p`
  color: rgba(255, 215, 0, 0.9);
  font-family: 'Roboto Mono', monospace;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const PremiumFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
`;

const PremiumFeature = styled.div`
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 4px;
  padding: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.1);
  }
`;

const FeatureTitle = styled.h3`
  color: #FFD700;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 3px rgba(255, 215, 0, 0.3);
`;

const FeatureDescription = styled.p`
  color: rgba(255, 215, 0, 0.8);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const PremiumButton = styled.button`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid #FFD700;
  color: #FFD700;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-family: 'Orbitron', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: rgba(255, 215, 0, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.2);
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentCard = styled.div`
  background: rgba(0, 20, 0, 0.4);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 4px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 20, 0, 0.6);
    transform: translateX(5px);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
  }
`;

const CommentContent = styled.p`
  color: rgba(0, 255, 0, 0.8);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const CommentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(0, 255, 0, 0.6);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.8rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #0F0;
  font-size: 1.2rem;
  padding: 2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #FF0000;
  font-size: 1.2rem;
  padding: 2rem;
`;

const ViewAllButton = styled.button`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid #0F0;
  color: #0F0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 0, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
  }
`;

export const UserDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [comments, setComments] = useState<UserComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/comments/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch comments');
        
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError('Failed to load your comments');
      } finally {
        setLoading(false);
      }
    };

    fetchUserComments();
  }, [token]);

  const handleCommentClick = (comment: UserComment) => {
    const baseUrl = comment.post.category === 'CODE_TUTORIAL' ? '/tutorials' : '/pentesting';
    navigate(`${baseUrl}/${comment.post.slug}`);
  };

  const handleUpgradeClick = () => {
    navigate('/premium');
  };

  if (loading) {
    return <LoadingMessage>Loading dashboard...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <GoBackButton onClick={() => navigate('/')}>Go Back</GoBackButton>
      <DashboardCard>
        <Title>Welcome Back, {user?.username}!</Title>
        
        <Section>
          <SectionTitle>Account Information</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <Label>Username</Label>
              <Value>{user?.username}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Email</Label>
              <Value>{user?.email}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Account Type</Label>
              <AccountTypeValue>{user?.isPremium ? 'Premium' : 'Free'}</AccountTypeValue>
            </InfoItem>
            <InfoItem>
              <Label>Total Comments</Label>
              <Value>{comments.length}</Value>
            </InfoItem>
          </InfoGrid>
        </Section>

        {!user?.isPremium && (
          <Section>
            <PremiumCard>
              <PremiumTitle>Upgrade to Premium</PremiumTitle>
              <PremiumText>
                Unlock exclusive access to advanced tutorials, private repositories, and comprehensive guides 
                designed to elevate your development and security testing skills to the next level.
              </PremiumText>
              <PremiumFeatures>
                <PremiumFeature>
                  <FeatureTitle>Advanced Code Tutorials</FeatureTitle>
                  <FeatureDescription>
                    In-depth tutorials with complete source code, best practices, and real-world applications.
                  </FeatureDescription>
                </PremiumFeature>
                <PremiumFeature>
                  <FeatureTitle>Complete Pentesting Guides</FeatureTitle>
                  <FeatureDescription>
                    Step-by-step guides with detailed commands, techniques, and methodology explanations.
                  </FeatureDescription>
                </PremiumFeature>
                <PremiumFeature>
                  <FeatureTitle>Private GitHub Access</FeatureTitle>
                  <FeatureDescription>
                    Exclusive access to private repos with premium projects and advanced implementations.
                  </FeatureDescription>
                </PremiumFeature>
                <PremiumFeature>
                  <FeatureTitle>Early Access Content</FeatureTitle>
                  <FeatureDescription>
                    Get early access to tutorials and walkthroughs before they go public.
                  </FeatureDescription>
                </PremiumFeature>
                <PremiumFeature>
                  <FeatureTitle>Priority Support</FeatureTitle>
                  <FeatureDescription>
                    Direct support channel for premium members with faster response times.
                  </FeatureDescription>
                </PremiumFeature>
                <PremiumFeature>
                  <FeatureTitle>Advanced Tools</FeatureTitle>
                  <FeatureDescription>
                    Access to premium tools, custom scripts, and interactive code environments.
                  </FeatureDescription>
                </PremiumFeature>
              </PremiumFeatures>
              <PremiumButton onClick={handleUpgradeClick}>
                Upgrade to Premium
              </PremiumButton>
            </PremiumCard>
          </Section>
        )}

        <Section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <SectionTitle>Your Latest Comments</SectionTitle>
            {comments.length > 3 && (
              <ViewAllButton onClick={() => navigate('/dashboard/comments')}>
                View All
              </ViewAllButton>
            )}
          </div>
          {comments.length === 0 ? (
            <div style={{ color: 'rgba(0, 255, 0, 0.7)' }}>No comments yet</div>
          ) : (
            <CommentList>
              {comments.slice(0, 3).map(comment => (
                <CommentCard 
                  key={comment.id}
                  onClick={() => handleCommentClick(comment)}
                  title="Click to view post"
                >
                  <CommentContent>{comment.content}</CommentContent>
                  <CommentMeta>
                    <span>On: {comment.post.title}</span>
                    <span>{new Date(comment.createdAt).toLocaleString()}</span>
                  </CommentMeta>
                </CommentCard>
              ))}
            </CommentList>
          )}
        </Section>
      </DashboardCard>
    </Container>
  );
};

export default UserDashboard;
