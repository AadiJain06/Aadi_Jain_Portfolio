
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.offsetTop - 80; // Adjust offset to account for navbar height
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="#hero" className="font-bold text-xl font-heading text-primary">Aadi Jain</a>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary font-medium transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('skills')} className="text-foreground hover:text-primary font-medium transition-colors">
              Skills
            </button>
            <button onClick={() => scrollToSection('projects')} className="text-foreground hover:text-primary font-medium transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection('experience')} className="text-foreground hover:text-primary font-medium transition-colors">
              Experience
            </button>
            <button onClick={() => scrollToSection('education')} className="text-foreground hover:text-primary font-medium transition-colors">
              Education
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary font-medium transition-colors">
              Contact
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md shadow-lg">
          <button onClick={() => scrollToSection('about')} className="block px-3 py-2 w-full text-left rounded-md text-foreground hover:bg-secondary hover:text-primary transition-colors">
            About
          </button>
          <button onClick={() => scrollToSection('skills')} className="block px-3 py-2 w-full text-left rounded-md text-foreground hover:bg-secondary hover:text-primary transition-colors">
            Skills
          </button>
          <button onClick={() => scrollToSection('projects')} className="block px-3 py-2 w-full text-left rounded-md text-foreground hover:bg-secondary hover:text-primary transition-colors">
            Projects
          </button>
          <button onClick={() => scrollToSection('experience')} className="block px-3 py-2 w-full text-left rounded-md text-foreground hover:bg-secondary hover:text-primary transition-colors">
            Experience
          </button>
          <button onClick={() => scrollToSection('education')} className="block px-3 py-2 w-full text-left rounded-md text-foreground hover:bg-secondary hover:text-primary transition-colors">
            Education
          </button>
          <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 w-full text-left rounded-md text-foreground hover:bg-secondary hover:text-primary transition-colors">
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
