
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  date: string;
  description: string[];
}

const ProjectCard = ({ title, date, description }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={cn(
        "bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-md",
        "transform hover:-translate-y-1"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
          {date}
        </span>
      </div>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-1">
        {description.slice(0, isExpanded ? description.length : 2).map((item, index) => (
          <li key={index} className="text-sm">{item}</li>
        ))}
      </ul>
      {description.length > 2 && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-primary text-sm font-medium hover:underline"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default ProjectCard;
