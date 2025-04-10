
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import GitHubProjects from "@/components/sections/GitHubProjects";
import FridayAssistant from "@/components/ui/FridayAssistant";

const Index = () => {
  // Força o tema escuro ao carregar a página
  React.useEffect(() => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow"
      >
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <GitHubProjects />
      </motion.main>
      
      <Footer />
      <FridayAssistant />
    </div>
  );
};

export default Index;
