import React from 'react';
import styled from 'styled-components';
import MatrixRain from '../../components/MatrixRain';

const Container = styled.div`
  position: relative;
  padding: 10rem 2rem 2rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: rgba(0, 0, 0, 0.95);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Title = styled.h1`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
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
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureTitle = styled.h3`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  letter-spacing: 1px;
`;

const FeatureDescription = styled.p`
  color: rgba(0, 255, 0, 0.9);
  font-family: 'Roboto Mono', monospace;
  line-height: 1.6;
  font-size: 1.1rem;
  margin: 0 auto;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
`;

const FeatureCard = styled.div`
  background: rgba(0, 20, 0, 0.6);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 180px;
  position: relative;

  &:hover {
    transform: translateY(-3px);
    background: rgba(0, 30, 0, 0.8);

    ${FeatureTitle} {
      text-shadow: 0 0 15px rgba(0, 255, 0, 0.8);
    }
  }
`;

const DiscordButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: rgba(88, 101, 242, 0.15);
  border: 2px solid #5865F2;
  color: #5865F2;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 250px;
  white-space: nowrap;
  margin-top: 1rem;
  box-shadow: 0 0 20px rgba(88, 101, 242, 0.2);

  &:hover {
    box-shadow: 0 0 30px rgba(88, 101, 242, 0.5);
    transform: translateY(-3px);
    background: rgba(88, 101, 242, 0.2);
  }

  svg {
    width: 24px;
    height: 24px;
    filter: drop-shadow(0 0 3px rgba(88, 101, 242, 0.5));
  }
`;

const LearnCard = styled(FeatureCard)`
  background: rgba(88, 101, 242, 0.1);
  min-height: 220px;

  ${FeatureTitle} {
    color: #5865F2;
    text-shadow: 0 0 10px rgba(88, 101, 242, 0.5);
  }

  ${FeatureDescription} {
    color: rgba(88, 101, 242, 0.9);
    text-shadow: 0 0 5px rgba(88, 101, 242, 0.3);
    margin-bottom: 1rem;
  }

  &:hover {
    background: rgba(88, 101, 242, 0.15);

    ${FeatureTitle} {
      text-shadow: 0 0 15px rgba(88, 101, 242, 0.8);
    }

    ${DiscordButton} {
      border-color: rgba(88, 101, 242, 1);
      box-shadow: 0 0 20px rgba(88, 101, 242, 0.3);
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
      </ContentWrapper>
    </Container>
  );
};

export default Community as React.FC;
