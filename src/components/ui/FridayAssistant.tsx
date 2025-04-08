
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, SmilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

type Message = {
  content: string;
  isUser: boolean;
};

const FridayAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (showChat && messages.length === 0) {
      // Initialize with the welcome message
      setMessages([{ content: t("friday.welcome"), isUser: false }]);
    }
  }, [showChat, messages.length, t]);

  // Predefined phrases that show up in the bubble
  const getPhrases = () => [
    "Olá! Sou a Friday, a IA pessoal da Thalita.",
    "Thalita está trabalhando com IA generativa!",
    "Quer saber mais sobre os projetos da TT?",
    "A Thalita está aprendendo engenharia de IA!",
    "Você sabia que a TT adora tecnologia desde criança?",
    "Posso te ajudar a conhecer mais sobre o trabalho da Thalita!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen && !showChat) {
        const phrases = getPhrases();
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
  }, [isOpen, showChat]);
  
  const handleChatOpen = () => {
    setShowChat(true);
    setIsOpen(false);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      content: inputValue,
      isUser: true
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputValue("");

    // Generate response based on predefined questions
    setTimeout(() => {
      let responseContent = "";

      // Simple response matching for the suggested questions
      const lowerCaseInput = inputValue.toLowerCase();
      
      if (lowerCaseInput.includes("primeiro projeto") || lowerCaseInput.includes("first project")) {
        responseContent = t("friday.chat.response.first");
      } else if (lowerCaseInput.includes("aprendeu") || lowerCaseInput.includes("learn") || lowerCaseInput.includes("programar") || lowerCaseInput.includes("code")) {
        responseContent = t("friday.chat.response.learning");
      } else if (lowerCaseInput.includes("trabalha") || lowerCaseInput.includes("work")) {
        responseContent = t("friday.chat.response.work");
      } else if (lowerCaseInput.includes("orgulha") || lowerCaseInput.includes("proud")) {
        responseContent = t("friday.chat.response.proud");
      } else {
        // Default response for other questions
        responseContent = "Hmm, isso é uma pergunta interessante! Vou consultar meus dados e te responder em breve. Enquanto isso, que tal perguntar sobre a experiência da Thalita com IA ou como ela começou a programar?";
      }

      const botResponse: Message = {
        content: responseContent,
        isUser: false
      };

      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
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
              Eu sou a Friday 
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
                <h3 className="font-medium">{t("friday.chat.title")}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowChat(false)}
                >
                  <X size={18} />
                </Button>
              </div>
              
              <div className="p-4 overflow-y-auto flex-grow">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.isUser ? 'justify-end' : ''} mb-4`}
                  >
                    <div className={`${
                      message.isUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-primary/10'
                      } rounded-lg p-3 max-w-[80%] whitespace-pre-line`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
                
                {messages.length === 1 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-muted-foreground mb-2">Sugestões de perguntas:</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs w-full justify-start"
                      onClick={() => {
                        setInputValue(t("friday.suggestions.first"));
                        setMessages(prevMessages => [
                          ...prevMessages, 
                          { content: t("friday.suggestions.first"), isUser: true },
                          { content: t("friday.chat.response.first"), isUser: false }
                        ]);
                      }}
                    >
                      <SmilePlus className="mr-2 h-3 w-3" />
                      {t("friday.suggestions.first")}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs w-full justify-start"
                      onClick={() => {
                        setInputValue(t("friday.suggestions.learning"));
                        setMessages(prevMessages => [
                          ...prevMessages, 
                          { content: t("friday.suggestions.learning"), isUser: true },
                          { content: t("friday.chat.response.learning"), isUser: false }
                        ]);
                      }}
                    >
                      <SmilePlus className="mr-2 h-3 w-3" />
                      {t("friday.suggestions.learning")}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs w-full justify-start"
                      onClick={() => {
                        setInputValue(t("friday.suggestions.work"));
                        setMessages(prevMessages => [
                          ...prevMessages, 
                          { content: t("friday.suggestions.work"), isUser: true },
                          { content: t("friday.chat.response.work"), isUser: false }
                        ]);
                      }}
                    >
                      <SmilePlus className="mr-2 h-3 w-3" />
                      {t("friday.suggestions.work")}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs w-full justify-start"
                      onClick={() => {
                        setInputValue(t("friday.suggestions.proud"));
                        setMessages(prevMessages => [
                          ...prevMessages, 
                          { content: t("friday.suggestions.proud"), isUser: true },
                          { content: t("friday.chat.response.proud"), isUser: false }
                        ]);
                      }}
                    >
                      <SmilePlus className="mr-2 h-3 w-3" />
                      {t("friday.suggestions.proud")}
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t("friday.chat.placeholder")}
                    className="flex-1 bg-background p-2 rounded-md border border-border text-sm"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send size={16} className="mr-2" />
                    {t("friday.chat.send")}
                  </Button>
                </div>
                <p className="text-xs text-foreground/50 mt-2 text-center">
                  {t("friday.chat.example")}
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
