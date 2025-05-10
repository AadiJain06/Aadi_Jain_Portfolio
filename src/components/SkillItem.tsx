import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SkillItemProps {
  name: string;
  index: number;
}

const SkillItem = ({ name, index }: SkillItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
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
    <div
      ref={ref}
      className={cn(
        "relative px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium text-sm md:text-base transition-all duration-500 animate-skill",
        isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {name}
      <span
        className="absolute inset-0 rounded-full bg-primary opacity-0 hover:opacity-20 transition-opacity duration-300"
      ></span>
    </div>
  );
};

export default SkillItem;