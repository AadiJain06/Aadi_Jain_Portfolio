
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillItemProps {
  name: string;
  index: number;
}

const SkillItem = ({ name, index }: SkillItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative px-4 py-2 rounded-full font-medium text-sm md:text-base",
        "bg-secondary/80 backdrop-blur-sm text-secondary-foreground",
        "border border-transparent transition-all duration-300",
        isHovered ? "border-primary shadow-sm" : ""
      )}
    >
      {name}
      <motion.div
        initial={false}
        animate={isHovered ? { opacity: 0.15 } : { opacity: 0 }}
        className="absolute inset-0 bg-primary rounded-full"
      />
    </motion.div>
  );
};

export default SkillItem;
