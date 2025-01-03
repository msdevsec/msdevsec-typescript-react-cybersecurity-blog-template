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

const Terms: React.FC = () => {
  return (
    <Container>
      <MatrixContainer>
        <MatrixRain />
      </MatrixContainer>
      <ContentContainer>
        <GoBackButton />
        <ContentWrapper>
          <Title>Terms of Service</Title>
          <LastUpdated>
            Last updated: {new Date().toLocaleDateString()}
          </LastUpdated>

          <Section>
            <SectionTitle>User Agreement</SectionTitle>
            <Text>
              By accessing and using msdevsec, you agree to comply with and be bound by these
              terms and conditions. If you disagree with any part of these terms, you may not
              access our services.
            </Text>
          </Section>

          <Section>
            <SectionTitle>Account Terms</SectionTitle>
            <List>
              <ListItem>
                You must provide accurate and complete information when creating an account
              </ListItem>
              <ListItem>
                You are responsible for maintaining the security of your account
              </ListItem>
              <ListItem>
                You must not share your account credentials with others
              </ListItem>
              <ListItem>
                You must notify us immediately of any unauthorized access
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Content Guidelines</SectionTitle>
            <List>
              <ListItem>
                All content must be original or properly attributed
              </ListItem>
              <ListItem>
                No unauthorized sharing of premium content
              </ListItem>
              <ListItem>
                Content must follow ethical hacking guidelines
              </ListItem>
              <ListItem>
                No malicious or harmful content allowed
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Premium Subscription</SectionTitle>
            <List>
              <ListItem>
                Premium features are available only to paid subscribers
              </ListItem>
              <ListItem>
                Subscription fees are non-refundable
              </ListItem>
              <ListItem>
                Premium content may not be shared or redistributed
              </ListItem>
              <ListItem>
                We reserve the right to modify premium features
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Community Rules</SectionTitle>
            <List>
              <ListItem>
                Treat all community members with respect
              </ListItem>
              <ListItem>
                No harassment, hate speech, or discriminatory content
              </ListItem>
              <ListItem>
                Follow ethical hacking and security guidelines
              </ListItem>
              <ListItem>
                Report violations to moderators
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Intellectual Property</SectionTitle>
            <List>
              <ListItem>
                All content remains the property of msdevsec
              </ListItem>
              <ListItem>
                Users retain rights to their submitted content
              </ListItem>
              <ListItem>
                Premium content is licensed, not sold
              </ListItem>
              <ListItem>
                Respect copyright and attribution requirements
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Termination</SectionTitle>
            <Text>
              We reserve the right to terminate or suspend accounts that violate these terms,
              with or without notice. Upon termination, your right to access our services
              will immediately cease.
            </Text>
          </Section>

          <ContactSection>
            <SectionTitle>Questions About Terms?</SectionTitle>
            <Text>
              If you have any questions about our terms of service,
              please contact us at{' '}
              <EmailLink href="mailto:msdevsec.services@gmail.com">
              admin@msdevsec.com
              </EmailLink>
            </Text>
          </ContactSection>
        </ContentWrapper>
      </ContentContainer>
    </Container>
  );
};

export default Terms;
