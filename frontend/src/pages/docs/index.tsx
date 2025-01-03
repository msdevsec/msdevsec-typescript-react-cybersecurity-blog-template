import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 10, 0, 0.85);
  border: 1px solid #0F0;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.15);
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

const Section = styled.div`
  margin: 1rem 0;
  width: 100%;
`;

const Description = styled.p`
  color: rgba(0, 255, 0, 0.9);
  font-family: 'Roboto Mono', monospace;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.75rem;
  margin: 2rem 0 1rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 255, 0, 0.3);
`;

const SubTitle = styled.h3`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.25rem;
  margin: 1.5rem 0 1rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
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

const CodeBlock = styled.pre`
  background: rgba(0, 20, 0, 0.9);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'Roboto Mono', monospace;
  color: #0F0;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const StyledLink = styled(Link)`
  color: #0F0;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
`;

const ExternalLink = styled.a`
  color: #0F0;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
`;

const Docs: React.FC = () => {
  return (
    <Container>
      <MatrixContainer>
        <MatrixRain />
      </MatrixContainer>
      <ContentContainer>
        <GoBackButton />
        <ContentWrapper>
        <Title>Documentation</Title>
        
        <Description>
          Welcome to msdevsec documentation. Find guides, API references, and resources
          to help you get the most out of our platform.
        </Description>

        <Section>
          <SectionTitle>Getting Started</SectionTitle>
          <List>
            <ListItem>
              Create an account at <StyledLink to="/register">Register</StyledLink>
            </ListItem>
            <ListItem>
              Verify your email address
            </ListItem>
            <ListItem>
              Complete your profile in the dashboard
            </ListItem>
            <ListItem>
              Start exploring tutorials and pentesting guides
            </ListItem>
          </List>

          <SubTitle>Premium Features</SubTitle>
          <Description>
            Unlock advanced features and exclusive content with a Premium Account.
            Visit <StyledLink to="/premium">Premium Content</StyledLink> for pricing details.
          </Description>

          <List>
            <ListItem>
              Access to premium code tutorials and advanced penetration testing guides
            </ListItem>
            <ListItem>
              Early access to new content before public release
            </ListItem>
            <ListItem>
              Access to private GitHub repositories with complete source code
            </ListItem>
            <ListItem>
              Advanced integration guides (Stripe, PayPal, etc.)
            </ListItem>
            <ListItem>
              Deployment & DevOps guides for production environments
            </ListItem>
            <ListItem>
              Priority support through dedicated Discord channel
            </ListItem>
            <ListItem>
              Password recovery system implementation
            </ListItem>
            <ListItem>
              Email notification system integration
            </ListItem>
            <ListItem>
              Production optimization techniques and guides
            </ListItem>
          </List>

          <SubTitle>Premium API Benefits</SubTitle>
          <List>
            <ListItem>
              Increased rate limits (1000 requests/hour vs 60 requests/hour)
            </ListItem>
            <ListItem>
              Access to premium content endpoints
            </ListItem>
            <ListItem>
              Priority API support
            </ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Contributing Content</SectionTitle>
          <Description>
            Share your knowledge with the community by contributing tutorials and guides.
          </Description>

          <SubTitle>Guidelines</SubTitle>
          <List>
            <ListItem>
              Content must be original and not published elsewhere
            </ListItem>
            <ListItem>
              Follow our markdown formatting guidelines
            </ListItem>
            <ListItem>
              Include practical examples and code snippets
            </ListItem>
            <ListItem>
              Properly cite sources and references
            </ListItem>
          </List>

          <SubTitle>Markdown Example</SubTitle>
          <CodeBlock>
{`# Tutorial Title

## Introduction
Brief overview of the topic.

### Prerequisites
- Required knowledge
- Required tools

\`\`\`python
def example_code():
    print("Hello, World!")
\`\`\`

## Step-by-Step Guide
1. First step
2. Second step
`}
          </CodeBlock>
        </Section>

        <Section>
          <SectionTitle>API Documentation</SectionTitle>
          <Description>
            Access our API to integrate msdevsec content into your applications.
          </Description>

          <SubTitle>Authentication</SubTitle>
          <CodeBlock>
{`# Request an API token
POST /api/auth/token
Content-Type: application/json

{
  "email": "your@email.com",
  "password": "your_password"
}`}
          </CodeBlock>

          <SubTitle>Authentication Endpoints</SubTitle>
          <CodeBlock>
{`# Register a new user
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password",
  "username": "username"
}

# Login and get JWT token
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}

# Response
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "username",
    "role": "user"
  }
}`}
          </CodeBlock>

          <SubTitle>Content Endpoints</SubTitle>
          <List>
            <ListItem>
              GET /api/posts - List all public posts
            </ListItem>
            <ListItem>
              GET /api/posts/:id - Get specific post
            </ListItem>
            <ListItem>
              GET /api/posts/tutorials - List all tutorials
            </ListItem>
            <ListItem>
              GET /api/posts/pentesting - List all pentesting guides
            </ListItem>
            <ListItem>
              POST /api/posts - Create new post (Admin)
            </ListItem>
            <ListItem>
              PUT /api/posts/:id - Update post (Admin)
            </ListItem>
            <ListItem>
              DELETE /api/posts/:id - Delete post (Admin)
            </ListItem>
          </List>

          <SubTitle>Comment Endpoints</SubTitle>
          <List>
            <ListItem>
              GET /api/comments/post/:postId - Get comments for post
            </ListItem>
            <ListItem>
              POST /api/comments - Create comment (Auth required)
            </ListItem>
            <ListItem>
              PUT /api/comments/:id - Update comment (Owner/Admin)
            </ListItem>
            <ListItem>
              DELETE /api/comments/:id - Delete comment (Owner/Admin)
            </ListItem>
          </List>

          <SubTitle>User Endpoints</SubTitle>
          <List>
            <ListItem>
              GET /api/users/me - Get current user profile
            </ListItem>
            <ListItem>
              PUT /api/users/me - Update user profile
            </ListItem>
            <ListItem>
              GET /api/users/:id - Get user by ID (Admin)
            </ListItem>
            <ListItem>
              GET /api/users - List all users (Admin)
            </ListItem>
          </List>

          <SubTitle>Upload Endpoints</SubTitle>
          <List>
            <ListItem>
              POST /api/upload - Upload file (Auth required)
            </ListItem>
            <ListItem>
              DELETE /api/upload/:filename - Delete file (Admin)
            </ListItem>
          </List>

          <SubTitle>Response Formats</SubTitle>
          <CodeBlock>
{`# Success Response
{
  "success": true,
  "data": {
    // Response data here
  }
}

# Error Response
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}`}
          </CodeBlock>

          <SubTitle>Rate Limits</SubTitle>
          <List>
            <ListItem>
              Free tier: 60 requests per hour
            </ListItem>
            <ListItem>
              Premium tier: 1000 requests per hour
            </ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Community Resources</SectionTitle>
          <List>
            <ListItem>
              <StyledLink to="/community">Join our Discord community</StyledLink>
            </ListItem>
            <ListItem>
              <ExternalLink href="https://github.com/msdevsec/msdevsec-blog" target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </ExternalLink>
            </ListItem>
            <ListItem>
              <StyledLink to="/rss">RSS Feeds</StyledLink>
            </ListItem>
          </List>
        </Section>
        </ContentWrapper>
      </ContentContainer>
    </Container>
  );
};

export default Docs;
