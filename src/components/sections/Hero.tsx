
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="gradient-text">Thalita Teles</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-foreground/80 font-light mb-8">
            {t("hero.subtitle")}
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Sou conhecida por estar sempre um passo à frente. Sim, isso às vezes vem com uma dose de ansiedade — mas aprendi a transformá-la em combustível para continuar criando com propósito.
Meu foco está em desenvolver soluções que ampliem a conexão entre pessoas e tecnologia, explorando novas formas de interação entre humanos e inteligência artificial.
Acredito que o futuro da tecnologia não está apenas em programar, mas em conectar, automatizar e potencializar o que já existe.

          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              onClick={() => scrollToSection("about")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t("hero.btn.path")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("projects")}
              className="border-primary text-foreground hover:bg-primary/10"
            >
              {t("hero.btn.projects")}
            </Button>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <div 
          className="animate-bounce cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center items-start p-1">
            <div className="w-1.5 h-3 bg-foreground/30 rounded-full"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
