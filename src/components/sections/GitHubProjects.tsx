
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Repository = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  updated_at: string;
};

const GitHubProjects = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.github.com/users/telessthalita/repos"
        );
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Sort by updated_at
        const sortedRepos = data.sort((a: Repository, b: Repository) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        
        setRepositories(sortedRepos);
      } catch (err) {
        console.error("Error fetching GitHub repositories:", err);
        setError(t("github.error"));
        toast({
          title: t("github.error"),
          description: t("github.error"),
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [toast, t]);

  return (
    <section id="github" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github className="h-6 w-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-center gradient-text">
              {t("github.title")}
            </h2>
          </div>
          <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
            {t("github.description")}
          </p>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">{t("github.loading")}</span>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-destructive mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                {t("github.tryAgain")}
              </Button>
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent>
                {repositories.map((repo) => (
                  <CarouselItem key={repo.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-card rounded-xl p-6 shadow-md card-hover h-full flex flex-col"
                    >
                      <h3 className="text-lg font-semibold mb-2 truncate">{repo.name}</h3>
                      <p className="text-foreground/70 text-sm mb-4 line-clamp-2 flex-grow">
                        {repo.description || t("github.noDescription")}
                      </p>
                      
                      {repo.language && (
                        <div className="flex items-center mb-4">
                          <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                          <span className="text-xs text-foreground/60">{repo.language}</span>
                        </div>
                      )}
                      
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline text-sm mt-auto"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          {t("github.viewOnGithub")} <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                      </a>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8">
                <CarouselPrevious className="static transform-none mx-2" />
                <CarouselNext className="static transform-none mx-2" />
              </div>
            </Carousel>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubProjects;
