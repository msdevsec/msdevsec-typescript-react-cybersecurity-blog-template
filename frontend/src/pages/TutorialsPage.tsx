import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  createdAt: string;
  author: {
    username: string;
  };
}

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 6rem 2rem 2rem 2rem; /* Increased top padding */
`;

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  color: #0F0;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const PostCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const PostCard = styled.article`
  background: rgba(0, 20, 0, 0.9);
  border: 1px solid #0F0;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);
  }
`;

const PostTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  color: #40E0FF;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(64, 224, 255, 0.5);
`;

const PostExcerpt = styled.p`
  color: #0F0;
  opacity: 0.8;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-family: 'Roboto Mono', monospace;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #0F0;
  font-size: 0.875rem;
  opacity: 0.6;
  font-family: 'Orbitron', sans-serif;
`;

const Author = styled.span`
  color: #9F00FF;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(159, 0, 255, 0.5);
  margin-left: 0.5rem;
`;

const CategoryTag = styled.span`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid #0F0;
  color: #0F0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 0 5px rgba(0, 255, 0, 0.2);
  margin-right: 1rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #0F0;
  font-size: 1.2rem;
  padding: 2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #FF0000;
  font-size: 1.2rem;
  padding: 2rem;
`;

export const TutorialsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/posts?category=CODE_TUTORIAL');
        if (!response.ok) {
          throw new Error('Failed to fetch tutorials');
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tutorials');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <LoadingMessage>Loading tutorials...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>Code Tutorials</Title>
      <PostGrid>
        {posts.map((post) => (
          <PostCardLink key={post.id} to={`/tutorials/${post.slug}`}>
            <PostCard>
              <PostTitle>{post.title}</PostTitle>
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              <MetaInfo>
                <div>
                  <CategoryTag>Code Tutorial</CategoryTag>
                  <span>By <Author>{post.author.username}</Author></span>
                </div>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </MetaInfo>
            </PostCard>
          </PostCardLink>
        ))}
      </PostGrid>
    </Container>
  );
};
