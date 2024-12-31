import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
  };
}

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category: string;
  author: {
    username: string;
  };
  comments: Comment[];
}

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 6rem 2rem 2rem 2rem;
`;

const PostHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 255, 0, 0.2);
  box-shadow: 0 4px 10px -6px rgba(0, 255, 0, 0.3);
`;

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  color: #40E0FF;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(64, 224, 255, 0.5);
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #0F0;
  font-size: 0.875rem;
  opacity: 0.9;
  font-family: 'Orbitron', sans-serif;
`;

const CategoryTag = styled.span`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid #0F0;
  color: #0F0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 0 5px rgba(0, 255, 0, 0.2);
`;

const Author = styled.span`
  color: #9F00FF;
  font-weight: bold;
  font-size: 0.875rem;
  text-shadow: 0 0 5px rgba(159, 0, 255, 0.5);
  margin-left: 0.5rem;
`;

const Content = styled.div`
  color: #0F0;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 4rem;

  h2 {
    font-family: 'Orbitron', sans-serif;
    color: #0F0;
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
    text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
  }

  p {
    margin-bottom: 1.5rem;
  }

  code {
    background: rgba(0, 255, 0, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.9em;
  }

  pre {
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid #0F0;
    border-radius: 8px;
    padding: 1rem;
    margin: 1.5rem 0;
    overflow-x: auto;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.1);

    code {
      background: none;
      padding: 0;
    }
  }

  a {
    color: #0F0;
    text-decoration: none;
    border-bottom: 1px dashed #0F0;
    transition: all 0.3s ease;

    &:hover {
      border-bottom-style: solid;
      text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
    }
  }

  ul, ol {
    margin: 1.5rem 0;
    padding-left: 2rem;

    li {
      margin-bottom: 0.5rem;
    }
  }

  blockquote {
    border-left: 3px solid #0F0;
    margin: 1.5rem 0;
    padding-left: 1rem;
    font-style: italic;
    color: rgba(0, 255, 0, 0.8);
  }
`;

const CommentsSection = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
`;

const CommentsTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  color: #FFD700;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const CommentForm = styled.form`
  margin-bottom: 2rem;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  background: rgba(0, 20, 0, 0.7);
  border: 1px solid #FFD700;
  border-radius: 8px;
  padding: 1rem;
  color: #FFD700;
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  min-height: 100px;
  margin-bottom: 1rem;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    border-color: #FFD700;
  }

  &::placeholder {
    color: rgba(255, 215, 0, 0.5);
  }
`;

const CommentButton = styled.button`
  background: transparent;
  color: #FFD700;
  border: 1px solid #FFD700;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-family: 'Orbitron', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 215, 0, 0.1);
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CommentCard = styled.div`
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.1);
`;

const CommentContent = styled.p`
  color: rgba(255, 215, 0, 0.9);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 215, 0, 0.7);
  font-size: 0.875rem;
  font-family: 'Orbitron', sans-serif;
`;

const CommentAuthor = styled.span`
  color: #FFD700;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
`;

const DeleteButton = styled.button`
  background: transparent;
  color: #FF4444;
  border: 1px solid #FF4444;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: auto;

  &:hover {
    background: rgba(255, 68, 68, 0.1);
    box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 8px;
  margin-bottom: 2rem;
  color: #FFD700;

  a {
    color: #FFD700;
    text-decoration: none;
    font-weight: bold;
    margin-left: 0.5rem;

    &:hover {
      text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
    }
  }
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

export const PostPage: React.FC = () => {
  const { user, token } = useAuth();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/posts/${slug}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !token || !commentText.trim() || !post) return;

    if (commentText.length > 1000) {
      setCommentError('Comment must be less than 1000 characters');
      return;
    }

    setSubmitting(true);
    setCommentError(null);

    try {
      const response = await fetch('http://localhost:4000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId: post.id,
          content: commentText.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorMessage = data.errors.map((err: any) => err.msg).join(', ');
          throw new Error(errorMessage);
        }
        throw new Error(data.message || 'Failed to post comment');
      }

      // Add the new comment to the post's comments array
      setPost(prev => {
        if (!prev) return null;
        return {
          ...prev,
          comments: [
            ...prev.comments,
            {
              ...data.comment,
              author: {
                id: data.comment.author.id,
                username: data.comment.author.username
              }
            }
          ]
        };
      });
      setCommentText('');
      setCommentError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to post comment';
      setCommentError(message);
      console.error('Error posting comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!user || !token || !window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await fetch(`http://localhost:4000/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete comment');
      }

      setPost(prev => prev ? {
        ...prev,
        comments: prev.comments.filter(c => c.id !== commentId),
      } : null);
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  if (loading) {
    return <LoadingMessage>Loading post...</LoadingMessage>;
  }

  if (error || !post) {
    return <ErrorMessage>{error || 'Post not found'}</ErrorMessage>;
  }

  return (
    <Container>
      <PostHeader>
        <Title>{post.title}</Title>
        <MetaInfo>
          <CategoryTag>{post.category.replace('_', ' ')}</CategoryTag>
          <span>By <Author>{post.author.username}</Author></span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </MetaInfo>
      </PostHeader>
      <Content dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <CommentsSection>
        <CommentsTitle>Comments ({post.comments.length})</CommentsTitle>
        
        {user ? (
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentTextarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              disabled={submitting}
            />
            {commentError && (
              <ErrorMessage style={{ marginBottom: '1rem' }}>
                {commentError}
              </ErrorMessage>
            )}
            <CommentButton type="submit" disabled={submitting || !commentText.trim()}>
              {submitting ? 'Posting...' : 'Post Comment'}
            </CommentButton>
          </CommentForm>
        ) : (
          <LoginPrompt>
            Please <Link to="/login">sign in</Link> to leave a comment.
          </LoginPrompt>
        )}

        {post.comments.length === 0 ? (
          <CommentContent>No comments yet. Be the first to comment!</CommentContent>
        ) : (
          post.comments.map(comment => (
            <CommentCard key={comment.id}>
              <CommentContent>{comment.content}</CommentContent>
              <CommentMeta>
                <CommentAuthor>{comment.author.username}</CommentAuthor>
                <span>•</span>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                {user && (user.id === comment.author.id || user.role === 'ADMIN') && (
                  <DeleteButton onClick={() => handleDeleteComment(comment.id)}>
                    Delete
                  </DeleteButton>
                )}
              </CommentMeta>
            </CommentCard>
          ))
        )}
      </CommentsSection>
    </Container>
  );
};
