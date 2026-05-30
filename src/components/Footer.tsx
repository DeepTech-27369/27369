import LogoLoop from './LogoLoop'
import { useMemo, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Footer.css'

interface FooterProps {
  onToggleSplash?: () => void;
}

export function Footer({ onToggleSplash }: FooterProps){
  const placeholderLogos = useMemo(() => (
    Array.from({ length: 6 }).map((_, i) => ({
      node: (
        <svg width="88" height="28" viewBox="0 0 88 28" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`Sponsor placeholder ${i+1}`}>
          <rect x="0" y="0" width="88" height="28" rx="6" fill="rgba(255,255,255,0.02)" />
          <g fill="rgba(255,255,255,0.75)" fontFamily="Inter, system-ui, Arial" fontSize="11">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">[contact us]</text>
          </g>
        </svg>
      ),
      title: `Placeholder ${i+1}`
    }))
  ), [])

  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
          },
        }
      );
    }
  }, []);

  return (
    <footer ref={footerRef} className="site-footer">
      <div className="footer-inner">
        <div className="footer-content">
          <div className="footer-sponsors">
            <LogoLoop logos={placeholderLogos} speed={36} direction="left" logoHeight={28} gap={24} pauseOnHover={true} fadeOut={false} ariaLabel="Sponsors carousel" />
          </div>

          <div className="footer-info">
            <div className="footer-banner cursor-target" onClick={onToggleSplash} role="button" aria-label="Toggle special effect">
              <img src="https://deeptech.doo.ee/deeptechlogo%20copy.png" alt="Deep Tech" className="footer-banner-img" />
            </div>

            <div className="footer-copy-links">
              <p className="footer-copy">© {new Date().getFullYear()} Deep Tech. FTC Team #27369 — Sharon, MA. Second year (rookie).</p>
              <div className="footer-links">
                <a href="/about" className="footer-link">About</a>
                <a href="/contact" className="footer-link">Contact</a>
                <a href="/outreach" className="footer-link">Outreach</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer