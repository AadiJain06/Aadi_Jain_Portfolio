
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticle = () => {
      if (!containerRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-primary/20 backdrop-blur-sm';
      
      // Random size between 10px and 60px
      const size = Math.random() * 50 + 10;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const left = Math.random() * containerWidth;
      const top = Math.random() * containerHeight;
      particle.style.left = `${left}px`;
      particle.style.top = `${top}px`;
      
      // Add to container
      containerRef.current.appendChild(particle);
      
      // Animation using CSS
      const duration = Math.random() * 20000 + 10000; // 10-30 seconds
      particle.animate(
        [
          { transform: 'translateY(0) rotate(0)', opacity: 0 },
          { opacity: 0.5, offset: 0.1 },
          { opacity: 0.5, offset: 0.9 },
          { transform: `translateY(-${containerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ],
        {
          duration,
          easing: 'ease-out',
          iterations: 1
        }
      );
      
      // Remove particle after animation
      setTimeout(() => {
        if (containerRef.current?.contains(particle)) {
          containerRef.current.removeChild(particle);
        }
        createParticle();
      }, duration);
    };
    
    // Create initial particles
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createParticle(), i * 300);
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden -z-10"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
