import React, { useState } from "react";
import { Github, Linkedin, Mail, Check, Bot } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("telessthalita@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <footer className="bg-card py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4 text-center">
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

              <button
                onClick={handleCopyEmail}
                className="text-foreground/80 hover:text-primary transition-colors"
                aria-label="Copiar e-mail"
              >
                {copied ? <Check size={20} /> : <Mail size={20} />}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
