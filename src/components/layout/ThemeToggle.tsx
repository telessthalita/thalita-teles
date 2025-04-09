
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check for user preference in localStorage, default to dark if not set
    const savedTheme = localStorage.getItem("theme") || "dark";
    setIsDarkMode(savedTheme === "dark");
    
    // Apply theme class to html element
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);

    // Update class on document element
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);

    // Save preference to localStorage
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-md"
      aria-label={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 0 : 360 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </Button>
  );
};

export default ThemeToggle;
