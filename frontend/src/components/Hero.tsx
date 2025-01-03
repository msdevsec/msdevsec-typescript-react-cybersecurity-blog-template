import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MatrixRain from './MatrixRain';

const HeroContainer = styled.div`
  position: relative;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);
  margin-top: 70px;
  overflow: hidden;
  border-bottom: 2px solid #0F0;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #0F0;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
`;

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #0F0;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  letter-spacing: 2px;

  @keyframes glitch {
    0% {
      text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                   0.025em 0.04em 0 #fffc00;
    }
    15% {
      text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                   0.025em 0.04em 0 #fffc00;
    }
    16% {
      text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                   -0.05em -0.05em 0 #fffc00;
    }
    49% {
      text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                   -0.05em -0.05em 0 #fffc00;
    }
    50% {
      text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                   0 -0.04em 0 #fffc00;
    }
    99% {
      text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                   0 -0.04em 0 #fffc00;
    }
    100% {
      text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff,
                   -0.04em -0.025em 0 #fffc00;
    }
  }

  &:hover {
    animation: glitch 1s linear infinite;
  }
`;

const Subtitle = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 1.2rem;
  color: #0F0;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  padding: 0.8rem 1.5rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  svg {
    width: 20px;
    height: 20px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const YoutubeButton = styled(Button)`
  color: #bf00ff;
  border: 2px solid #bf00ff;
  
  &::before {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(191, 0, 255, 0.2),
      transparent
    );
  }

  &:hover {
    box-shadow: 0 0 20px rgba(191, 0, 255, 0.5);
    text-shadow: 0 0 5px rgba(191, 0, 255, 0.5);
  }

  svg {
    filter: drop-shadow(0 0 2px rgba(191, 0, 255, 0.5));
  }
`;

const SupportButton = styled(Button)`
  color: #FFD700;
  border: 2px solid #FFD700;
  
  &::before {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 215, 0, 0.2),
      transparent
    );
  }

  &:hover {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
  }

  svg {
    filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.5));
  }
`;

const Hero: React.FC = () => {
  return (
    <HeroContainer>
      <MatrixRain />
      <Content>
        <Title>Welcome to MSDEVSEC</Title>
        <Subtitle>
          Elevate your coding & penetration testing skills and stay up to date with latest trends
        </Subtitle>
        <ButtonContainer>
          <YoutubeButton 
            href="https://youtube.com/@msdevsec" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            YouTube
          </YoutubeButton>
          <SupportButton 
            as={Link} 
            to="/premium"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Support The Project
          </SupportButton>
        </ButtonContainer>
      </Content>
    </HeroContainer>
  );
};

export default Hero;
