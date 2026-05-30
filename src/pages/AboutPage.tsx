import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CircularGallery from '../components/CircularGallery';
import { siteContent } from '../data/content';
import './AboutPage.css';
import '../styles/pages.css';

export default function AboutPage(){
  const { title, intro, mission, teamShowcase } = siteContent.about;
  const pageContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageContentRef.current) {
      const titleEl = pageContentRef.current.querySelector('.page-title');
      const otherElements = Array.from(pageContentRef.current.children).filter(el => !el.classList.contains('page-title'));

      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { opacity: 0, y: 40, letterSpacing: '3px' },
          {
            opacity: 1,
            y: 0,
            letterSpacing: '0px',
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }

      gsap.fromTo(
        otherElements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
          delay: 0.4,
        }
      );
    }
  }, []);

  return (
    <section className="page-section">
      <div className="page-content" ref={pageContentRef}>
        <h1 className="page-title">{title}</h1>
        <div className="team-intro">
          <p className="team-description">{intro.description}</p>
        </div>
        <div className="mission-section">
          <h2 className="section-title">{mission.title}</h2>
          <p className="mission-text">{mission.text}</p>
        </div>
        <div className="team-showcase">
          <h2 className="showcase-title">{teamShowcase.title}</h2>
          <CircularGallery />
        </div>
      </div>
    </section>
  )
}