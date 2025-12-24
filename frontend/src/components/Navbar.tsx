import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/category/tech', label: 'Tech' },
    { path: '/category/coding', label: 'Coding' },
    { path: '/category/robotics', label: 'Robotics' },
    { path: '/category/latest', label: 'Latest' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchQuery.trim();
    if (term) {
      navigate(`/blogs?q=${encodeURIComponent(term)}`);
    } else {
      navigate('/blogs');
    }
  };

  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon-custom">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="url(#gradient1)"/>
              <circle cx="15" cy="15" r="4" fill="white"/>
              <circle cx="25" cy="15" r="4" fill="white"/>
              <circle cx="20" cy="25" r="4" fill="white"/>
              <defs>
                <linearGradient id="gradient1" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stopColor="#6c5ce7"/>
                  <stop offset="100%" stopColor="#a29bfe"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text-custom">RuralCode</span>
        </Link>

        {/* Search Bar */}
        <form className="search-bar" onSubmit={handleSearch}>
          <button type="button" className="search-menu-btn" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 5H17.5M2.5 10H17.5M2.5 15H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="search text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-submit-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
              <path d="M14 14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </form>

        {/* Sign In Button */}
        <Link to="/admin" className="sign-in-btn">
          <span>Sign In</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
