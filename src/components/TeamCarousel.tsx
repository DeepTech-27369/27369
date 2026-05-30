import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ProfileCard from './ProfileCard';
import { teamMembers, type TeamMember } from '../data/teamMembers';
import { siteContent } from '../data/content';
import './TeamCarousel.css';

interface TeamCarouselProps {
  autoRotate?: boolean;
  rotationInterval?: number;
  className?: string;
}

const TeamCarousel: React.FC<TeamCarouselProps> = ({
  autoRotate = true,
  rotationInterval = 5000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { title, subtitle } = siteContent.teamCarousel;

  useEffect(() => {
    if (!autoRotate || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, rotationInterval, isHovered]);

  useEffect(() => {
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      gsap.to(slide, {
        x: `${(index - currentIndex) * 100}%`,
        duration: 0.8,
        ease: 'power3.inOut',
      });
    });
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleContactClick = (member: TeamMember) => {
    console.log(`Contact ${member.name} clicked`);
  };

  return (
    <div 
      className={`team-carousel ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-header">
        <h2 className="carousel-title">{title}</h2>
        <p className="carousel-subtitle">{subtitle}</p>
      </div>

      <div className="carousel-container">
        <button 
          className="carousel-btn carousel-btn-prev"
          onClick={goToPrevious}
          aria-label="Previous team member"
        >
          ‹
        </button>

        <div className="carousel-track">
          <div className="carousel-slides">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id} 
                className="carousel-slide"
                ref={el => { slideRefs.current[index] = el; }}
              >
                <ProfileCard
                  name={member.name}
                  title={member.title}
                  handle={member.handle}
                  status={member.status}
                  contactText="Contact"
                  avatarUrl={member.avatarUrl}
                  miniAvatarUrl={member.miniAvatarUrl}
                  showUserInfo={true}
                  enableTilt={index === currentIndex}
                  enableMobileTilt={false}
                  onContactClick={() => handleContactClick(member)}
                />
              </div>
            ))}
          </div>
        </div>

        <button 
          className="carousel-btn carousel-btn-next"
          onClick={goToNext}
          aria-label="Next team member"
        >
          ›
        </button>
      </div>

      <div className="carousel-indicators">
        {teamMembers.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to team member ${index + 1}`}
          />
        ))}
      </div>

      <div className="carousel-info">
        <div className="member-counter">
          {currentIndex + 1} / {teamMembers.length}
        </div>
        <div className="member-name">
          {teamMembers[currentIndex].name}
        </div>
      </div>
    </div>
  );
};

export default TeamCarousel;