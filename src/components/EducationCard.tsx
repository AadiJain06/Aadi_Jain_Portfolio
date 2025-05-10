
import { cn } from '@/lib/utils';

interface EducationCardProps {
  degree: string;
  institution: string;
  date: string;
  score: string;
}

const EducationCard = ({ degree, institution, date, score }: EducationCardProps) => {
  return (
    <div className="relative pl-8 pb-12 last:pb-0">
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 w-4 h-4 bg-primary rounded-full"></div>
      
      {/* Timeline line */}
      <div className="absolute left-[7px] top-6 bottom-0 w-[2px] bg-border last:hidden"></div>
      
      {/* Content */}
      <div className={cn(
        "bg-card border rounded-xl p-6 ml-6 transition-all duration-300 hover:shadow-md",
        "transform hover:-translate-y-1"
      )}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
          <div>
            <h3 className="text-xl font-bold">{degree}</h3>
            <p className="text-primary font-medium">{institution}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="bg-secondary text-foreground text-sm px-3 py-1 rounded-full whitespace-nowrap">
              {date}
            </span>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
            Score: {score}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
