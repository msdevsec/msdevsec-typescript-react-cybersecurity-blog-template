import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Author {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface Tutorial {
  id: string;
  title: string;
  excerpt: string | null;
  createdAt: string;
  slug: string;
  author: Author;
}

const Section = styled.section`
  padding: 4rem 2rem;
  background: rgba(0, 0, 0, 0.97);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #0F0, transparent);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  color: #0F0;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled(Link)`
  background: rgba(0, 20, 0, 0.9);
  border: 1px solid #0F0;
  border-radius: 8px;
  padding: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 250px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #0F0, transparent);
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);
    
    &::before {
      left: 100%;
    }
  }
`;

const CardTitle = styled.h3`
font-family: 'Orbitron', sans-serif;
color: #40E0FF;
font-size: 1.5rem;
margin-bottom: 0.5rem;
text-shadow: 0 0 10px rgba(64, 224, 255, 0.5);
`;

const CardExcerpt = styled.p`
  font-family: 'Roboto Mono', monospace;
  color: #0F0;
  opacity: 0.8;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-family: 'Roboto Mono', monospace;
  color: #0F0;
  font-size: 0.8rem;
  opacity: 0.6;
  margin-top: auto;
  padding-top: 1rem;
`;

const CategoryTag = styled.span`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid #0F0;
  color: #0F0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 0 5px rgba(0, 255, 0, 0.2);
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
`;

const Author = styled.span`
  color: #9f3af9;
  opacity: 1;
  font-weight: bold;
`;

const LatestTutorials: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/posts?category=CODE_TUTORIAL&isPublished=true&limit=3');
        const data = await response.json();
        setTutorials(data.posts);
      } catch (error) {
        console.error('Error fetching tutorials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  if (loading) {
    return <SectionTitle>Loading...</SectionTitle>;
  }

  return (
    <Section>
      <Container>
        <SectionTitle>Latest Code Tutorials</SectionTitle>
        <Grid>
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} to={`/tutorials/${tutorial.slug}`}>
              <CardContent>
                <CardTitle>{tutorial.title}</CardTitle>
                <CardExcerpt>
                  {tutorial.excerpt || 'Click to read this tutorial...'}
                </CardExcerpt>
              </CardContent>
              <CardMeta>
                <CategoryTag>CODE TUTORIAL</CategoryTag>
                <MetaInfo>
                  <Author>by {tutorial.author.username}</Author>
                  <span>{new Date(tutorial.createdAt).toLocaleDateString()}</span>
                </MetaInfo>
              </CardMeta>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default LatestTutorials;
