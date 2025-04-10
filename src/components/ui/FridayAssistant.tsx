
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
    "A Thalita desenvolveu projetos incríveis!",
    "Quer saber mais sobre o MoodTunes?",
    "A Thalita adora tecnologia desde criança!",
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

    // Generate response based on predefined questions and keywords
    setTimeout(() => {
      let responseContent = "";
      const lowerCaseInput = inputValue.toLowerCase();
      
      // Check for keywords about MoodTunes or projects
      if (lowerCaseInput.includes("primeiro projeto") || 
          lowerCaseInput.includes("moodtunes") || 
          lowerCaseInput.includes("ia") || 
          lowerCaseInput.includes("mood") || 
          lowerCaseInput.includes("gemini") ||
          lowerCaseInput.includes("spotify")) {
        responseContent = "O MoodTunes foi o primeiro projeto da Thalita com IA. Ela usa o Gemini para processar conversas, entender o humor do usuário e criar playlists personalizadas no Spotify. Foi um marco importante na jornada dela com tecnologias de IA generativa. Você costuma usar IA no seu dia a dia também?";
      } 
      // Learning programming
      else if (lowerCaseInput.includes("aprendeu") || 
               lowerCaseInput.includes("programar") || 
               lowerCaseInput.includes("começou") ||
               lowerCaseInput.includes("código")) {
        responseContent = "Thalita começou a programar aos 16 anos, explorando HTML e CSS por curiosidade. A paixão por resolver problemas a levou a aprofundar os estudos de forma autodidata, antes mesmo de iniciar a faculdade. O que te interessa mais no mundo do desenvolvimento?";
      } 
      // About "Deusa da Tecnologia"
      else if (lowerCaseInput.includes("deusa") || 
               lowerCaseInput.includes("tecnologia") || 
               lowerCaseInput.includes("goddess")) {
        responseContent = "\"Deusa da Tecnologia\" foi como uma amiga descreveu a Thalita ao vê-la criando com código e conversando comigo. Pode ter sido só uma brincadeira — mas traduz bem a essência dela. O foco dela está em criar soluções inteligentes, que otimizem processos, conectem pessoas e tornem a tecnologia mais acessível e significativa no dia a dia. Desenvolver, para ela, é mais do que programar: é resolver com propósito. O que você acha dessa filosofia de trabalho?";
      }
      // About projects she's proud of
      else if (lowerCaseInput.includes("orgulha") || 
               lowerCaseInput.includes("favorito") || 
               lowerCaseInput.includes("mais legal")) {
        responseContent = "Sem dúvida, o MoodTunes é o projeto que mais nos orgulhamos! É uma aplicação que usa IA para analisar conversas, identificar o humor do usuário e gerar playlists personalizadas no Spotify. A Thalita conseguiu unir tecnologia e emoção de um jeito bem criativo. Você gosta de escutar música de acordo com seu humor também?";
      }
      else {
        // Default response for unrecognized questions
        responseContent = "Hmm, essa eu ainda não sei responder — quer tentar de outro jeito ou falar sobre os projetos da Thalita? Posso te contar sobre o MoodTunes, como ela começou a programar ou sobre sua filosofia de desenvolvimento.";
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
              Friday
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
                        setInputValue("O que é o MoodTunes?");
                        setMessages(prevMessages => [
                          ...prevMessages, 
                          { content: "O que é o MoodTunes?", isUser: true },
                          { content: "O MoodTunes foi o primeiro projeto da Thalita com IA. Ela usa o Gemini para processar conversas, entender o humor do usuário e criar playlists personalizadas no Spotify. Foi um marco importante na jornada dela com tecnologias de IA generativa. Você costuma usar IA no seu dia a dia também?", isUser: false }
                        ]);
                      }}
                    >
                      <SmilePlus className="mr-2 h-3 w-3" />
                      O que é o MoodTunes?
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs w-full justify-start"
                      onClick={() => {
                        setInputValue("Como a Thalita começou a programar?");
                        setMessages(prevMessages => [
                          ...prevMessages, 
                          { content: "Como a Thalita começou a programar?", isUser: true },
                          { content: "Thalita começou a programar aos 16 anos, explorando HTML e CSS por curiosidade. A paixão por resolver problemas a levou a aprofundar os estudos de forma autodidata, antes mesmo de iniciar a faculdade. O que te interessa mais no mundo do desenvolvimento?", isUser: false }
                        ]);
                      }}
                    >
                      <SmilePlus className="mr-2 h-3 w-3" />
                      Como a Thalita começou a programar?
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs w-full justify-start"
                      onClick={() => {
                        setInputValue("Qual projeto a Thalita mais se orgulha?");
                        setMessages(prevMessages => [
                          ...prevMessages, 
                          { content: "Qual projeto a Thalita mais se orgulha?", isUser: true },
                          { content: "Sem dúvida, o MoodTunes é o projeto que mais nos orgulhamos! É uma aplicação que usa IA para analisar conversas, identificar o humor do usuário e gerar playlists personalizadas no Spotify. A Thalita conseguiu unir tecnologia e emoção de um jeito bem criativo. Você gosta de escutar música de acordo com seu humor também?", isUser: false }
                        ]);
                      }}
                    >
                      <SmilePlus className="mr-2 h-3 w-3" />
                      Qual projeto a Thalita mais se orgulha?
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs w-full justify-start"
                      onClick={() => {
                        setInputValue("O que significa 'Deusa da Tecnologia'?");
                        setMessages(prevMessages => [
                          ...prevMessages, 
                          { content: "O que significa 'Deusa da Tecnologia'?", isUser: true },
                          { content: "\"Deusa da Tecnologia\" foi como uma amiga descreveu a Thalita ao vê-la criando com código e conversando comigo. Pode ter sido só uma brincadeira — mas traduz bem a essência dela. O foco dela está em criar soluções inteligentes, que otimizem processos, conectem pessoas e tornem a tecnologia mais acessível e significativa no dia a dia. Desenvolver, para ela, é mais do que programar: é resolver com propósito. O que você acha dessa filosofia de trabalho?", isUser: false }
                        ]);
                      }}
                    >
                      <SmilePlus className="mr-2 h-3 w-3" />
                      O que significa 'Deusa da Tecnologia'?
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
