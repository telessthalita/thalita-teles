
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text">
            Meu Caminho
          </h2>
          
          <div className="space-y-8">
            <div className="bg-background p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-primary">Minha História</h3>
              <p className="text-foreground/80 leading-relaxed">
                Desde cedo, aprendi a me reinventar e buscar novas formas de crescer. 
                A tecnologia sempre foi meu refúgio e inspiração, desde os jogos que 
                me ensinaram estratégia até o desenvolvimento de software. Minha missão 
                é transformar ideias em soluções eficientes e escaláveis.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-primary">Meu Propósito</h3>
              <p className="text-foreground/80 leading-relaxed">
                Acredito que a tecnologia não é apenas código, mas um meio para resolver
                problemas reais. Meu objetivo é construir soluções inteligentes, intuitivas
                e impactantes, combinando inovação, eficiência e colaboração.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
