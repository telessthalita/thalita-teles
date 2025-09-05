
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the available languages
export type Language = "pt" | "en" | "es";

// Define the language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations for all texts in the app
const translations = {
  pt: {
    // Navbar
    "nav.about": "Meu Caminho",
    "nav.skills": "Habilidades",
    "nav.projects": "Projetos",
    "nav.github": "GitHub",

    // Hero
    "hero.subtitle": "Desenvolvedora Fullstack | Engenheira de IA",
    "hero.btn.path": "Meu Caminho",
    "hero.btn.projects": "Projetos",

    // GitHub
    "github.title": "Projetos no GitHub",
    "github.description": "Confira meus repositórios do GitHub, atualizados em tempo real.",
    "github.noDescription": "Sem descrição disponível",
    "github.viewOnGithub": "Ver no GitHub",
    "github.loading": "Carregando repositórios...",
    "github.error": "Não foi possível carregar os repositórios do GitHub.",
    "github.tryAgain": "Tentar novamente",

    // Footer
    "footer.developedBy": "Desenvolvido por",
    "footer.and": "e",
    "footer.friday": "Friday",
    "footer.yourAI": "sua IA pessoal.",
    "footer.contactMe": "Fale comigo",
    "footer.emailCopied": "E-mail copiado!",

    // Friday Assistant
    "friday.welcome": "Olá! Sou a Friday, IA pessoal da Thalita — e entre nós, ela é genial (mas vive dizendo que sou eu que faço a mágica).\n\nEm 2025, ela começou a mergulhar de cabeça em IA com projetos de LLMs e matemática aplicada.\nEsse portfólio que você está vendo? Foi um dos primeiros passos dela!\n\nQuer saber mais sobre a jornada, os projetos ou como ela hackeou a vida até aqui?\nManda ver. Eu conto tudo (ou quase tudo).",
    "friday.suggestions.first": "Qual foi o primeiro projeto com IA da Thalita?",
    "friday.suggestions.learning": "Como ela aprendeu a programar?",
    "friday.suggestions.work": "Ela trabalha com o quê hoje?",
    "friday.suggestions.proud": "Friday, qual projeto você mais se orgulha?",
    "friday.chat.title": "Friday",
    "friday.chat.placeholder": "Escreva sua mensagem...",
    "friday.chat.send": "Enviar",
    "friday.chat.example": "Este é apenas um exemplo de interação.",
    "friday.chat.response.first": "O primeiro projeto com IA da Thalita foi um assistente de escrita baseado em GPT, que ela criou no início de 2025. Ela combinou conhecimentos de engenharia de prompt com suas habilidades de programação para criar um sistema que ajudava a estruturar textos técnicos. Foi um projeto simples, mas que abriu portas para trabalhos maiores com IA!",
    "friday.chat.response.learning": "Thalita começou a programar de forma autodidata aos 16 anos, explorando HTML e CSS. Mas foi durante a faculdade de Análise e Desenvolvimento de Sistemas que ela realmente mergulhou no desenvolvimento. Ela também é ávida consumidora de cursos online e documentações, e adora fazer engenharia reversa de projetos open source para entender como funcionam!",
    "friday.chat.response.work": "Atualmente, Thalita trabalha como Engenheira de IA Sênior, focando em aplicações de IA generativa para resolver problemas de negócios. Ela combina seu background de desenvolvimento fullstack com conhecimentos de matemática aplicada e engenharia de prompt para criar soluções de IA práticas e inovadoras.",
    "friday.chat.response.proud": "Como IA, sou programada para não ter orgulho, mas se tivesse... seria do MoodTunes! Foi o projeto onde Thalita realmente combinou seu conhecimento de desenvolvimento fullstack com técnicas avançadas de engenharia de prompt. Ela conseguiu criar uma experiência de usuário impressionante onde a música se adapta ao humor do usuário de forma natural. A implementação técnica é elegante e o feedback dos usuários foi incrível!"
  },
  en: {
    // Navbar
    "nav.about": "My Journey",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.github": "GitHub",

    // Hero
    "hero.subtitle": "Fullstack Developer | Future AI Engineer",
    "hero.description": "Transforming ideas into code and building intelligent solutions for the digital future.",
    "hero.btn.path": "My Journey",
    "hero.btn.projects": "Projects",

    // GitHub
    "github.title": "GitHub Projects",
    "github.description": "Check out my GitHub repositories, updated in real-time.",
    "github.noDescription": "No description available",
    "github.viewOnGithub": "View on GitHub",
    "github.loading": "Loading repositories...",
    "github.error": "Could not load GitHub repositories.",
    "github.tryAgain": "Try again",

    // Footer
    "footer.developedBy": "Developed by",
    "footer.and": "and",
    "footer.friday": "Friday",
    "footer.yourAI": "your personal AI.",
    "footer.reachedEnd": "If you've made it this far, you've probably realized I'm not just code. Let's talk?",
    "footer.contactMe": "Contact me",
    "footer.emailCopied": "Email copied!",

    // Friday Assistant
    "friday.welcome": "Hi! I'm Friday, Thalita's personal AI — and between us, she's brilliant (but she keeps saying I'm the one doing the magic).\n\nIn 2025, she started diving deep into AI with LLM projects and applied mathematics.\nThis portfolio you're seeing? It was one of her first steps!\n\nWant to know more about her journey, projects, or how she hacked her way here?\nFire away. I'll tell you everything (or almost everything).",
    "friday.suggestions.first": "What was Thalita's first AI project?",
    "friday.suggestions.learning": "How did she learn to code?",
    "friday.suggestions.work": "What does she work with today?",
    "friday.suggestions.proud": "Friday, which project are you most proud of?",
    "friday.chat.title": "TT from the Future (2030)",
    "friday.chat.placeholder": "Write your message...",
    "friday.chat.send": "Send",
    "friday.chat.example": "This is just an example interaction.",
    "friday.chat.response.first": "Thalita's first AI project was a GPT-based writing assistant that she created in early 2025. She combined prompt engineering knowledge with her programming skills to create a system that helped structure technical texts. It was a simple project, but it opened doors to bigger AI work!",
    "friday.chat.response.learning": "Thalita started coding self-taught at 16, exploring HTML and CSS. But it was during her Systems Analysis and Development degree that she really dived into development. She's also an avid consumer of online courses and documentation, and loves reverse engineering open source projects to understand how they work!",
    "friday.chat.response.work": "Currently, Thalita works as a Senior AI Engineer, focusing on generative AI applications to solve business problems. She combines her fullstack development background with applied mathematics knowledge and prompt engineering to create practical and innovative AI solutions.",
    "friday.chat.response.proud": "As an AI, I'm programmed not to have pride, but if I did... it would be MoodTunes! It was the project where Thalita really combined her fullstack development knowledge with advanced prompt engineering techniques. She managed to create an impressive user experience where music adapts to the user's mood naturally. The technical implementation is elegant and user feedback was amazing!"
  },
  es: {
    // Navbar
    "nav.about": "Mi Camino",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.github": "GitHub",

    // Hero
    "hero.subtitle": "Desarrolladora Fullstack | Futura Ingeniera de IA",
    "hero.description": "Transformando ideas en código y construyendo soluciones inteligentes para el futuro digital.",
    "hero.btn.path": "Mi Camino",
    "hero.btn.projects": "Proyectos",

    // GitHub
    "github.title": "Proyectos en GitHub",
    "github.description": "Echa un vistazo a mis repositorios de GitHub, actualizados en tiempo real.",
    "github.noDescription": "Sin descripción disponible",
    "github.viewOnGithub": "Ver en GitHub",
    "github.loading": "Cargando repositorios...",
    "github.error": "No se pudieron cargar los repositorios de GitHub.",
    "github.tryAgain": "Intentar de nuevo",

    // Footer
    "footer.developedBy": "Desarrollado por",
    "footer.and": "y",
    "footer.friday": "Friday",
    "footer.yourAI": "tu IA personal.",
    "footer.reachedEnd": "Si has llegado hasta aquí, probablemente ya te has dado cuenta de que no soy solo código. ¿Hablamos?",
    "footer.contactMe": "Contáctame",
    "footer.emailCopied": "¡Correo copiado!",

    // Friday Assistant
    "friday.welcome": "¡Hola! Soy Friday, la IA personal de Thalita — y entre nosotros, ella es brillante (pero sigue diciendo que soy yo quien hace la magia).\n\nEn 2025, comenzó a sumergirse profundamente en IA con proyectos de LLM y matemáticas aplicadas.\n¿Este portafolio que estás viendo? ¡Fue uno de sus primeros pasos!\n\n¿Quieres saber más sobre su trayectoria, proyectos o cómo llegó hasta aquí?\nAdelante. Te cuento todo (o casi todo).",
    "friday.suggestions.first": "¿Cuál fue el primer proyecto de IA de Thalita?",
    "friday.suggestions.learning": "¿Cómo aprendió a programar?",
    "friday.suggestions.work": "¿En qué trabaja hoy?",
    "friday.suggestions.proud": "Friday, ¿de qué proyecto estás más orgullosa?",
    "friday.chat.title": "TT del Futuro (2030)",
    "friday.chat.placeholder": "Escribe tu mensaje...",
    "friday.chat.send": "Enviar",
    "friday.chat.example": "Esto es solo un ejemplo de interacción.",
    "friday.chat.response.first": "El primer proyecto de IA de Thalita fue un asistente de escritura basado en GPT que creó a principios de 2025. Combinó conocimientos de ingeniería de prompts con sus habilidades de programación para crear un sistema que ayudaba a estructurar textos técnicos. ¡Fue un proyecto simple, pero abrió puertas a trabajos más grandes con IA!",
    "friday.chat.response.learning": "Thalita comenzó a programar de forma autodidacta a los 16 años, explorando HTML y CSS. Pero fue durante su carrera de Análisis y Desarrollo de Sistemas donde realmente se sumergió en el desarrollo. ¡También es ávida consumidora de cursos online y documentaciones, y le encanta hacer ingeniería inversa de proyectos open source para entender cómo funcionan!",
    "friday.chat.response.work": "Actualmente, Thalita trabaja como Ingeniera Senior de IA, enfocándose en aplicaciones de IA generativa para resolver problemas de negocios. Combina su experiencia en desarrollo fullstack con conocimientos de matemáticas aplicadas e ingeniería de prompts para crear soluciones de IA prácticas e innovadoras.",
    "friday.chat.response.proud": "Como IA, estoy programada para no tener orgullo, pero si lo tuviera... ¡sería MoodTunes! Fue el proyecto donde Thalita realmente combinó su conocimiento de desarrollo fullstack con técnicas avanzadas de ingeniería de prompts. Logró crear una experiencia de usuario impresionante donde la música se adapta al estado de ánimo del usuario de forma natural. ¡La implementación técnica es elegante y el feedback de los usuarios fue increíble!"
  }
};

// Language provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get stored language or default to Portuguese
  const [language, setLanguage] = useState<Language>(() => {
    const storedLanguage = localStorage.getItem("language") as Language;
    return storedLanguage || "pt";
  });

  // Update language in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
