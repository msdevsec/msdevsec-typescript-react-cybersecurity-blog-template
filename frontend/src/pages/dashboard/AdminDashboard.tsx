import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  isPremium: boolean;
  createdAt: string;
}

interface Post {
  id: string;
  title: string;
  published: boolean;
  createdAt: string;
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          fetch('http://localhost:4000/api/users', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          }),
          fetch('http://localhost:4000/api/posts', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          })
        ]);

        if (!usersResponse.ok || !postsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [usersData, postsData] = await Promise.all([
          usersResponse.json(),
          postsResponse.json()
        ]);

        setUsers(usersData);
        setPosts(postsData);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-cyber-dark/50 border border-matrix/20 rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-matrix mb-6">Admin Dashboard</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded mb-4">
            {error}
          </div>
        )}

        {/* Content Management Section */}
        <div className="mb-8">
          <h2 className="text-xl text-matrix mb-4">Content Management</h2>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => navigate('/admin/posts/new')}
              className="bg-matrix/10 hover:bg-matrix/20 text-matrix border border-matrix/20 px-4 py-2 rounded transition-all"
            >
              Create New Post
            </button>
            <button
              onClick={() => navigate('/admin/posts')}
              className="bg-matrix/10 hover:bg-matrix/20 text-matrix border border-matrix/20 px-4 py-2 rounded transition-all"
            >
              Manage Posts
            </button>
          </div>

          {/* Recent Posts Overview */}
          <div className="border border-matrix/20 rounded-lg p-4">
            <h3 className="text-lg text-matrix mb-3">Recent Posts</h3>
            {loading ? (
              <p className="text-matrix/60">Loading posts...</p>
            ) : posts.length === 0 ? (
              <p className="text-matrix/60">No posts yet</p>
            ) : (
              <div className="space-y-2">
                {posts.slice(0, 5).map(post => (
                  <div key={post.id} className="flex justify-between items-center border-b border-matrix/10 pb-2">
                    <span className="text-matrix/80">{post.title}</span>
                    <span className="text-matrix/40 text-sm">
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User Management Section */}
        <div>
          <h2 className="text-xl text-matrix mb-4">User Management</h2>
          <div className="border border-matrix/20 rounded-lg p-4">
            {loading ? (
              <p className="text-matrix/60">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="text-matrix/60">No users found</p>
            ) : (
              <div className="space-y-3">
                {users.slice(0, 5).map(user => (
                  <div key={user.id} className="flex justify-between items-center border-b border-matrix/10 pb-2">
                    <div>
                      <p className="text-matrix/80">{user.username}</p>
                      <p className="text-matrix/40 text-sm">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-matrix/60 text-sm">{user.role}</p>
                      <p className="text-matrix/40 text-xs">
                        {user.isPremium ? 'Premium' : 'Free'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
