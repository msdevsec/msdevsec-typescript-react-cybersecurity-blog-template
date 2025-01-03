import React from 'react';
import styled from 'styled-components';
import MatrixRain from '../../components/MatrixRain';
import GoBackButton from '../../components/shared/GoBackButton';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 2rem 2rem;
  position: relative;
`;

const MatrixContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const Title = styled.h1`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem;
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

const LastUpdated = styled.p`
  color: rgba(0, 255, 0, 0.7);
  font-family: 'Roboto Mono', monospace;
  text-align: center;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  background: rgba(0, 10, 0, 0.85);
  border: 1px solid #0F0;
  border-radius: 12px;
  padding: 2rem;
  margin: 1rem 0;
  width: 100%;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.15);
`;

const SectionTitle = styled.h2`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 255, 0, 0.3);
`;

const Text = styled.p`
  color: rgba(0, 255, 0, 0.9);
  font-family: 'Roboto Mono', monospace;
  line-height: 1.7;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const ListItem = styled.li`
  color: rgba(0, 255, 0, 0.9);
  font-family: 'Roboto Mono', monospace;
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;

  &:before {
    content: '>';
    color: #0F0;
    margin-right: 1rem;
    font-weight: bold;
  }
`;

const ContactSection = styled(Section)`
  text-align: center;
`;

const EmailLink = styled.a`
  color: #0F0;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
`;

const Privacy: React.FC = () => {
  return (
    <Container>
      <MatrixContainer>
        <MatrixRain />
      </MatrixContainer>
      <ContentContainer>
        <GoBackButton />
        <ContentWrapper>
          <Title>Privacy Policy</Title>
          <LastUpdated>
            Last updated: {new Date().toLocaleDateString()}
          </LastUpdated>

          <Section>
            <SectionTitle>Introduction</SectionTitle>
            <Text>
              At msdevsec, we take your privacy seriously. This policy explains how we collect,
              use, and protect your personal information when you use our platform.
            </Text>
          </Section>

          <Section>
            <SectionTitle>Information We Collect</SectionTitle>
            <List>
              <ListItem>
                Account Information: Email address, username, and password hash
              </ListItem>
              <ListItem>
                Profile Information: Optional information you choose to provide
              </ListItem>
              <ListItem>
                Usage Data: Interaction with tutorials, comments, and content preferences
              </ListItem>
              <ListItem>
                Technical Information: IP address, browser type, and device information
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>How We Use Your Information</SectionTitle>
            <List>
              <ListItem>
                Provide and improve our services
              </ListItem>
              <ListItem>
                Personalize your experience
              </ListItem>
              <ListItem>
                Send important notifications and updates
              </ListItem>
              <ListItem>
                Process premium subscriptions
              </ListItem>
              <ListItem>
                Analyze platform usage and improve features
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Data Protection</SectionTitle>
            <Text>
              We implement industry-standard security measures to protect your data:
            </Text>
            <List>
              <ListItem>
                Encryption of sensitive data in transit and at rest
              </ListItem>
              <ListItem>
                Regular security audits and updates
              </ListItem>
              <ListItem>
                Secure access controls and authentication
              </ListItem>
              <ListItem>
                Regular backups and disaster recovery procedures
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Your Rights</SectionTitle>
            <Text>
              You have the following rights regarding your personal data:
            </Text>
            <List>
              <ListItem>
                Access your personal data
              </ListItem>
              <ListItem>
                Request correction of inaccurate data
              </ListItem>
              <ListItem>
                Request deletion of your data
              </ListItem>
              <ListItem>
                Object to processing of your data
              </ListItem>
              <ListItem>
                Download your data in a portable format
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Cookies and Tracking</SectionTitle>
            <Text>
              We use cookies and similar technologies to:
            </Text>
            <List>
              <ListItem>
                Maintain your session and authentication
              </ListItem>
              <ListItem>
                Remember your preferences
              </ListItem>
              <ListItem>
                Analyze platform usage patterns
              </ListItem>
              <ListItem>
                Improve platform performance
              </ListItem>
            </List>
          </Section>

          <ContactSection>
            <SectionTitle>Questions About Privacy?</SectionTitle>
            <Text>
              If you have any questions about our privacy policy or how we handle your data,
              please contact us at{' '}
              <EmailLink href="mailto:admin@msdevsec.com">
                admin@msdevsec.com
              </EmailLink>
            </Text>
          </ContactSection>
        </ContentWrapper>
      </ContentContainer>
    </Container>
  );
};

export default Privacy;
