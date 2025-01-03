import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  isPremium: boolean;
  createdAt: string;
  _count: {
    comments: number;
    posts: number;
  };
}

interface Comment {
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

const Title = styled.h1`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  margin-bottom: 2rem;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  background: rgba(0, 20, 0, 0.8);
  border: 1px solid #0F0;
  border-radius: 4px;
  color: #0F0;
  font-family: 'Roboto Mono', monospace;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  }

  &::placeholder {
    color: rgba(0, 255, 0, 0.5);
  }
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserCard = styled.div`
  background: rgba(0, 20, 0, 0.6);
  border: 1px solid #0F0;
  border-radius: 4px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(0, 20, 0, 0.8);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
    transform: translateX(5px);
  }
`;

const UserHeader = styled.div<{ expanded?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.expanded ? '1rem' : '0'};
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.h3`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  margin: 0;
`;

const Email = styled.p`
  color: rgba(0, 255, 0, 0.7);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  margin: 0.25rem 0;
`;

const Stats = styled.div`
  display: flex;
  gap: 1rem;
  color: rgba(0, 255, 0, 0.6);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.8rem;
`;

const Badge = styled.span<{ type: 'admin' | 'premium' }>`
  background: ${props => props.type === 'admin' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(159, 0, 255, 0.1)'};
  border: 1px solid ${props => props.type === 'admin' ? '#FF0000' : '#9F00FF'};
  color: ${props => props.type === 'admin' ? '#FF0000' : '#9F00FF'};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  margin-left: 0.5rem;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: #FF0000;
  cursor: pointer;
  padding: 0.25rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const CommentSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 255, 0, 0.2);
`;

const CommentTitle = styled.h4`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  margin: 0 0 1rem 0;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  margin: 0 0 0.5rem 0;
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

export const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCommentClick = (comment: Comment) => {
    const baseUrl = comment.post.category === 'CODE_TUTORIAL' ? '/tutorials' : '/pentesting';
    navigate(`${baseUrl}/${comment.post.slug}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
      const response = await fetch('http://localhost:4000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleUserClick = async (userId: string) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
      setUserComments([]);
      return;
    }

    setExpandedUser(userId);
    setLoadingComments(true);

    try {
      const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const data = await response.json();
      setUserComments(data.comments);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleDeleteUser = async (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user.id !== userId));
      if (expandedUser === userId) {
        setExpandedUser(null);
        setUserComments([]);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingMessage>Loading users...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <GoBackButton onClick={() => navigate('/dashboard')}>Go Back</GoBackButton>
      <Title>Manage Users</Title>
      <SearchBar
        type="text"
        placeholder="Search users by username or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <UserList>
        {filteredUsers.map((user) => (
          <UserCard key={user.id} onClick={() => handleUserClick(user.id)}>
            <UserHeader expanded={expandedUser === user.id}>
              <UserInfo>
                <Username>
                  {user.username}
                  {user.role === 'ADMIN' && <Badge type="admin">Admin</Badge>}
                  {user.isPremium && <Badge type="premium">Premium</Badge>}
                </Username>
                <Email>{user.email}</Email>
                <Stats>
                  <span>{user._count.posts} posts</span>
                  <span>{user._count.comments} comments</span>
                  <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                </Stats>
              </UserInfo>
              <ActionButton
                onClick={(e) => handleDeleteUser(user.id, e)}
                title="Delete user"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </ActionButton>
            </UserHeader>
            {expandedUser === user.id && (
              <CommentSection>
                <CommentTitle>User Comments</CommentTitle>
                {loadingComments ? (
                  <LoadingMessage>Loading comments...</LoadingMessage>
                ) : userComments.length === 0 ? (
                  <div style={{ color: 'rgba(0, 255, 0, 0.7)' }}>No comments yet</div>
                ) : (
                  <CommentList>
                    {userComments.map((comment) => (
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
              </CommentSection>
            )}
          </UserCard>
        ))}
      </UserList>
    </Container>
  );
};

export default ManageUsers;
