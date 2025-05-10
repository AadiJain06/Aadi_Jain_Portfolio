
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  date: string;
  description: string[];
  links?: {
    github?: string;
    live?: string;
  };
  technologies?: string[];
}

const ProjectCard = ({ 
  title, 
  date, 
  description, 
  links, 
  technologies 
}: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className={cn(
        "bg-card border rounded-xl p-6 transition-all duration-300 shadow-sm dark:border-border",
        "hover:shadow-md"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
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
      
      {technologies && technologies.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-4 flex justify-between items-center">
        {description.length > 2 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Read More</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        )}
        
        {(links?.github || links?.live) && (
          <div className="flex gap-3 ml-auto">
            {links.github && (
              <a 
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View GitHub repository"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {links.live && (
              <a 
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View live project"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
