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
  margin-left: 2rem;
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

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const UpgradeButton = styled(ActionButton)`
  color: #9F00FF;

  &:hover {
    text-shadow: 0 0 5px rgba(159, 0, 255, 0.5);
  }
`;

const DowngradeButton = styled(ActionButton)`
  color: #FFA500;

  &:hover {
    text-shadow: 0 0 5px rgba(255, 165, 0, 0.5);
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
`;

const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  accent-color: #9F00FF;
`;

const SelectAllButton = styled.button`
  background: transparent;
  border: none;
  color: #0F0;
  cursor: pointer;
  padding: 0.5rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
  }
`;

const BulkActionButton = styled.button`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid #FF0000;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #FF0000;
  font-family: 'Orbitron', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 0, 0, 0.2);
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
  }
`;

const BulkUpgradeButton = styled(BulkActionButton)`
  background: rgba(159, 0, 255, 0.1);
  border-color: #9F00FF;
  color: #9F00FF;

  &:hover {
    background: rgba(159, 0, 255, 0.2);
    box-shadow: 0 0 10px rgba(159, 0, 255, 0.3);
  }
`;

const BulkDowngradeButton = styled(BulkActionButton)`
  background: rgba(255, 165, 0, 0.1);
  border-color: #FFA500;
  color: #FFA500;

  &:hover {
    background: rgba(255, 165, 0, 0.2);
    box-shadow: 0 0 10px rgba(255, 165, 0, 0.3);
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

const SuccessMessage = styled.div`
  color: #0F0;
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid #0F0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  font-family: 'Roboto Mono', monospace;
  animation: fadeOut 3s forwards;
  
  @keyframes fadeOut {
    0% { opacity: 1; }
    70% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

export const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [processingUsers, setProcessingUsers] = useState<Set<string>>(new Set());
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

  const handleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map(user => user.id)));
    }
  };

  const handleSelectUser = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleUpgradeUser = async (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (processingUsers.has(userId)) return;
    
    // First update the UI optimistically
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) return;

    setProcessingUsers(prev => new Set([...prev, userId]));
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, isPremium: true } : user
      )
    );
    
    try {
      const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          isPremium: true
        })
      });

      if (!response.ok) {
        throw new Error('Failed to upgrade user');
      }

      const updatedUser = await response.json();
      setSuccessMessage('User upgraded successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      // Revert the optimistic update on error
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, isPremium: false } : user
        )
      );
      console.error('Error upgrading user:', error);
      alert('Failed to upgrade user');
    } finally {
      setProcessingUsers(prev => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    }
  };

  const handleDowngradeUser = async (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (processingUsers.has(userId)) return;
    
    // First update the UI optimistically
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) return;

    setProcessingUsers(prev => new Set([...prev, userId]));
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, isPremium: false } : user
      )
    );
    
    try {
      const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          isPremium: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to downgrade user');
      }

      const updatedUser = await response.json();
      setSuccessMessage('User downgraded successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      // Revert the optimistic update on error
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, isPremium: true } : user
        )
      );
      console.error('Error downgrading user:', error);
      alert('Failed to downgrade user');
    } finally {
      setProcessingUsers(prev => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    }
  };

  const handleUpgradeSelected = async () => {
    if (!window.confirm(`Are you sure you want to upgrade ${selectedUsers.size} selected users to premium?`)) {
      return;
    }

    try {
      const responses = await Promise.all(
        Array.from(selectedUsers).map(userId =>
          fetch(`http://localhost:4000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              isPremium: true
            })
          }).then(res => res.json())
        )
      );

      setUsers(prevUsers => {
        const updatedUsers = [...prevUsers];
        responses.forEach(updatedUser => {
          const index = updatedUsers.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            updatedUsers[index] = updatedUser;
          }
        });
        return updatedUsers;
      });

      const count = selectedUsers.size;
      setSelectedUsers(new Set());
      setSuccessMessage(`${count} users upgraded successfully`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error upgrading users:', error);
      alert('Failed to upgrade some users');
    }
  };

  const handleDowngradeSelected = async () => {
    if (!window.confirm(`Are you sure you want to downgrade ${selectedUsers.size} selected users from premium?`)) {
      return;
    }

    try {
      const responses = await Promise.all(
        Array.from(selectedUsers).map(userId =>
          fetch(`http://localhost:4000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              isPremium: false
            })
          }).then(res => res.json())
        )
      );

      setUsers(prevUsers => {
        const updatedUsers = [...prevUsers];
        responses.forEach(updatedUser => {
          const index = updatedUsers.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            updatedUsers[index] = updatedUser;
          }
        });
        return updatedUsers;
      });

      const count = selectedUsers.size;
      setSelectedUsers(new Set());
      setSuccessMessage(`${count} users downgraded successfully`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error downgrading users:', error);
      alert('Failed to downgrade some users');
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
      setSelectedUsers(prev => {
        const newSelected = new Set(prev);
        newSelected.delete(userId);
        return newSelected;
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedUsers.size} selected users? This action cannot be undone.`)) {
      return;
    }

    const deletePromises = Array.from(selectedUsers).map(userId =>
      fetch(`http://localhost:4000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
    );

    try {
      await Promise.all(deletePromises);
      setUsers(users.filter(user => !selectedUsers.has(user.id)));
      setSelectedUsers(new Set());
      setExpandedUser(null);
      setUserComments([]);
    } catch (error) {
      console.error('Error deleting users:', error);
      alert('Failed to delete some users');
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
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      <GoBackButton onClick={() => navigate('/dashboard')}>Go Back</GoBackButton>
      <Title>Manage Users</Title>
      <SearchBar
        type="text"
        placeholder="Search users by username or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Controls>
        <SelectAllButton onClick={handleSelectAll}>
          <Checkbox
            type="checkbox"
            checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
            readOnly
          />
          Select All
        </SelectAllButton>
        {selectedUsers.size > 0 && (
          <>
            <BulkUpgradeButton onClick={handleUpgradeSelected}>
              Upgrade Selected ({selectedUsers.size})
            </BulkUpgradeButton>
            <BulkDowngradeButton onClick={handleDowngradeSelected}>
              Downgrade Selected ({selectedUsers.size})
            </BulkDowngradeButton>
            <BulkActionButton onClick={handleDeleteSelected}>
              Delete Selected ({selectedUsers.size})
            </BulkActionButton>
          </>
        )}
      </Controls>
      <UserList>
        {filteredUsers.map((user) => (
          <UserCard key={user.id}>
            <UserHeader expanded={expandedUser === user.id}>
              <Checkbox
                type="checkbox"
                checked={selectedUsers.has(user.id)}
                onChange={(e) => handleSelectUser(user.id, e as any)}
                onClick={(e) => e.stopPropagation()}
              />
              <UserInfo onClick={() => handleUserClick(user.id)}>
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
              <ActionButtons>
                {!user.isPremium ? (
                  <UpgradeButton
                    onClick={(e) => handleUpgradeUser(user.id, e)}
                    title="Upgrade to Premium"
                    disabled={processingUsers.has(user.id)}
                    style={{ opacity: processingUsers.has(user.id) ? 0.5 : 1 }}
                  >
                    {processingUsers.has(user.id) ? (
                      "Processing..."
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                  </UpgradeButton>
                ) : (
                  <DowngradeButton
                    onClick={(e) => handleDowngradeUser(user.id, e)}
                    title="Downgrade from Premium"
                    disabled={processingUsers.has(user.id)}
                    style={{ opacity: processingUsers.has(user.id) ? 0.5 : 1 }}
                  >
                    {processingUsers.has(user.id) ? (
                      "Processing..."
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                  </DowngradeButton>
                )}
                <ActionButton
                  onClick={(e) => handleDeleteUser(user.id, e)}
                  title="Delete user"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </ActionButton>
              </ActionButtons>
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
