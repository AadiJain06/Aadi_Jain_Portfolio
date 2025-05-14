import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

interface Point {
  x: number;
  y: number;
  timestamp: number;
}

export const GestureCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gestures, setGestures] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Motion values for particle effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Particle system state
  const particles = useRef<Array<{x: number; y: number; vx: number; vy: number; life: number}>>([]);
  const [gestureRecognized, setGestureRecognized] = useState<string>('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.5;

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.01;

        const alpha = Math.max(0, particle.life);
        ctx.fillStyle = `rgba(147, 51, 234, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (particle.life <= 0) {
          particles.current.splice(index, 1);
        }
      });

      // Draw gesture trail
      if (gestures.length > 1) {
        ctx.strokeStyle = 'rgba(147, 51, 234, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(gestures[0].x, gestures[0].y);
        
        gestures.forEach((point, i) => {
          if (i > 0) {
            ctx.lineTo(point.x, point.y);
          }
        });
        
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gestures]);

  const addParticle = (x: number, y: number) => {
    const particle = {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 1
    };
    particles.current.push(particle);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setGestures([{ x, y, timestamp: Date.now() }]);
    
    // Add particles at the start point
    for (let i = 0; i < 10; i++) {
      addParticle(x, y);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    setGestures(prev => [...prev, { x, y, timestamp: Date.now() }]);
    
    // Add particles while drawing
    addParticle(x, y);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    recognizeGesture();
  };

  const recognizeGesture = () => {
    if (gestures.length < 2) return;

    // Simple gesture recognition based on direction and shape
    const startPoint = gestures[0];
    const endPoint = gestures[gestures.length - 1];
    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const duration = endPoint.timestamp - startPoint.timestamp;

    if (distance < 50 && duration < 500) {
      setGestureRecognized('Tap');
    } else if (Math.abs(dx) > Math.abs(dy) * 2) {
      setGestureRecognized('Horizontal Swipe');
    } else if (Math.abs(dy) > Math.abs(dx) * 2) {
      setGestureRecognized('Vertical Swipe');
    } else {
      setGestureRecognized('Free Form');
    }

    // Clear gestures after a delay
    setTimeout(() => {
      setGestures([]);
      setGestureRecognized('');
    }, 1000);
  };

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        className="bg-black/5 rounded-xl shadow-lg backdrop-blur-sm"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      {gestureRecognized && (
        <motion.div
          className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {gestureRecognized}
        </motion.div>
      )}
    </motion.div>
  );
}; 