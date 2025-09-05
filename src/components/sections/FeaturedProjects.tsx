import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code, Music, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Certifique-se de ter esse Carousel

const projects = [
  {
    id: 1,
    title: "MoodTunes",
    description: "Chatbot de IA com integração ao Spotify. Utiliza GroqCloud para interpretar o humor do usuário e criar playlists personalizadas.",
    link: "https://moodtuness.lovable.app/",
    icon: <Music className="w-10 h-10 text-primary" />,
  },
  {
    id: 2,
    title: "RaceTrack",
    description: "Front-end com dados de F1 em tempo real. Exibe estatísticas, comparações entre pilotos e equipes.",
    link: "https://race-tracker-live.onrender.com/",
    icon: <LineChart className="w-10 h-10 text-primary" />,
  },
  {
    id: 3,
    title: "AI Art Gallery",
    description: "Uma galeria virtual interativa que exibe arte gerada por IA, mostrando o potencial da IA na criação artística com imagens únicas e criativas.",
    link: "https://4iartgallery.vercel.app",
    icon: <Code className="w-10 h-10 text-primary" />,
  },
  {
    id: 4,
    title: "SpotiClone",
    description: "Clone funcional do Spotify com streaming de música e navegação fluida.",
    link: "https://spotify-ykmg.onrender.com",
    icon: <Music className="w-10 h-10 text-primary" />,
  },
  {
    id: 5,
    title: "Brisa da Barra",
    description: "Catálogo virtual da Tabacaria Brisa da Barra. Explore os produtos, escolha seus favoritos e finalize sua compra de forma prática pelo WhatsApp.",
    link: "https://spotify-ykmg.onrender.com",
    icon: <ShoppingBag className="w-10 h-10 text-primary" />,
 }
];

const FeaturedProjects = () => {
  return (
    <section id="projects" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text">
            Projetos em Destaque
          </h2>

          {/* Carousel for Featured Projects */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-background rounded-xl overflow-hidden shadow-md card-hover"
                  >
                    <div className="p-6">
                      <div className="mb-4">{project.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-foreground/70 text-sm mb-6 line-clamp-3">
                        {project.description}
                      </p>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        <Button>
                          Ver Projeto <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Carousel Navigation */}
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="static transform-none mx-2" />
              <CarouselNext className="static transform-none mx-2" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
