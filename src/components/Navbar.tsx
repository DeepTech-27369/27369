import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import './Navbar.css';

export default function Navbar({ onNavigate } : { onNavigate?: (callback: () => void) => void }){
  const location = useLocation();
  const reactNav = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, []);

  const navigate = (path:string) => {
    // Don't trigger transition if already on the same page
    if (location.pathname === path) {
      setIsMenuOpen(false);
      return;
    }

    if (onNavigate) {
      onNavigate(() => {
        reactNav(path);
        setIsMenuOpen(false);
      });
    } else {
      reactNav(path);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav ref={navRef} className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-content">
        <a onClick={() => navigate('/')} className="logo cursor-target" role="link" aria-label="Home">
          <div className="logo-container">
            <img src="https://deeptech.doo.ee/assets/logo2.png" alt="Deep Tech Logo" className="logo-image" />
            <span className="logo-text">Deep Tech</span>
          </div>
        </a>
        <button 
          className="nav-toggle cursor-target" 
          aria-label="Toggle navigation" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="hamburger-icon"></span>
        </button>
        <div className="nav-links">
          <a onClick={() => navigate('/')} className={`nav-link cursor-target ${location.pathname === '/' ? 'active' : ''}`}>Home</a>
          <a onClick={() => navigate('/about')} className={`nav-link cursor-target ${location.pathname === '/about' ? 'active' : ''}`}>About</a>
          <a onClick={() => navigate('/outreach')} className={`nav-link cursor-target ${location.pathname === '/outreach' ? 'active' : ''}`}>Outreach</a>
          <a onClick={() => navigate('/contact')} className={`nav-link cursor-target ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</a>
        </div>
      </div>
    </nav>
  )
}