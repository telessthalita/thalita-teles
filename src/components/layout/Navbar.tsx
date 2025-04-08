
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-md"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold gradient-text">
          TT
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("about")}
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            {t("nav.about")}
          </button>
          <button
            onClick={() => scrollToSection("skills")}
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            {t("nav.skills")}
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            {t("nav.projects")}
          </button>
          <button
            onClick={() => scrollToSection("github")}
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            {t("nav.github")}
          </button>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex md:hidden items-center gap-4">
          <LanguageSelector />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
        >
          <nav className="container mx-auto py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("about")}
              className="py-2 px-4 text-left hover:bg-primary/10 rounded-md transition-colors"
            >
              {t("nav.about")}
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="py-2 px-4 text-left hover:bg-primary/10 rounded-md transition-colors"
            >
              {t("nav.skills")}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="py-2 px-4 text-left hover:bg-primary/10 rounded-md transition-colors"
            >
              {t("nav.projects")}
            </button>
            <button
              onClick={() => scrollToSection("github")}
              className="py-2 px-4 text-left hover:bg-primary/10 rounded-md transition-colors"
            >
              {t("nav.github")}
            </button>
            <div className="flex gap-4 mt-2 px-4">
              <a
                href="https://github.com/telessthalita"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/thalita-tees"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:telessthalita@gmail.com"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
