import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.95),
    rgba(0, 20, 0, 0.98)
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      #FFD700,
      transparent
    );
    animation: scan 2s linear infinite;
  }

  @keyframes scan {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h2`
  font-family: 'Orbitron', sans-serif;
  color: #FFD700;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
  
  &:hover {
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
  }
`;

const Description = styled.p`
  font-family: 'Roboto Mono', monospace;
  color: #0F0;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 800px;
  opacity: 0.9;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  margin: 2rem 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CheckIcon = styled.svg`
  width: 24px;
  height: 24px;
  color: #FFD700;
  margin-right: 1rem;
  flex-shrink: 0;
  margin-top: 0.25rem;
  filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.5));
  transition: all 0.3s ease;
`;

const FeatureTitle = styled.h3`
  color: #FFD700;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
  transition: all 0.3s ease;
`;

const FeatureDescription = styled.p`
  color: #0F0;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  opacity: 0.8;
  line-height: 1.4;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureCard = styled(Link)`
  background: rgba(0, 20, 0, 0.7);
  border: 1px solid #FFD700;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
    background: rgba(0, 20, 0, 0.8);

    ${FeatureTitle} {
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    }

    ${CheckIcon} {
      filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.7));
    }
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: transparent;
  color: #FFD700;
  border: 2px solid #FFD700;
  padding: 1rem 2rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 215, 0, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
    
    &::before {
      left: 100%;
    }
  }
`;

const PremiumSection: React.FC = () => {
  const features = [
    {
      title: 'Advanced Code Tutorials Access',
      description: 'In-depth tutorials with complete source code, best practices, and real-world applications'
    },
    {
      title: 'Complete Pentesting Walkthroughs',
      description: 'Step-by-step guides with detailed commands, techniques, and methodology explanations'
    },
    {
      title: 'Private GitHub Repository Access',
      description: 'Exclusive access to private repos with premium projects and advanced implementations'
    },
    {
      title: 'Early Access Content',
      description: 'Get early access to tutorials and walkthroughs before they go public'
    },
    {
      title: 'Premium Integration Guides',
      description: 'Detailed guides for Stripe, PayPal, and donation system implementations'
    },
    {
      title: 'Deployment & DevOps Guides',
      description: 'Complete deployment instructions for various platforms and CI/CD setups'
    },
    {
      title: 'Source Code & Assets',
      description: 'Download complete source code, assets, and configurations for all premium tutorials'
    },
    {
      title: 'Priority Support Channel',
      description: 'Direct support channel for premium members with faster response times'
    },
    {
      title: 'Advanced Interactive Features',
      description: 'Access to premium tools, custom scripts, and interactive code environments for hands-on learning'
    }
  ];

  return (
    <Section>
      <Container>
        <Title>Unlock Premium Content</Title>
        <Description>
          Gain exclusive access to advanced tutorials, private repositories, and comprehensive
          guides designed to elevate your development and security testing skills to the next level.
        </Description>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index} to="/premium">
              <CheckIcon viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </CheckIcon>
              <FeatureContent>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureContent>
            </FeatureCard>
          ))}
        </FeaturesGrid>
        <CTAButton to="/premium">Upgrade to Premium</CTAButton>
      </Container>
    </Section>
  );
};

export default PremiumSection;