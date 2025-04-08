
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

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
        
        // Sort by updated_at and take the 6 most recent
        const sortedRepos = data
          .sort((a: Repository, b: Repository) => 
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          )
          .slice(0, 6);
        
        setRepositories(sortedRepos);
      } catch (err) {
        console.error("Error fetching GitHub repositories:", err);
        setError("Não foi possível carregar os repositórios do GitHub.");
        toast({
          title: "Erro ao carregar repositórios",
          description: "Não foi possível carregar os repositórios do GitHub.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [toast]);

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
              Projetos no GitHub
            </h2>
          </div>
          <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
            Confira meus repositórios mais recentes do GitHub, atualizados em tempo real.
          </p>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-destructive mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Tentar novamente
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repositories.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-6 shadow-md card-hover"
                >
                  <h3 className="text-lg font-semibold mb-2 truncate">{repo.name}</h3>
                  <p className="text-foreground/70 text-sm mb-4 line-clamp-2 h-10">
                    {repo.description || "Sem descrição disponível"}
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
                    className="inline-flex items-center text-primary hover:underline text-sm"
                  >
                    <Button variant="outline" size="sm">
                      Ver no GitHub <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubProjects;
