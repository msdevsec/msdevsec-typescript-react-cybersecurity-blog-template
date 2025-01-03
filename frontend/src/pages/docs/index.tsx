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
            Complete API reference with example usage. Set your tokens as environment variables:
          </Description>

          <CodeBlock>
{`# Admin token
ADMIN_TOKEN="insert your admin token here"

# User token
USER_TOKEN="insert your user token here"`}
          </CodeBlock>

          <SubTitle>Authentication</SubTitle>
          <CodeBlock>
{`# Register a new user (always registers as normal user)
curl -X POST http://localhost:4000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "user@example.com",
    "username": "testuser",
    "password": "User123456",
    "confirmPassword": "User123456"
  }'

# Login
curl -X POST http://localhost:4000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "User123456"
  }'`}
          </CodeBlock>

          <SubTitle>User Management (Admin Only)</SubTitle>
          <CodeBlock>
{`# Get all users
curl -X GET "http://localhost:4000/api/users" \\
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Get specific user
curl -X GET "http://localhost:4000/api/users/{user_id}" \\
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Update user role/premium status
curl -X PUT "http://localhost:4000/api/users/{user_id}" \\
  -H "Authorization: Bearer $ADMIN_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"role": "USER", "isPremium": true}'

# Delete user
curl -X DELETE "http://localhost:4000/api/users/{user_id}" \\
  -H "Authorization: Bearer $ADMIN_TOKEN"`}
          </CodeBlock>

          <SubTitle>Posts (Admin Only)</SubTitle>
          <CodeBlock>
{`# Get all posts (including drafts)
curl -X GET "http://localhost:4000/api/posts/admin/all" \\
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Create post
curl -X POST "http://localhost:4000/api/posts/admin" \\
  -H "Authorization: Bearer $ADMIN_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Test Post",
    "content": "Content here",
    "category": "CODE_TUTORIAL",
    "excerpt": "Optional excerpt",
    "isPublished": true
  }'

# Update post
curl -X PUT "http://localhost:4000/api/posts/admin/{post_id}" \\
  -H "Authorization: Bearer $ADMIN_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Updated Title",
    "content": "Updated content",
    "category": "PENTESTING",
    "excerpt": "Updated excerpt",
    "isPublished": false
  }'

# Delete post
curl -X DELETE "http://localhost:4000/api/posts/admin/{post_id}" \\
  -H "Authorization: Bearer $ADMIN_TOKEN"`}
          </CodeBlock>

          <SubTitle>Comments</SubTitle>
          <Description>
            Normal users can create comments on published posts and delete their own comments.
            Admins can manage all comments.
          </Description>
          <CodeBlock>
{`# Create comment (any authenticated user)
curl -X POST http://localhost:4000/api/comments \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $USER_TOKEN" \\
  -d '{
    "content": "This is a test comment",
    "postId": "post_id"
  }'

# Get all comments (admin only)
curl -X GET "http://localhost:4000/api/comments/all" \\
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Update comment (admin only)
curl -X PUT "http://localhost:4000/api/comments/{comment_id}" \\
  -H "Authorization: Bearer $ADMIN_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Updated comment content"
  }'

# Delete comment (admin or comment owner)
curl -X DELETE "http://localhost:4000/api/comments/{comment_id}" \\
  -H "Authorization: Bearer $USER_TOKEN"`}
          </CodeBlock>

          <SubTitle>File Uploads (Admin Only)</SubTitle>
          <CodeBlock>
{`# Upload file
curl -X POST http://localhost:4000/api/upload \\
  -H "Authorization: Bearer $ADMIN_TOKEN" \\
  -F "file=@path/to/file.pdf"

# Response:
{
  "url": "/uploads/timestamp-random.pdf",
  "name": "file.pdf"
}

# Create post with file (after uploading)
curl -X POST http://localhost:4000/api/posts/admin \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $ADMIN_TOKEN" \\
  -d '{
    "title": "Post with File",
    "content": "Content here",
    "category": "CODE_TUTORIAL",
    "files": [
      {
        "name": "file.pdf",
        "url": "/uploads/timestamp-random.pdf"
      }
    ]
  }'`}
          </CodeBlock>

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
