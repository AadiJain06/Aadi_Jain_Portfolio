
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeContextType = {
  theme: Theme;
  resolvedTheme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('light');

  // Handle theme changes and system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (storedTheme) {
      setTheme(storedTheme);
    }
    
    // Update the resolved theme
    updateResolvedTheme(storedTheme || 'system');
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        updateResolvedTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Update the DOM when theme changes
  useEffect(() => {
    updateResolvedTheme(theme);
  }, [theme]);
  
  const updateResolvedTheme = (currentTheme: Theme) => {
    let newResolvedTheme: 'dark' | 'light';
    
    if (currentTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      newResolvedTheme = prefersDark ? 'dark' : 'light';
    } else {
      newResolvedTheme = currentTheme as 'dark' | 'light';
    }
    
    // Update DOM
    document.documentElement.classList.toggle('dark', newResolvedTheme === 'dark');
    setResolvedTheme(newResolvedTheme);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      let newTheme: Theme;
      
      // Cycle through themes: light -> dark -> system -> light
      if (prevTheme === 'light') newTheme = 'dark';
      else if (prevTheme === 'dark') newTheme = 'system';
      else newTheme = 'light';
      
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      resolvedTheme, 
      toggleTheme, 
      setTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
