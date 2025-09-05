
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
                Desde cedo, aprendi a me virar, me reinventar e transformar obstáculos em impulso.

                A tecnologia sempre foi meu refúgio e meu laboratório de ideias - dos jogos que despertaram meu lado estratégico até o código, onde descobri que posso criar coisas que antes só existiam na minha cabeça.

                Tenho paixão por inovação. Por explorar possibilidades novas, pensar fora da caixa e construir soluções que vão além do óbvio.

                Pra mim, desenvolver é isso: imaginar o que ainda não existe - e depois, fazer acontecer.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-primary">Meu Propósito</h3>
              <p className="text-foreground/80 leading-relaxed">
                A tecnologia, pra mim, nunca foi só sobre código - é uma ponte entre ideias e impacto real.
                Quero construir soluções que façam sentido, que desafiem o comum e tragam inovação de verdade.
                Meu foco está em criar com propósito: unir inteligência, intuição e colaboração pra transformar o que parece impossível em realidade.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
