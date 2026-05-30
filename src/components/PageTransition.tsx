import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './PageTransition.css';

interface PageTransitionProps {
  isActive: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ isActive }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true })
      .set(overlayRef.current, { y: '100%', display: 'block' })
      .to(overlayRef.current, {
        y: '0%',
        duration: 0.6,
        ease: 'power3.inOut',
      })
      .to(overlayRef.current, {
        y: '-100%',
        duration: 0.6,
        ease: 'power3.inOut',
      })
      .set(overlayRef.current, { display: 'none' });
  }, []);

  useEffect(() => {
    if (isActive) {
      timeline.current?.play(0);
    }
  }, [isActive]);

  return <div ref={overlayRef} className="page-transition-overlay" />;
};

export default PageTransition;