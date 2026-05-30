import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Particles from './components/Particles'
import Footer from './components/Footer'
import Loader from './components/Loader'
import SplashCursor from './components/SplashCursor'
import TargetCursor from './components/TargetCursor'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import OutreachPage from './pages/OutreachPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

import './App.css'

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [pageLoaded, setPageLoaded] = useState(false)
  const [isSplashCursorActive, setIsSplashCursorActive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleSplashCursor = () => {
    setIsSplashCursorActive(prevState => !prevState);
  };

  useEffect(() => {
    const onLoad = () => setPageLoaded(true)
    if (document.readyState === 'complete') setPageLoaded(true)
    else window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest('.interactive-glow-card');

      if (card instanceof HTMLElement) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--pointer-x', `${x}px`);
        card.style.setProperty('--pointer-y', `${y}px`);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const handleNavigate = (navigateAction: () => void) => {
    if (isTransitioning) return; // Prevent double-clicks

    setIsTransitioning(true);

    setTimeout(() => {
      navigateAction();
      window.scrollTo(0, 0);
    }, 600); // Wait for the overlay to cover the screen

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200); // Reset after the full animation
  };

  return (
    <Router>
      <Loader active={!pageLoaded} />
      <PageTransition isActive={isTransitioning} />
      <div className="app-wrapper">
        {/* Static Backgrounds */}
        <div className="background-particles">
          <Particles
            particleCount={100}
            speed={0.05}
            particleBaseSize={300}
            particleColors={['#ffffff', '#a7c7e7', '#7393B3']}
            moveParticlesOnHover={true}
            particleHoverFactor={0.5}
            alphaParticles={true}
          />
        </div>
        <div className="background-gradient" />

        {/* Interactive Background */}
        <SplashCursor active={isSplashCursorActive} />

        {/* UI Layer */}
        <div className="app-container">
          <TargetCursor />
          <Navbar onNavigate={handleNavigate} />

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/outreach" element={<OutreachPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer onToggleSplash={toggleSplashCursor} />
        </div>
      </div>
    </Router>
  )
}

export default App