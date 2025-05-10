
import { cn } from '@/lib/utils';

interface ExperienceCardProps {
  company: string;
  position: string;
  date: string;
  description: string[];
}

const ExperienceCard = ({ company, position, date, description }: ExperienceCardProps) => {
  return (
    <div className="relative pl-8 pb-12">
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 w-4 h-4 bg-primary rounded-full"></div>
      
      {/* Timeline line */}
      <div className="absolute left-[7px] top-6 bottom-0 w-[2px] bg-border"></div>
      
      {/* Content */}
      <div className={cn(
        "bg-card border rounded-xl p-6 ml-6 transition-all duration-300 hover:shadow-md",
        "transform hover:-translate-y-1"
      )}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
          <div>
            <h3 className="text-xl font-bold">{position}</h3>
            <p className="text-primary font-medium">{company}</p>
          </div>
          <span className="bg-secondary text-foreground text-sm px-3 py-1 rounded-full whitespace-nowrap">
            {date}
          </span>
        </div>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-1">
          {description.map((item, index) => (
            <li key={index} className="text-sm">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;
