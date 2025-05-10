
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  name: string;
  percentage: number;
}

const SkillBar = ({ name, percentage }: SkillBarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(0);
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

  useEffect(() => {
    if (isVisible) {
      setValue(percentage);
    }
  }, [isVisible, percentage]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div
          className={cn(
            "progress-bar-fill",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
