import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.95);
  border-top: 1px solid #0F0;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #0F0;
  font-family: 'Roboto Mono', monospace;
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialLink = styled.a`
  color: #0F0;
  text-decoration: none;
  font-size: 0.9rem;
  opacity: 0.8;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>© 2023 MSDEVSEC. All rights reserved.</Copyright>
        <SocialLinks>
          <SocialLink href="https://github.com/msdevsec" target="_blank" rel="noopener noreferrer">
            GitHub
          </SocialLink>
          <SocialLink href="https://twitter.com/msdevsec" target="_blank" rel="noopener noreferrer">
            Twitter
          </SocialLink>
          <SocialLink href="https://linkedin.com/in/msdevsec" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </SocialLink>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
