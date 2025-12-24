import { useState, useEffect } from 'react';
import { createBlog, createVideo, getCategories } from '../services/api';
import type { Category } from '../types';
import './Admin.css';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'qwert12345@#';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'blog' | 'video'>('blog');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isAuthed, setIsAuthed] = useState<boolean>(() => !!localStorage.getItem('rc_admin_token'));
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category_slug: 'coding',
    author: 'RuralCode Team',
    featured_image: '',
  });

  // Video form state
  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    youtube_id: '',
    category_slug: 'coding',
    thumbnail_url: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const extractYouTubeId = (url: string): string => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : url;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === ADMIN_USER && loginForm.password === ADMIN_PASS) {
      const token = btoa(`${ADMIN_USER}:${ADMIN_PASS}`);
      localStorage.setItem('rc_admin_token', token);
      setIsAuthed(true);
      setMessage({ type: 'success', text: 'Logged in as admin' });
    } else {
      setMessage({ type: 'error', text: 'Invalid credentials' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rc_admin_token');
    setIsAuthed(false);
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await createBlog(blogForm);
      setMessage({ type: 'success', text: 'Blog created successfully!' });
      setBlogForm({
        title: '',
        content: '',
        excerpt: '',
        category_slug: 'coding',
        author: 'RuralCode Team',
        featured_image: '',
      });
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to create blog',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const youtubeId = extractYouTubeId(videoForm.youtube_id);
      await createVideo({
        ...videoForm,
        youtube_id: youtubeId,
      });
      setMessage({ type: 'success', text: 'Video added successfully!' });
      setVideoForm({
        title: '',
        description: '',
        youtube_id: '',
        category_slug: 'coding',
        thumbnail_url: '',
      });
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to add video',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <h1 className="page-title">Admin Panel</h1>
        <p className="page-subtitle">Create and manage blogs and videos</p>

        {!isAuthed && (
          <form className="admin-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="admin-username">Username</label>
              <input
                type="text"
                id="admin-username"
                className="form-control"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="admin-password">Password</label>
              <input
                type="password"
                id="admin-password"
                className="form-control"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? 'Authenticating...' : 'Login'}
            </button>
            {message && (
              <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
                {message.text}
              </div>
            )}
          </form>
        )}

        {isAuthed && (
          <>
            <div className="admin-tabs">
              <button
                className={`tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
                onClick={() => setActiveTab('blog')}
              >
                Create Blog
              </button>
              <button
                className={`tab-btn ${activeTab === 'video' ? 'active' : ''}`}
                onClick={() => setActiveTab('video')}
              >
                Add Video
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>

            {message && (
              <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
                {message.text}
              </div>
            )}

            {activeTab === 'blog' ? (
              <form className="admin-form" onSubmit={handleBlogSubmit}>
                <div className="form-group">
                  <label htmlFor="blog-title">Title *</label>
                  <input
                    type="text"
                    id="blog-title"
                    className="form-control"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="blog-content">Content *</label>
                  <textarea
                    id="blog-content"
                    className="form-control"
                    rows={15}
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    required
                    placeholder="You can use HTML tags for formatting"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="blog-excerpt">Excerpt (optional)</label>
                  <textarea
                    id="blog-excerpt"
                    className="form-control"
                    rows={3}
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    placeholder="Short description of the blog"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="blog-category">Category</label>
                    <select
                      id="blog-category"
                      className="form-control"
                      value={blogForm.category_slug}
                      onChange={(e) => setBlogForm({ ...blogForm, category_slug: e.target.value })}
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="blog-author">Author</label>
                    <input
                      type="text"
                      id="blog-author"
                      className="form-control"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="blog-image">Featured Image URL (optional)</label>
                  <input
                    type="url"
                    id="blog-image"
                    className="form-control"
                    value={blogForm.featured_image}
                    onChange={(e) => setBlogForm({ ...blogForm, featured_image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Blog'}
                </button>
              </form>
            ) : (
              <form className="admin-form" onSubmit={handleVideoSubmit}>
                <div className="form-group">
                  <label htmlFor="video-title">Title *</label>
                  <input
                    type="text"
                    id="video-title"
                    className="form-control"
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="video-youtube">YouTube URL or Video ID *</label>
                  <input
                    type="text"
                    id="video-youtube"
                    className="form-control"
                    value={videoForm.youtube_id}
                    onChange={(e) => setVideoForm({ ...videoForm, youtube_id: e.target.value })}
                    required
                    placeholder="https://www.youtube.com/watch?v=VIDEO_ID or just VIDEO_ID"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="video-description">Description (optional)</label>
                  <textarea
                    id="video-description"
                    className="form-control"
                    rows={5}
                    value={videoForm.description}
                    onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                    placeholder="Description of the video"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="video-category">Category</label>
                    <select
                      id="video-category"
                      className="form-control"
                      value={videoForm.category_slug}
                      onChange={(e) => setVideoForm({ ...videoForm, category_slug: e.target.value })}
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="video-thumbnail">Custom Thumbnail URL (optional)</label>
                    <input
                      type="url"
                      id="video-thumbnail"
                      className="form-control"
                      value={videoForm.thumbnail_url}
                      onChange={(e) => setVideoForm({ ...videoForm, thumbnail_url: e.target.value })}
                      placeholder="Leave empty to use YouTube thumbnail"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Video'}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;

