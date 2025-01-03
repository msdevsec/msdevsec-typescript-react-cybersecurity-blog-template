import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';

interface Post {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  excerpt: string;
  slug: string;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 2rem 2rem;
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

const PageCard = styled.div`
  background: rgba(13, 13, 13, 0.8);
  border: 1px solid rgba(128, 0, 255, 0.3);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(128, 0, 255, 0.1);
`;

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  color: #9F00FF;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(159, 0, 255, 0.5);
`;

const PostsGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const PostCard = styled.div`
  background: rgba(26, 26, 26, 0.9);
  border: 1px solid rgba(159, 0, 255, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #9F00FF;
    transform: translateX(5px);
  }
`;

const PostInfo = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const PostTitle = styled.h3`
  color: #9F00FF;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const PostMeta = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-family: 'Roboto Mono', monospace;
`;

const PostExcerpt = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-family: 'Roboto', sans-serif;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: rgba(159, 0, 255, 0.1);
  border: 1px solid #9F00FF;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #9F00FF;
  font-family: 'Orbitron', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(159, 0, 255, 0.2);
  }
`;

const PublishButton = styled(ActionButton)`
  background: rgba(0, 255, 128, 0.1);
  border-color: #00FF80;
  color: #00FF80;

  &:hover {
    background: rgba(0, 255, 128, 0.2);
  }
`;

const DeleteButton = styled(ActionButton)`
  background: rgba(255, 0, 0, 0.1);
  border-color: #FF0000;
  color: #FF0000;

  &:hover {
    background: rgba(255, 0, 0, 0.2);
  }
`;

const NoPostsMessage = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 2rem;
  font-family: 'Roboto Mono', monospace;
`;

const CategoryTag = styled.span`
  background: rgba(159, 0, 255, 0.1);
  border: 1px solid #9F00FF;
  color: #9F00FF;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-family: 'Orbitron', sans-serif;
  margin-right: 0.5rem;
`;

const SuccessMessage = styled.div`
  background: rgba(0, 255, 128, 0.1);
  border: 1px solid #00FF80;
  color: #00FF80;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: 'Orbitron', sans-serif;
  text-align: center;
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
  color: #9F00FF;
  cursor: pointer;
  padding: 0.5rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    text-shadow: 0 0 5px rgba(159, 0, 255, 0.5);
  }
`;

const DeleteSelectedButton = styled(DeleteButton)`
  margin-left: 1rem;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const DraftsPage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [drafts, setDrafts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());

  const fetchDrafts = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/posts/admin/all?isPublished=false', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch drafts');
      
      const data = await response.json();
      setDrafts(data.posts);
    } catch (error) {
      console.error('Error fetching drafts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, [token]);

  const handleSelectAll = () => {
    if (selectedPosts.size === drafts.length) {
      setSelectedPosts(new Set());
    } else {
      setSelectedPosts(new Set(drafts.map(post => post.id)));
    }
  };

  const handleSelectPost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedPosts);
    if (newSelected.has(postId)) {
      newSelected.delete(postId);
    } else {
      newSelected.add(postId);
    }
    setSelectedPosts(newSelected);
  };

  const publishPost = async (postId: string, category: string) => {
    try {
      // First, fetch the current post data to get any attached files
      const getResponse = await fetch(`http://localhost:4000/api/posts/admin/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!getResponse.ok) {
        throw new Error('Failed to fetch post data');
      }

      const postData = await getResponse.json();
      
      // Now update the post with isPublished=true while preserving files
      const response = await fetch(`http://localhost:4000/api/posts/admin/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          isPublished: true,
          updateCreatedAt: true,
          files: postData.files // Preserve any existing files
        })
      });

      if (!response.ok) {
        throw new Error('Failed to publish post');
      }
      
      const data = await response.json();
      
      setSuccessMessage('Post published successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

      const categoryPath = category === 'CODE_TUTORIAL' ? 'tutorials' : 'pentesting';
      navigate(`/${categoryPath}/${data.post.slug}`);
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };

  const deletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/posts/admin/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete post');
      
      setSuccessMessage('Post deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      fetchDrafts();
      setSelectedPosts(prev => {
        const newSelected = new Set(prev);
        newSelected.delete(postId);
        return newSelected;
      });
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedPosts.size} selected posts? This action cannot be undone.`)) {
      return;
    }

    const deletePromises = Array.from(selectedPosts).map(postId =>
      fetch(`http://localhost:4000/api/posts/admin/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    );

    try {
      await Promise.all(deletePromises);
      setSuccessMessage(`${selectedPosts.size} posts deleted successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
      setSelectedPosts(new Set());
      fetchDrafts();
    } catch (error) {
      console.error('Error deleting posts:', error);
      alert('Failed to delete some posts');
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-UK', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container>
      <GoBackButton onClick={() => navigate('/dashboard')}>Go Back</GoBackButton>
      <PageCard>
        <Title>Draft Posts</Title>

        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

        {loading ? (
          <NoPostsMessage>Loading drafts...</NoPostsMessage>
        ) : drafts.length === 0 ? (
          <NoPostsMessage>No draft posts found.</NoPostsMessage>
        ) : (
          <>
            <Controls>
              <SelectAllButton onClick={handleSelectAll}>
                <Checkbox
                  type="checkbox"
                  checked={selectedPosts.size === drafts.length && drafts.length > 0}
                  readOnly
                />
                Select All
              </SelectAllButton>
              {selectedPosts.size > 0 && (
                <DeleteSelectedButton onClick={handleDeleteSelected}>
                  Delete Selected ({selectedPosts.size})
                </DeleteSelectedButton>
              )}
            </Controls>
            <PostsGrid>
              {drafts.map(post => (
                <PostCard key={post.id}>
                  <Checkbox
                    type="checkbox"
                    checked={selectedPosts.has(post.id)}
                    onChange={(e) => handleSelectPost(post.id, e as any)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <PostInfo>
                    <PostTitle>{post.title}</PostTitle>
                    <PostMeta>
                      <CategoryTag>{post.category.replace('_', ' ')}</CategoryTag>
                      Created {formatDate(post.createdAt)}
                    </PostMeta>
                    {post.excerpt && <PostExcerpt>{post.excerpt}</PostExcerpt>}
                  </PostInfo>
                  <ButtonGroup>
                    <ActionButton onClick={() => navigate(`/dashboard/posts/${post.id}/edit`)}>
                      Edit
                    </ActionButton>
                    <PublishButton onClick={() => publishPost(post.id, post.category)}>
                      Publish
                    </PublishButton>
                    <DeleteButton onClick={() => deletePost(post.id)}>
                      Delete
                    </DeleteButton>
                  </ButtonGroup>
                </PostCard>
              ))}
            </PostsGrid>
          </>
        )}
      </PageCard>
    </Container>
  );
};

export default DraftsPage;
