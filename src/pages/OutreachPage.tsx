import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { siteContent } from '../data/content';
import './OutreachPage.css';
import '../styles/pages.css';

export default function OutreachPage(){
  const { title, intro, cards } = siteContent.outreach;
  const pageContentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageContentRef.current) {
      const titleEl = pageContentRef.current.querySelector('.page-title');
      const introEl = pageContentRef.current.querySelector('.outreach-intro');

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
      if (introEl) {
        gsap.fromTo(
          introEl,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.4,
          }
        );
      }
    }

    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, []);

  return (
    <section className="page-section">
      <div className="page-content" ref={pageContentRef}>
        <h1 className="page-title">{title}</h1>
        <div className="outreach-intro">
          <p className="section-description">{intro.description}</p>
        </div>
        <div className="content-grid" ref={gridRef}>
          {cards.map((card, index) => (
            <div className="content-card interactive-glow-card" key={index}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}