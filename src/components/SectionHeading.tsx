
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeading = ({ children, className }: SectionHeadingProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const underlineVariants = {
    hidden: { width: '0%' },
    visible: { 
      width: '100px', 
      transition: { delay: 0.4, duration: 0.6 }
    }
  };

  return (
    <motion.h2
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={headingVariants}
      className={cn(
        "text-3xl md:text-4xl font-bold font-heading mb-2 text-center",
        className
      )}
    >
      {children}
      <motion.div
        variants={underlineVariants}
        className="h-1 bg-primary mx-auto mt-2"
      />
    </motion.h2>
  );
};

export default SectionHeading;
