import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

interface Post {
  id: string;
  title: string;
  createdAt: string;
  category: string;
  slug: string;
}

type SortField = 'title' | 'createdAt' | 'category';
type SortOrder = 'asc' | 'desc';

const SortButton = styled.button<{ active: boolean; order?: SortOrder }>`
  background: transparent;
  border: none;
  color: ${props => props.active ? '#0F0' : 'rgba(0, 255, 0, 0.5)'};
  cursor: pointer;
  padding: 0.25rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #0F0;
  }

  &::after {
    content: '${props => props.active ? (props.order === 'asc' ? '↑' : '↓') : ''}';
  }
`;

const SortControls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Container = styled.div`
  padding: 8rem 2rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const CreateButton = styled.button`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid #0F0;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(0, 255, 0, 0.2);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
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

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(0, 20, 0, 0.6);
  border: 1px solid #0F0;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(0, 20, 0, 0.8);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
    transform: translateX(5px);
  }
`;

const PostTitle = styled.h3`
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  margin: 0;
  cursor: pointer;
  flex: 1;

  &:hover {
    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
  }
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(0, 255, 0, 0.7);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: #0F0;
  cursor: pointer;
  padding: 0.25rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  &.unpublish {
    color: #FF0000;
    &:hover {
      text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
    }
  }
`;

const CategoryBadge = styled.span<{ category: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-family: 'Orbitron', sans-serif;
  background: ${props => props.category === 'PENTESTING' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)'};
  color: ${props => props.category === 'PENTESTING' ? '#FF0000' : '#0F0'};
  border: 1px solid ${props => props.category === 'PENTESTING' ? '#FF0000' : '#0F0'};
`;

const ManagePosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortPosts = (posts: Post[]) => {
    return [...posts].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:4000/api/posts/admin/all?isPublished=true', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  if (loading) {
    return (
      <Container>
        <Title>Loading posts...</Title>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title style={{ color: '#FF0000' }}>Error: {error}</Title>
      </Container>
    );
  }

  if (posts.length === 0) {
    return (
      <Container>
        <Title>No published posts found</Title>
        <SearchBar
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Container>
    );
  }

  const filteredPosts = sortPosts(
    posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEditPost = (postId: string) => {
    navigate(`/dashboard/posts/${postId}/edit`);
  };

  const handleUnpublishPost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to unpublish this post? It will be moved to drafts.')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/posts/admin/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          isPublished: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to unpublish post');
      }

      // Remove the post from the list
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error unpublishing post:', error);
      alert('Failed to unpublish post');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/posts/admin/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Remove the post from the list
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  return (
    <Container>
      <HeaderSection>
        <Title>Manage Published Posts</Title>
        <CreateButton onClick={() => navigate('/dashboard/posts/new')}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Create New Post
        </CreateButton>
      </HeaderSection>
      <SearchBar
        type="text"
        placeholder="Search posts by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SortControls>
        <SortButton
          active={sortField === 'title'}
          order={sortField === 'title' ? sortOrder : undefined}
          onClick={() => handleSort('title')}
        >
          Title
        </SortButton>
        <SortButton
          active={sortField === 'category'}
          order={sortField === 'category' ? sortOrder : undefined}
          onClick={() => handleSort('category')}
        >
          Category
        </SortButton>
        <SortButton
          active={sortField === 'createdAt'}
          order={sortField === 'createdAt' ? sortOrder : undefined}
          onClick={() => handleSort('createdAt')}
        >
          Date
        </SortButton>
      </SortControls>
      <PostList>
        {filteredPosts.map(post => (
          <PostItem key={post.id} onClick={() => {
              const baseUrl = post.category === 'CODE_TUTORIAL' ? '/tutorials' : '/pentesting';
              navigate(`${baseUrl}/${post.slug}`);
            }}>
            <PostTitle>
              {post.title}
            </PostTitle>
            <PostMeta>
              <CategoryBadge category={post.category}>
                {post.category.replace('_', ' ')}
              </CategoryBadge>
              <span>{formatDate(post.createdAt)}</span>
              <ActionButtons>
                <ActionButton onClick={(e) => {
                  e.stopPropagation();
                  handleEditPost(post.id);
                }} title="Edit post">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </ActionButton>
                <ActionButton 
                  className="unpublish"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnpublishPost(post.id);
                  }}
                  title="Unpublish post"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </ActionButton>
                <ActionButton 
                  className="unpublish"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePost(post.id);
                  }}
                  title="Delete post permanently"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </ActionButton>
              </ActionButtons>
            </PostMeta>
          </PostItem>
        ))}
      </PostList>
    </Container>
  );
};

export default ManagePosts;
