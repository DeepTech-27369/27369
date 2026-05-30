import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import TextType from '../components/TextType';
import { siteContent } from '../data/content';
import './HomePage.css';
import '../styles/pages.css';

export default function HomePage() {
  const { hero, videoPlaceholder, highlights } = siteContent.home;
  const heroContentRef = useRef<HTMLDivElement>(null);
  const highlightsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    if (heroContentRef.current) {
      const elementsToAnimate = Array.from(heroContentRef.current.children).filter(
        (child) => !child.classList.contains('hero-typing')
      );
      tl.fromTo(
        elementsToAnimate,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        },
        "+=0.5"
      );
    }

    if (highlightsGridRef.current) {
      gsap.fromTo(
        highlightsGridRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: highlightsGridRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="hero-content" ref={heroContentRef}>
          <TextType
            as="h1"
            text={hero.title}
            className="hero-typing"
            typingSpeed={40}
            deletingSpeed={25}
            pauseDuration={2500}
            cursorClassName="cursor-accent"
          />
          <p className="hero-sub">{hero.subtitle}</p>
          <div className="hero-cta">
            <Link to="/about" className="cta-button cursor-target">{hero.cta1}</Link>
            <Link to="/outreach" className="cta-button ghost cursor-target">{hero.cta2}</Link>
          </div>
          <div className="hero-video-placeholder">
            <div className="video-play-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.34264 2.89031C4.93932 2.09412 3 3.05523 3 4.66043V19.3396C3 20.9448 4.93932 21.9059 6.34264 21.1097L19.303 13.7701C20.7063 12.9739 20.7063 11.0261 19.303 10.2299L6.34264 2.89031Z" fill="currentColor"/>
              </svg>
            </div>
            <p className="video-coming-soon">{videoPlaceholder.text}</p>
          </div>
        </div>
      </section>

      <section id="highlights" className="highlights-section">
        <div className="page-content">
          <div className="highlights-grid" ref={highlightsGridRef}>
            {highlights.map((card, index) => (
              <div className="highlight-card interactive-glow-card" key={index}>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}