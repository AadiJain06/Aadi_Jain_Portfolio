
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { 
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { useTheme } from '@/components/ThemeProvider';

type NavigationItem = {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
};

const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const menuItems: NavigationItem[] = [
    { title: "About", href: "#about", description: "Learn about Aadi Jain" },
    { title: "Skills", href: "#skills", description: "Technical skills and certifications" },
    { title: "Projects", href: "#projects", description: "View portfolio projects" },
    { title: "Experience", href: "#experience", description: "Professional work experience" },
    { title: "Education", href: "#education", description: "Academic background" },
    { title: "Achievements", href: "#achievements", description: "Notable achievements" },
    { title: "Contact", href: "#contact", description: "Get in touch" },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-primary/90 text-primary-foreground shadow-lg hover:bg-primary transition-all duration-200"
        aria-label="Open command menu"
      >
        <Search className="h-5 w-5" />
      </button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search portfolio sections..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {menuItems.map((item) => (
              <CommandItem 
                key={item.href}
                onSelect={() => navigateTo(item.href)}
                className="cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{item.title}</span>
                  {item.description && (
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandMenu;
