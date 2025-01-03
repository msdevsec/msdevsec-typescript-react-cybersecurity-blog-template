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

const FeedUrl = styled.div`
  background: rgba(0, 20, 0, 0.9);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'Roboto Mono', monospace;
  color: #0F0;
  word-break: break-all;
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
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

const FeedSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
`;

const RSS: React.FC = () => {
  return (
    <Container>
      <MatrixRain />
      <ContentWrapper>
        <Title>RSS Feed</Title>
        
        <Section>
          <Description>
            Stay updated with our latest content by subscribing to our RSS feed.
            Get instant notifications for new tutorials, pentesting guides, and more.
          </Description>

          <FeedSection>
            <SectionTitle>Main Feed URL</SectionTitle>
            <FeedUrl>https://msdevsec.com/feed.xml</FeedUrl>
          </FeedSection>

          <FeedSection>
            <SectionTitle>Category Feeds</SectionTitle>
            <List>
              <ListItem>Tutorials: https://msdevsec.com/tutorials/feed.xml</ListItem>
              <ListItem>Pentesting: https://msdevsec.com/pentesting/feed.xml</ListItem>
            </List>
          </FeedSection>

          <FeedSection>
            <SectionTitle>How to Subscribe</SectionTitle>
            <List>
              <ListItem>Copy the feed URL you want to follow</ListItem>
              <ListItem>Open your preferred RSS reader</ListItem>
              <ListItem>Click "Add Feed" or "Subscribe" in your reader</ListItem>
              <ListItem>Paste the feed URL and confirm</ListItem>
            </List>
          </FeedSection>

          <Description>
            Popular RSS readers: Feedly, Inoreader, NewsBlur, or any application
            that supports RSS/Atom feeds.
          </Description>
        </Section>
      </ContentWrapper>
    </Container>
  );
};

export default RSS;
