import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { siteContent } from '../data/content';
import './ContactPage.css';
import '../styles/pages.css';

export default function ContactPage(){
  const { title, intro, cards, form } = siteContent.contact;
  const layoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (layoutRef.current) {
      const titleEl = layoutRef.current.querySelector('.page-title');
      const otherElements = Array.from(layoutRef.current.querySelectorAll('.contact-main > *:not(.page-title), .contact-form'));

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
    <section className="page-section contact-page">
      <div className="page-content contact-layout" ref={layoutRef}>
        <div className="contact-main">
          <h1 className="page-title">{title}</h1>
          <p className="section-description">{intro.description}</p>
          <div className="contact-cards">
            {cards.map((card, index) => (
              <div className="contact-card interactive-glow-card" key={index}>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="contact-form">
          <h3 className="form-title">{form.title}</h3>
          <div className="tally-embed-container">
            <iframe 
              src="https://tally.so/embed/w26r1V?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
              width="100%" 
              height="600" 
              frameBorder="0" 
              title="Contact Form" 
              className="tally-iframe" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}