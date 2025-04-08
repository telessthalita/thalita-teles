
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const phrases = [
  "Olá! Sou a Friday, a IA pessoal da Thalita.",
  "Thalita está trabalhando com IA generativa!",
  "Quer saber mais sobre os projetos da TT?",
  "A Thalita está aprendendo engenharia de IA!",
  "Você sabia que a TT adora tecnologia desde criança?",
  "Posso te ajudar a conhecer mais sobre o trabalho da Thalita!",
];

const FridayAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        setCurrentPhrase(phrases[randomIndex]);
        setIsOpen(true);
        
        // Auto close after 5 seconds
        setTimeout(() => {
          setIsOpen(false);
        }, 5000);
      }
    }, 15000); // Show a message every 15 seconds
    
    return () => clearInterval(interval);
  }, [isOpen]);
  
  const handleChatOpen = () => {
    setShowChat(true);
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "100%" }}
            animate={{ opacity: 1, y: 0, x: "0%" }}
            exit={{ opacity: 0, y: 20, x: "100%" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="fixed bottom-24 right-6 md:right-10 bg-card p-4 rounded-lg shadow-lg max-w-xs z-40 border border-border"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </Button>
            <p className="text-sm pr-6">{currentPhrase}</p>
            <Button
              size="sm"
              className="mt-3 w-full"
              onClick={handleChatOpen}
            >
              Converse com a TT de 2030
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        className="fixed bottom-6 right-6 md:right-10 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else {
            handleChatOpen();
          }
        }}
      >
        <Bot size={24} />
      </motion.button>
      
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div className="bg-card rounded-xl shadow-lg max-w-md w-full max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-medium">TT do Futuro (2030)</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowChat(false)}
                >
                  <X size={18} />
                </Button>
              </div>
              
              <div className="p-4 overflow-y-auto flex-grow">
                <div className="flex mb-4">
                  <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">
                      Olá! Sou a Thalita de 2030, Engenheira de IA Sênior no Vale do Silício. 
                      O que gostaria de saber sobre minha trajetória?
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end mb-4">
                  <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Como você começou na IA?</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">
                      Em 2024 comecei minha transição para IA fazendo projetos com LLMs e estudando 
                      matemática aplicada. O portfólio que você está vendo agora foi um dos primeiros 
                      passos! Em 2025 consegui meu primeiro trabalho focado em IA e o resto é história.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Escreva sua mensagem..."
                    className="flex-1 bg-background p-2 rounded-md border border-border text-sm"
                    disabled
                  />
                  <Button disabled>Enviar</Button>
                </div>
                <p className="text-xs text-foreground/50 mt-2 text-center">
                  Este é apenas um exemplo de interação.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FridayAssistant;
