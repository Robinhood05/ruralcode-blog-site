import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import VideoCard from '../components/VideoCard';
import { getBlogs, getVideos, getCategories } from '../services/api';
import type { Blog, Video, Category } from '../types';
import './CategoryPage.css';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'blogs' | 'videos'>('blogs');

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;

      try {
        const [blogsData, videosData, categoriesData] = await Promise.all([
          getBlogs(slug),
          getVideos(slug),
          getCategories(),
        ]);
        setBlogs(blogsData);
        setVideos(videosData);
        const foundCategory = categoriesData.find(c => c.slug === slug);
        setCategory(foundCategory || null);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleVideoPlay = (video: Video) => {
    window.open(`https://www.youtube.com/watch?v=${video.youtube_id}`, '_blank');
  };

  if (loading) {
    return (
      <div className="category-page">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="category-page">
        <div className="container">
          <div className="empty-state">
            <h2>Category not found</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <h1 className="category-title">{category.name}</h1>
          {category.description && (
            <p className="category-description">{category.description}</p>
          )}
        </div>

        <div className="category-tabs">
          <button
            className={`tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            Blogs ({blogs.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos ({videos.length})
          </button>
        </div>

        {activeTab === 'blogs' ? (
          <div className="category-content">
            {blogs.length > 0 ? (
              <div className="blogs-list">
                {blogs.map((blog, index) => (
                  <BlogCard key={blog.id} blog={blog} index={index} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No blogs available in this category yet.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="category-content">
            {videos.length > 0 ? (
              <div className="videos-grid">
                {videos.map((video, index) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    index={index}
                    onPlay={handleVideoPlay}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No videos available in this category yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

