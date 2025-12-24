import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCategories } from '../services/api';
import type { Category } from '../types';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesOpen, setCategoriesOpen] = useState(true);

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

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/blogs', label: 'My Blogs', icon: '📄' },
    { path: '/videos', label: 'Videos', icon: '💬' },
    { path: '/admin', label: 'Admin', icon: '@' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const getCategoryColor = (slug: string) => {
    const colors: { [key: string]: string } = {
      tech: '#6c5ce7',
      coding: '#00b894',
      robotics: '#fd79a8',
      latest: '#fdcb6e',
    };
    return colors[slug] || '#636e72';
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="popular-categories">
        <button
          className="categories-header"
          onClick={() => setCategoriesOpen(!categoriesOpen)}
        >
          <span className="categories-icon">⭐</span>
          <span className="categories-title">Popular Categories</span>
          <svg
            className={`categories-chevron ${categoriesOpen ? 'open' : ''}`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {categoriesOpen && (
          <ul className="categories-list">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/category/${category.slug}`}
                  className="category-item"
                  style={{ '--category-color': getCategoryColor(category.slug) } as React.CSSProperties}
                >
                  <span className="category-bullet"></span>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

