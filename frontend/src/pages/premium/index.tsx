import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const GoBackButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid #FFD700;
  border-radius: 4px;
  color: #FFD700;
  font-family: 'Orbitron', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 120px;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);

  &:hover {
    background: rgba(255, 215, 0, 0.2);
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }
`;

const NoticeSection = styled.div`
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid #FFD700;
  padding: 2rem;
  margin-bottom: 3rem;
  position: relative;
  clip-path: polygon(
    0 10px,
    10px 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    10px 100%,
    0 calc(100% - 10px)
  );

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(45deg, #FFD700, rgba(255, 255, 255, 0.5));
    z-index: -1;
    opacity: 0.2;
    clip-path: inherit;
  }
`;

const NoticeTitle = styled.h2`
  color: #FFD700;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const NoticeText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Roboto Mono', monospace;
  font-size: 1.1rem;
  text-align: center;
  line-height: 1.6;
  margin: 0;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);

  a {
    color: #FFD700;
    text-decoration: none;
    border-bottom: 1px solid #FFD700;
    transition: all 0.3s ease;

    &:hover {
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    }
  }
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlanCard = styled.div<{ isPremium?: boolean }>`
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid ${props => props.isPremium ? '#FFD700' : 'rgba(255, 255, 255, 0.3)'};
  padding: 2rem;
  position: relative;
  clip-path: polygon(
    0 15px,
    15px 0,
    calc(100% - 15px) 0,
    100% 15px,
    100% calc(100% - 15px),
    calc(100% - 15px) 100%,
    15px 100%,
    0 calc(100% - 15px)
  );

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: ${props => props.isPremium 
      ? 'linear-gradient(45deg, #FFD700, rgba(255, 255, 255, 0.5))'
      : 'linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))'};
    z-index: -1;
    opacity: 0.2;
    clip-path: inherit;
  }

  &:hover::before {
    opacity: 0.3;
  }
`;

const PlanTitle = styled.h3<{ isPremium?: boolean }>`
  color: ${props => props.isPremium ? '#FFD700' : 'rgba(255, 255, 255, 0.9)'};
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: ${props => props.isPremium 
    ? '0 0 10px rgba(255, 215, 0, 0.5)'
    : '0 0 10px rgba(255, 255, 255, 0.5)'};
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li<{ isPremium?: boolean }>`
  color: ${props => props.isPremium ? '#FFD700' : 'rgba(255, 255, 255, 0.8)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  margin-bottom: 1rem;
  padding-left: 2rem;
  position: relative;
  text-shadow: ${props => props.isPremium 
    ? '0 0 5px rgba(255, 215, 0, 0.3)'
    : '0 0 5px rgba(255, 255, 255, 0.3)'};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 16px;
    height: 16px;
    background-image: ${props => `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${props.isPremium ? '%23FFD700' : '%23FFFFFF'}'%3E%3Cpath d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z'/%3E%3C/svg%3E")`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: drop-shadow(0 0 2px ${props => props.isPremium ? '#FFD700' : 'rgba(255, 255, 255, 0.5)'});
    transition: all 0.3s ease;
  }

  &:hover::before {
    filter: drop-shadow(0 0 5px ${props => props.isPremium ? '#FFD700' : 'rgba(255, 255, 255, 0.7)'});
    transform: scale(1.1);
  }
`;

const PremiumPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <GoBackButton onClick={() => navigate(-1)}>Go Back</GoBackButton>
      
      <NoticeSection>
        <NoticeTitle>Commercial Version Notice</NoticeTitle>
        <NoticeText>
          Premium features of this blog are only available in the commercial version. By subscribing, you get access to both 
          premium content (tutorials, guides, etc.) and the complete commercial source code of this blog. The source code includes advanced features 
          like Stripe/PayPal integrations, donation system, password recovery, email notifications, 
          contact forms, production optimization, and more. Visit{' '}
          <a href="https://www.msdevsec.com" target="_blank" rel="noopener noreferrer">
            www.msdevsec.com
          </a>{' '}
          to subscribe to Premium Content or contact us at{' '}
          <a href="mailto:admin@msdevsec.com">admin@msdevsec.com</a>{' '}
        </NoticeText>
      </NoticeSection>

      <ComparisonGrid>
        <PlanCard>
          <PlanTitle>Free Account</PlanTitle>
          <FeatureList>
            <FeatureItem>Access to free code tutorials</FeatureItem>
            <FeatureItem>Access to free penetration testing guides</FeatureItem>
            <FeatureItem>View all free posts</FeatureItem>
            <FeatureItem>Comment on posts</FeatureItem>
            <FeatureItem>Access to user dashboard</FeatureItem>
            <FeatureItem>Access to discord community</FeatureItem>
          </FeatureList>
        </PlanCard>

        <PlanCard isPremium>
          <PlanTitle isPremium>Premium Account</PlanTitle>
          <FeatureList>
            <FeatureItem isPremium>Access to premium code tutorials</FeatureItem>
            <FeatureItem isPremium>Access to premium penetration testing guides</FeatureItem>
            <FeatureItem isPremium>Early access to new content</FeatureItem>
            <FeatureItem isPremium>Access to private GitHub repositories</FeatureItem>
            <FeatureItem isPremium>Password recovery system</FeatureItem>
            <FeatureItem isPremium>Premium integration guides</FeatureItem>
            <FeatureItem isPremium>Deployment & DevOps guides</FeatureItem>
            <FeatureItem isPremium>Complete source code & assets</FeatureItem>
            <FeatureItem isPremium>Priority support channel</FeatureItem>
          </FeatureList>
        </PlanCard>
      </ComparisonGrid>
    </Container>
  );
};

export default PremiumPage;
