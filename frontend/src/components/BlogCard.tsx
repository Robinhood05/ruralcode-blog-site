import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Blog } from '../types';
import './BlogCard.css';

interface BlogCardProps {
  blog: Blog;
  index?: number;
  onDelete?: (blog: Blog) => void;
}

const BlogCard = ({ blog, index = 0, onDelete }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="blog-card"
    >
      <Link to={`/blogs/${blog.slug}`} className="blog-card-link">
        <div className="blog-card-content">
          {onDelete && (
            <button
              className="blog-delete-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(blog);
              }}
              aria-label="Delete blog"
            >
              ✕
            </button>
          )}
          <div className="blog-categories">
            {blog.category_name && (
              <span className={`category-badge category-${blog.category_slug}`}>
                {blog.category_name}
              </span>
            )}
          </div>
          
          <h3 className="blog-title">{blog.title}</h3>
          
          {blog.excerpt && (
            <p className="blog-excerpt">{blog.excerpt}</p>
          )}
          
          <div className="blog-meta">
            <div className="author-info">
              <div className="author-avatar">
                {getInitials(blog.author)}
              </div>
              <div>
                <div className="author-name">{blog.author}</div>
                <div className="blog-date">{formatDate(blog.created_at)}</div>
              </div>
            </div>
          </div>

          <Link to={`/blogs/${blog.slug}`} className="read-more-btn" onClick={(e) => e.stopPropagation()}>
            Read More
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        
        {blog.featured_image && (
          <div className="blog-image">
            <img src={blog.featured_image} alt={blog.title} />
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default BlogCard;
