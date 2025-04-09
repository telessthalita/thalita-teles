
import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/70">
            {t("footer.developedBy")} <span className="font-bold">TT</span> {t("footer.and")}{" "}
            <span className="font-bold">{t("footer.friday")}</span>, {t("footer.yourAI")} 
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/telessthalita"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/telessthalita/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:telessthalita@gmail.com"
              className="text-foreground/80 hover:text-primary transition-colors"
              aria-label="Enviar email para Thalita Teles"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-foreground/70 mb-4 italic">
            {t("footer.reachedEnd")}
          </p>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => window.location.href = "mailto:telessthalita@gmail.com"}
          >
            <Mail className="mr-2" size={16} /> {t("footer.contactMe")}
          </Button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
