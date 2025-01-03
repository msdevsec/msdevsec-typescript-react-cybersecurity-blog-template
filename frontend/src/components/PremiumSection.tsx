import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.section`
  padding: 4rem 2rem;
  background: rgba(0, 0, 0, 0.98);
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
  font-size: 3rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5),
               0 0 40px rgba(255, 215, 0, 0.3);
  letter-spacing: 2px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #FFD700, transparent);
  }
`;

const Description = styled.p`
  font-family: 'Roboto Mono', monospace;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 800px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  margin: 2rem 0;
  perspective: 1000px;

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
  filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.5));
  transition: all 0.3s ease;
`;

const FeatureTitle = styled.h3`
  color: #FFD700;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
  transition: all 0.3s ease;
  letter-spacing: 1px;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
`;

const FeatureContent = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
`;

const FeatureCard = styled(Link)`
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: flex-start;
  text-align: left;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(255, 215, 0, 0.1),
      rgba(255, 255, 255, 0.1)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(
      45deg,
      #FFD700,
      rgba(255, 255, 255, 0.5)
    );
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
    clip-path: inherit;
  }

  &:hover {
    transform: translateY(-5px) translateZ(10px);
    border-color: transparent;

    &::before {
      opacity: 1;
    }

    &::after {
      opacity: 0.2;
    }

    ${FeatureTitle} {
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
    }

    ${CheckIcon} {
      filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.7));
      transform: scale(1.1);
    }

    ${FeatureDescription} {
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
    }
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: transparent;
  color: #FFD700;
  border: 2px solid #FFD700;
  padding: 1.2rem 2.5rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;
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
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #FFD700, rgba(255, 255, 255, 0.5));
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
    clip-path: inherit;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 215, 0, 0.4),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    color: #000;
    text-shadow: none;
    
    &::before {
      opacity: 1;
    }

    &::after {
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
