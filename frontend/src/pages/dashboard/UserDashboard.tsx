import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface UserComment {
  id: string;
  content: string;
  createdAt: string;
  postTitle: string;
}

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [comments, setComments] = useState<UserComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/comments/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch comments');
        
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError('Failed to load your comments');
      } finally {
        setLoading(false);
      }
    };

    fetchUserComments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-cyber-dark/50 border border-matrix/20 rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-matrix mb-4">User Dashboard</h1>
        
        {/* User Info Section */}
        <div className="mb-6">
          <h2 className="text-xl text-matrix mb-2">Account Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-matrix/60">Username</p>
              <p className="text-matrix">{user?.username}</p>
            </div>
            <div>
              <p className="text-matrix/60">Account Type</p>
              <p className="text-matrix">{user?.isPremium ? 'Premium' : 'Free'}</p>
            </div>
          </div>
        </div>

        {/* Premium Upgrade Section */}
        {!user?.isPremium && (
          <div className="mb-6 bg-matrix/5 border border-matrix/20 rounded p-4">
            <h2 className="text-xl text-matrix mb-2">Upgrade to Premium</h2>
            <p className="text-matrix/80 mb-4">
              Get access to exclusive content and features!
            </p>
            <button className="bg-matrix/10 hover:bg-matrix/20 text-matrix border border-matrix/20 px-4 py-2 rounded transition-all">
              View Premium Benefits
            </button>
          </div>
        )}

        {/* User Comments Section */}
        <div>
          <h2 className="text-xl text-matrix mb-4">Your Comments</h2>
          {loading ? (
            <p className="text-matrix/60">Loading comments...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : comments.length === 0 ? (
            <p className="text-matrix/60">No comments yet</p>
          ) : (
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="border border-matrix/20 rounded p-4">
                  <p className="text-sm text-matrix/60 mb-1">
                    On: {comment.postTitle}
                  </p>
                  <p className="text-matrix/80">{comment.content}</p>
                  <p className="text-xs text-matrix/40 mt-2">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
