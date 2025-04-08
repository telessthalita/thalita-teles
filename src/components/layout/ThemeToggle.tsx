
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Initialize theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("theme") || "dark";
    setIsDarkMode(savedTheme === "dark");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
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
