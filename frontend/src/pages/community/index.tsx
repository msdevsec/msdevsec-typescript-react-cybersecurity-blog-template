import React from 'react';
import styled from 'styled-components';
import MatrixRain from '../../components/MatrixRain';

const Container = styled.div`
  position: relative;
  min-height: auto;
  padding: 6rem 1.5rem 0.5rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  animation: glow 2s ease-in-out infinite alternate;
  letter-spacing: 2px;

  @keyframes glow {
    from {
      text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    }
    to {
      text-shadow: 0 0 20px rgba(0, 255, 0, 0.8),
                   0 0 30px rgba(0, 255, 0, 0.6);
    }
  }
`;

const DiscordSection = styled.div`
  background: rgba(0, 10, 0, 0.85);
  border: 1px solid #0F0;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.15);
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #0F0, transparent);
    animation: scan 2s linear infinite;
  }

  @keyframes scan {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const Description = styled.p`
  color: rgba(0, 255, 0, 0.9);
  font-family: 'Roboto Mono', monospace;
  font-size: 1.25rem;
  line-height: 1.7;
  margin-bottom: 1rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  letter-spacing: 0.5px;
`;

const DiscordButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: rgba(88, 101, 242, 0.1);
  border: 2px solid #5865F2;
  color: #5865F2;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 220px;
  white-space: nowrap;
  margin-top: auto;

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
      rgba(88, 101, 242, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    box-shadow: 0 0 25px rgba(88, 101, 242, 0.5);
    transform: translateY(-2px);
    background: rgba(88, 101, 242, 0.15);
    
    &::before {
      left: 100%;
    }
  }

  svg {
    width: 20px;
    height: 20px;
    filter: drop-shadow(0 0 2px rgba(88, 101, 242, 0.5));
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: rgba(0, 10, 0, 0.9);
  border: 1px solid #0F0;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 160px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 255, 0, 0.3);
    border-color: rgba(0, 255, 0, 0.8);
  }
`;

const FeatureTitle = styled.h3`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.75rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
  letter-spacing: 1px;
`;

const FeatureDescription = styled.p`
  color: rgba(0, 255, 0, 0.9);
  font-family: 'Roboto Mono', monospace;
  line-height: 1.6;
  font-size: 1.1rem;
  max-width: 280px;
  margin: 0 auto;
`;

const LearnCard = styled(FeatureCard)`
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 1.25rem;

  ${FeatureDescription} {
    margin-bottom: 1rem;
  }

  &:hover {
    ${DiscordButton} {
      border-color: rgba(88, 101, 242, 0.8);
      box-shadow: 0 0 15px rgba(88, 101, 242, 0.3);
    }
  }
`;

const Community = () => {
  return (
    <Container>
      <MatrixRain />
      <ContentWrapper>
        <Title>Join Our Community</Title>
        
        <Description>
          Connect with fellow developers and cybersecurity enthusiasts. Share knowledge,
          get help, and stay updated with the latest in tech.
        </Description>

        <DiscordSection>
          <Features>
            <FeatureCard>
              <FeatureTitle>Connect</FeatureTitle>
              <FeatureDescription>
                Network with like-minded developers and security professionals
              </FeatureDescription>
            </FeatureCard>

            <LearnCard>
              <div>
                <FeatureTitle>Learn</FeatureTitle>
                <FeatureDescription>
                  Access exclusive tutorials and get help with your projects
                </FeatureDescription>
              </div>
              <DiscordButton 
                href="https://discord.gg/Tp7CYFNJuN"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join Discord Server
              </DiscordButton>
            </LearnCard>

            <FeatureCard>
              <FeatureTitle>Grow</FeatureTitle>
              <FeatureDescription>
                Share your knowledge and help others in their tech journey
              </FeatureDescription>
            </FeatureCard>
          </Features>
        </DiscordSection>
      </ContentWrapper>
    </Container>
  );
};

export default Community as React.FC;