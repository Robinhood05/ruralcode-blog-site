import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { getVideos, getCategories, deleteVideo as deleteVideoApi } from '../services/api';
import type { Video, Category } from '../types';
import './Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';
  const isAdmin = !!localStorage.getItem('rc_admin_token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videosData, categoriesData] = await Promise.all([
          getVideos(selectedCategory === 'all' ? undefined : selectedCategory),
          getCategories(),
        ]);
        setVideos(videosData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (categorySlug: string) => {
    setSearchParams({ category: categorySlug });
  };

  const handleVideoPlay = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const handleDelete = async (video: Video) => {
    if (!isAdmin) return;
    if (!confirm(`Delete video "${video.title}"?`)) return;
    try {
      await deleteVideoApi(Number(video.id));
      setVideos((prev) => prev.filter((v) => v.id !== video.id));
    } catch (err) {
      console.error('Failed to delete video', err);
      alert('Failed to delete video');
    }
  };

  return (
    <div className="videos-page">
      <div className="container">
        <h1 className="page-title">Educational Videos</h1>
        
        {/* Category Filters */}
        <div className="category-filters">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.slug ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        {loading ? (
          <div className="loading">Loading videos...</div>
        ) : videos.length > 0 ? (
          <div className="videos-grid">
            {videos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                onPlay={handleVideoPlay}
                onDelete={isAdmin ? handleDelete : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No videos found in this category. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={closeModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              ×
            </button>
            <div className="video-embed">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtube_id}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-modal-info">
              <h3>{selectedVideo.title}</h3>
              {selectedVideo.description && <p>{selectedVideo.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;

