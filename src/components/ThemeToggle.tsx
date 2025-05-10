
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("rounded-full relative overflow-hidden", className)}
      aria-label="Toggle theme"
    >
      <div className="relative w-full h-full">
        {theme === "light" ? (
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
