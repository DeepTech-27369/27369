import React from 'react';
import Particles from './Particles';
import './ParticlesBackground.css';

interface GradientConfig {
  colors: string[];
  direction?: 'to-top' | 'to-bottom' | 'to-left' | 'to-right' | 'to-top-left' | 'to-top-right' | 'to-bottom-left' | 'to-bottom-right' | string;
  opacity?: number;
}

interface ParticlesBackgroundProps {
  // Particles props
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  
  // Gradient props
  gradient?: GradientConfig;
  
  // Container props
  className?: string;
  children?: React.ReactNode;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  // Particles props
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors = ['#ffffff', '#ffffff'],
  moveParticlesOnHover = true,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  
  // Gradient props
  gradient = {
    colors: ['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.3)'],
    direction: 'to-bottom-right',
    opacity: 1
  },
  
  // Container props
  className = '',
  children
}) => {
  const getGradientStyle = (): React.CSSProperties => {
    if (!gradient || !gradient.colors || gradient.colors.length === 0) {
      return {};
    }

    const direction = gradient.direction || 'to-bottom-right';
    const colors = gradient.colors.join(', ');
    const opacity = gradient.opacity !== undefined ? gradient.opacity : 1;

    return {
      background: `linear-gradient(${direction}, ${colors})`,
      opacity: opacity,
    };
  };

  return (
    <div className={`particles-background ${className}`}>
      {/* Particles layer */}
      <div className="particles-layer">
        <Particles
          particleCount={particleCount}
          particleSpread={particleSpread}
          speed={speed}
          particleColors={particleColors}
          moveParticlesOnHover={moveParticlesOnHover}
          particleHoverFactor={particleHoverFactor}
          alphaParticles={alphaParticles}
          particleBaseSize={particleBaseSize}
          sizeRandomness={sizeRandomness}
          cameraDistance={cameraDistance}
          disableRotation={disableRotation}
        />
      </div>
      
      {/* Gradient overlay */}
      <div 
        className="gradient-overlay"
        style={getGradientStyle()}
      />
      
      {/* Content layer */}
      {children && (
        <div className="content-layer">
          {children}
        </div>
      )}
    </div>
  );
};

export default ParticlesBackground;
