import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogBySlug, getBlogs } from '../services/api';
import type { Blog } from '../types';
import './BlogDetail.css';

const sampleBlogs: Blog[] = [
  {
    id: -1,
    title: 'Exploring the Future of AI in Education: Transforming Learning',
    slug: 'ai-in-education',
    content: `
      <h2>How AI is changing classrooms</h2>
      <p>AI tutors, adaptive learning paths, and smart grading are making learning more personal and fun.</p>
      <h3>Why it matters</h3>
      <ul>
        <li>Helps every student learn at their own pace</li>
        <li>Gives instant feedback on practice</li>
        <li>Frees teachers to coach and mentor</li>
      </ul>
      <p>Start with small projects: train a model to sort images or build a chatbot that answers course questions.</p>
    `,
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
    content: `
      <h2>Travel slower, see more</h2>
      <p>Mindful travel means fewer checklists and more moments: observing, listening, and connecting.</p>
      <h3>Tips</h3>
      <ol>
        <li>Walk a neighborhood without maps for 20 minutes.</li>
        <li>Journal one new smell, sound, and color each day.</li>
        <li>Talk with a local about their favorite quiet place.</li>
      </ol>
      <p>You’ll come home with stories, not just photos.</p>
    `,
    excerpt: 'Travel slowly, notice more, and build deeper connections with each journey.',
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
    content: `
      <h2>Health powered by knowledge</h2>
      <p>Tech is helping communities track nutrition, reduce waste, and plan smart meals.</p>
      <h3>Starter ideas</h3>
      <ul>
        <li>Create a weekly meal plan with local produce.</li>
        <li>Track your own meals for a week—notice patterns.</li>
        <li>Build a simple app to remind water intake.</li>
      </ul>
      <p>Small steps compound into healthier habits for everyone.</p>
    `,
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

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;

      try {
        const blogData = await getBlogBySlug(slug);
        setBlog(blogData);

        // Fetch related blogs from same category
        if (blogData.category_slug) {
          const related = await getBlogs(blogData.category_slug, false, 3);
          setRelatedBlogs(related.filter(b => b.id !== blogData.id));
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        // Fallback to sample content if API returns 404 or fails
        const fallback = sampleBlogs.find((b) => b.slug === slug);
        if (fallback) {
          setBlog(fallback);
          setRelatedBlogs(sampleBlogs.filter((b) => b.slug !== slug));
        } else {
          setError('Blog not found.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <div className="loading">Loading blog...</div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <div className="empty-state">
            <h2>{error || 'Blog not found'}</h2>
            <Link to="/blogs" className="btn btn-primary">
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <div className="container">
        <div className="blog-detail-content">
          <article className="blog-article">
            {blog.category_name && (
              <span className={`category-badge category-${blog.category_slug}`}>
                {blog.category_name}
              </span>
            )}
            
            <h1 className="blog-detail-title">{blog.title}</h1>
            
            <div className="blog-detail-meta">
              <div className="author-info">
                <div className="author-avatar">
                  {getInitials(blog.author)}
                </div>
                <div>
                  <div className="author-name">{blog.author}</div>
                  <div className="blog-date">{formatDate(blog.created_at)}</div>
                </div>
              </div>
              <div className="blog-stats">
                <span className="view-count">👁️ {blog.view_count} views</span>
              </div>
            </div>

            {blog.featured_image && (
              <div className="blog-featured-image">
                <img src={blog.featured_image} alt={blog.title} />
              </div>
            )}

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {relatedBlogs.length > 0 && (
            <aside className="related-blogs">
              <h3>Related Blogs</h3>
              <div className="related-blogs-list">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    to={`/blogs/${relatedBlog.slug}`}
                    className="related-blog-card"
                  >
                    {relatedBlog.featured_image && (
                      <img
                        src={relatedBlog.featured_image}
                        alt={relatedBlog.title}
                        className="related-blog-image"
                      />
                    )}
                    <div className="related-blog-content">
                      <h4>{relatedBlog.title}</h4>
                      <p>{relatedBlog.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

