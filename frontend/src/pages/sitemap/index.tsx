import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  max-width: 800px;
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
  background: rgba(0, 10, 0, 0.85);
  border: 1px solid #0F0;
  border-radius: 12px;
  padding: 2rem;
  margin: 1rem 0;
  width: 100%;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.15);
`;

const Description = styled.p`
  color: rgba(0, 255, 0, 0.9);
  font-family: 'Roboto Mono', monospace;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  text-align: center;
`;

const SitemapSection = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 255, 0, 0.3);
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SubList = styled(List)`
  margin-left: 1.5rem;
  margin-top: 0.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.75rem;
  display: flex;
  align-items: flex-start;

  &:before {
    content: '>';
    color: #0F0;
    margin-right: 1rem;
    font-weight: bold;
  }
`;

const StyledLink = styled(Link)`
  color: rgba(0, 255, 0, 0.9);
  text-decoration: none;
  font-family: 'Roboto Mono', monospace;
  transition: all 0.3s ease;

  &:hover {
    color: #0F0;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
`;

const ExternalLink = styled.a`
  color: rgba(0, 255, 0, 0.9);
  text-decoration: none;
  font-family: 'Roboto Mono', monospace;
  transition: all 0.3s ease;

  &:hover {
    color: #0F0;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
`;

const Sitemap: React.FC = () => {
  return (
    <Container>
      <MatrixRain />
      <ContentWrapper>
        <Title>Sitemap</Title>
        
        <Section>
          <Description>
            Navigate through all sections of msdevsec. Find tutorials, guides,
            and resources organized by category.
          </Description>

          <SitemapSection>
            <SectionTitle>Main Sections</SectionTitle>
            <List>
              <ListItem>
                <StyledLink to="/">Home</StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to="/tutorials">Code Tutorials</StyledLink>
                <SubList>
                  <ListItem>
                    <StyledLink to="/tutorials/latest">Latest Tutorials</StyledLink>
                  </ListItem>
                  <ListItem>
                    <StyledLink to="/tutorials/popular">Popular Tutorials</StyledLink>
                  </ListItem>
                </SubList>
              </ListItem>
              <ListItem>
                <StyledLink to="/pentesting">Penetration Testing</StyledLink>
                <SubList>
                  <ListItem>
                    <StyledLink to="/pentesting/latest">Latest Guides</StyledLink>
                  </ListItem>
                  <ListItem>
                    <StyledLink to="/pentesting/tools">Tools & Resources</StyledLink>
                  </ListItem>
                </SubList>
              </ListItem>
              <ListItem>
                <ExternalLink href="https://github.com/msdevsec" target="_blank" rel="noopener noreferrer">
                  Portfolio
                </ExternalLink>
              </ListItem>
            </List>
          </SitemapSection>

          <SitemapSection>
            <SectionTitle>Community</SectionTitle>
            <List>
              <ListItem>
                <StyledLink to="/community">Community Hub</StyledLink>
              </ListItem>
              <ListItem>
                <ExternalLink href="https://discord.gg/Tp7CYFNJuN" target="_blank" rel="noopener noreferrer">
                  Discord Server
                </ExternalLink>
              </ListItem>
              <ListItem>
                <StyledLink to="/rss">RSS Feeds</StyledLink>
              </ListItem>
            </List>
          </SitemapSection>

          <SitemapSection>
            <SectionTitle>Premium Content</SectionTitle>
            <List>
              <ListItem>
                <StyledLink to="/premium">Premium Features</StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to="/premium/pricing">Pricing Plans</StyledLink>
              </ListItem>
            </List>
          </SitemapSection>

          <SitemapSection>
            <SectionTitle>User Dashboard</SectionTitle>
            <List>
              <ListItem>
                <StyledLink to="/dashboard">My Dashboard</StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to="/dashboard/posts">My Posts</StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to="/dashboard/comments">My Comments</StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to="/dashboard/settings">Account Settings</StyledLink>
              </ListItem>
            </List>
          </SitemapSection>

          <SitemapSection>
            <SectionTitle>Legal & Support</SectionTitle>
            <List>
              <ListItem>
                <StyledLink to="/privacy">Privacy Policy</StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to="/terms">Terms of Service</StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to="/contact">Contact Us</StyledLink>
              </ListItem>
            </List>
          </SitemapSection>
        </Section>
      </ContentWrapper>
    </Container>
  );
};

export default Sitemap;
