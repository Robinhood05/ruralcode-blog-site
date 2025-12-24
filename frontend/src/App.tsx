import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FloatingShapes from './components/FloatingShapes';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Videos from './pages/Videos';
import CategoryPage from './pages/CategoryPage';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <FloatingShapes />
        <Navbar />
        <div className="app-layout">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogDetail />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
