import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserComment {
  id: string;
  content: string;
  createdAt: string;
  post: {
    title: string;
    slug: string;
    category: string;
  };
}

const Container = styled.div`
  padding: 8rem 2rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GoBackButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: rgba(159, 0, 255, 0.1);
  border: 1px solid #9F00FF;
  border-radius: 4px;
  color: #9F00FF;
  font-family: 'Orbitron', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 120px;
  margin-bottom: 1rem;

  &:hover {
    background: rgba(159, 0, 255, 0.2);
    box-shadow: 0 0 10px rgba(159, 0, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const DashboardCard = styled.div`
  background: rgba(0, 20, 0, 0.6);
  border: 1px solid #0F0;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
`;

const Title = styled.h1`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
  background: rgba(0, 20, 0, 0.4);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 4px;
  color: #0F0;
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0F0;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
  }

  &::placeholder {
    color: rgba(0, 255, 0, 0.5);
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentCard = styled.div`
  background: rgba(0, 20, 0, 0.4);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 4px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 20, 0, 0.6);
    transform: translateX(5px);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
  }
`;

const CommentContent = styled.p`
  color: rgba(0, 255, 0, 0.8);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const CommentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(0, 255, 0, 0.6);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.8rem;
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

const NoCommentsMessage = styled.div`
  text-align: center;
  color: rgba(0, 255, 0, 0.7);
  font-size: 1.1rem;
  padding: 2rem;
`;

export const UserComments: React.FC = () => {
  const { user, token } = useAuth();
  const [comments, setComments] = useState<UserComment[]>([]);
  const [filteredComments, setFilteredComments] = useState<UserComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/comments/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch comments');
        
        const data = await response.json();
        setComments(data);
        setFilteredComments(data);
      } catch (err) {
        setError('Failed to load your comments');
      } finally {
        setLoading(false);
      }
    };

    fetchUserComments();
  }, [token]);

  useEffect(() => {
    const filtered = comments.filter(comment => 
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComments(filtered);
  }, [searchTerm, comments]);

  const handleCommentClick = (comment: UserComment) => {
    const baseUrl = comment.post.category === 'CODE_TUTORIAL' ? '/tutorials' : '/pentesting';
    navigate(`${baseUrl}/${comment.post.slug}`);
  };

  if (loading) {
    return <LoadingMessage>Loading comments...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <GoBackButton onClick={() => navigate('/dashboard')}>Go Back</GoBackButton>
      <DashboardCard>
        <Title>Your Comments</Title>
        
        <SearchBar
          type="text"
          placeholder="Search comments by content or post title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredComments.length === 0 ? (
          <NoCommentsMessage>
            {searchTerm ? 'No comments match your search' : 'No comments yet'}
          </NoCommentsMessage>
        ) : (
          <CommentList>
            {filteredComments.map(comment => (
              <CommentCard 
                key={comment.id}
                onClick={() => handleCommentClick(comment)}
                title="Click to view post"
              >
                <CommentContent>{comment.content}</CommentContent>
                <CommentMeta>
                  <span>On: {comment.post.title}</span>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </CommentMeta>
              </CommentCard>
            ))}
          </CommentList>
        )}
      </DashboardCard>
    </Container>
  );
};

export default UserComments;
