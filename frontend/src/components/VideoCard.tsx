import { motion } from 'framer-motion';
import type { Video } from '../types';
import './VideoCard.css';

interface VideoCardProps {
  video: Video;
  index?: number;
  onPlay?: (video: Video) => void;
  onDelete?: (video: Video) => void;
}

const VideoCard = ({ video, index = 0, onPlay, onDelete }: VideoCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleClick = () => {
    if (onPlay) {
      onPlay(video);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="video-card"
      onClick={handleClick}
    >
      <div className="video-thumbnail">
        <img
          src={video.thumbnail_url || `https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`}
          alt={video.title}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.dataset.fallback === 'hqdefault') {
              target.src = 'https://placehold.co/600x400?text=Video+Thumbnail';
            } else {
              target.dataset.fallback = 'hqdefault';
              target.src = `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`;
            }
          }}
        />
        <div className="play-overlay">
          <div className="play-button">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)" />
              <path d="M25 20L40 30L25 40V20Z" fill="var(--primary-color)" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="video-content">
        {onDelete && (
          <button
            className="video-delete-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(video);
            }}
            aria-label="Delete video"
          >
            ✕
          </button>
        )}
        {video.category_name && (
          <span className={`category-badge category-${video.category_slug}`}>
            {video.category_name}
          </span>
        )}
        
        <h4 className="video-title">{video.title}</h4>
        
        {video.description && (
          <p className="video-description">{video.description}</p>
        )}
        
        <div className="video-meta">
          <span className="video-date">{formatDate(video.created_at)}</span>
          <span className="view-count">👁️ {video.view_count}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;

