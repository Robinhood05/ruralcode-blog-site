import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import VideoCard from '../components/VideoCard';
import { getBlogs, getVideos } from '../services/api';
import type { Blog, Video } from '../types';
import './Home.css';

const sampleBlogs: Blog[] = [
  {
    id: -1,
    title: 'Exploring the Future of AI in Education: Transforming Learning',
    slug: 'ai-in-education',
    content: '',
    excerpt:
      'How AI is making learning more accessible and engaging through personalization and smart tutoring.',
    category_id: undefined,
    category_name: 'Technology',
    category_slug: 'tech',
    author: 'RuralCode Team',
    featured_image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    view_count: 128,
    created_at: new Date().toISOString(),
  },
  {
    id: -2,
    title: 'The Art of Mindful Travel: Finding Peace in Motion',
    slug: 'mindful-travel',
    content: '',
    excerpt:
      'Travel slowly, notice more, and build deeper connections with each journey.',
    category_id: undefined,
    category_name: 'Lifestyle',
    category_slug: 'latest',
    author: 'Mukesh Tana',
    featured_image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    view_count: 96,
    created_at: new Date().toISOString(),
  },
  {
    id: -3,
    title: 'Nutrition Revolution: Building Healthier Communities',
    slug: 'nutrition-revolution',
    content: '',
    excerpt:
      'From farm-to-table movements to smart nutrition plans, here’s how tech is improving health.',
    category_id: undefined,
    category_name: 'Health',
    category_slug: 'latest',
    author: 'Dr. Raghu Anand',
    featured_image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    view_count: 88,
    created_at: new Date().toISOString(),
  },
];

const sampleVideos: Video[] = [
  {
    id: -1,
    title: 'Beginner Python for Kids',
    description: 'A gentle intro to Python basics for young learners.',
    youtube_id: 'kqtD5dpn9C8',
    category_id: undefined,
    category_name: 'Coding',
    category_slug: 'coding',
    thumbnail_url: 'https://img.youtube.com/vi/kqtD5dpn9C8/maxresdefault.jpg',
    view_count: 210,
    created_at: new Date().toISOString(),
  },
  {
    id: -2,
    title: 'Robotics 101: Sensors and Motors',
    description: 'Understand the building blocks of small robots.',
    youtube_id: '09zfRaE5bYI',
    category_id: undefined,
    category_name: 'Robotics',
    category_slug: 'robotics',
    thumbnail_url: 'https://img.youtube.com/vi/09zfRaE5bYI/maxresdefault.jpg',
    view_count: 175,
    created_at: new Date().toISOString(),
  },
];

const Home = () => {
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
  const [popularVideos, setPopularVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogs, videos] = await Promise.all([
          getBlogs(undefined, true, 6),
          getVideos(undefined, true, 6),
        ]);
        setPopularBlogs(blogs.length ? blogs : sampleBlogs);
        setPopularVideos(videos.length ? videos : sampleVideos);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to sample data on error
        setPopularBlogs(sampleBlogs);
        setPopularVideos(sampleVideos);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVideoPlay = (video: Video) => {
    window.open(`https://www.youtube.com/watch?v=${video.youtube_id}`, '_blank');
  };

  return (
    <div className="home-page">
      {/* Latest Blogs Section */}
      <section className="latest-blogs-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon">⭐</span>
              Latest Blogs
            </h2>
          </div>
          
          {loading ? (
            <div className="loading">Loading...</div>
          ) : popularBlogs.length > 0 ? (
            <div className="blogs-grid">
              {popularBlogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No blogs available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Popular Videos Section */}
      <section className="popular-videos-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon">⭐</span>
              Popular Videos
            </h2>
            <Link to="/videos" className="view-all-link">
              View All →
            </Link>
          </div>
          
          {loading ? (
            <div className="loading">Loading...</div>
          ) : popularVideos.length > 0 ? (
            <div className="videos-grid">
              {popularVideos.map((video, index) => (
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
              <p>No videos available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
