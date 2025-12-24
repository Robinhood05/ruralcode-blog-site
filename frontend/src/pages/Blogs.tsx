import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { getBlogs, getCategories, deleteBlog as deleteBlogApi } from '../services/api';
import type { Blog, Category } from '../types';
import './Blogs.css';

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

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';
  const searchTerm = (searchParams.get('q') || '').toLowerCase().trim();
  const isAdmin = !!localStorage.getItem('rc_admin_token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsData, categoriesData] = await Promise.all([
          getBlogs(selectedCategory === 'all' ? undefined : selectedCategory),
          getCategories(),
        ]);
        const baseBlogs = blogsData.length ? blogsData : sampleBlogs;
        const filtered = baseBlogs.filter((b) => {
          if (!searchTerm) return true;
          const hay = `${b.title} ${b.excerpt || ''} ${b.category_name || ''}`.toLowerCase();
          return hay.includes(searchTerm);
        });
        setBlogs(filtered);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        const filtered = sampleBlogs.filter((b) => {
          if (!searchTerm) return true;
          const hay = `${b.title} ${b.excerpt || ''} ${b.category_name || ''}`.toLowerCase();
          return hay.includes(searchTerm);
        });
        setBlogs(filtered);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (categorySlug: string) => {
    setSearchParams({ category: categorySlug });
  };

  const handleDelete = async (blog: Blog) => {
    if (!isAdmin) return;
    if (!confirm(`Delete blog "${blog.title}"?`)) return;
    try {
      await deleteBlogApi(Number(blog.id));
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
    } catch (err) {
      console.error('Failed to delete blog', err);
      alert('Failed to delete blog');
    }
  };

  const getCategoryIcon = (slug: string) => {
    const icons: { [key: string]: string } = {
      tech: '📷',
      coding: '💻',
      robotics: '🤖',
      latest: '⭐',
    };
    return icons[slug] || '📄';
  };

  return (
    <div className="blogs-page">
      <div className="blogs-container">
        <div className="blogs-header">
          <h1 className="blogs-title">
            <span className="title-icon">⭐</span>
            Latest Blogs
          </h1>
        </div>
        
        {/* Category Filters */}
        <div className="category-filters">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            <span className="filter-icon">⭐</span>
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.slug ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.slug)}
            >
              <span className="filter-icon">{getCategoryIcon(category.slug)}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Blogs List */}
        {loading ? (
          <div className="loading">Loading blogs...</div>
        ) : blogs.length > 0 ? (
          <div className="blogs-list">
            {blogs.map((blog, index) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                index={index}
                onDelete={isAdmin ? handleDelete : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            {searchTerm ? (
              <p>No blogs match your search.</p>
            ) : (
              <p>No blogs found in this category. Check back soon!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
