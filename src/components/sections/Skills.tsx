
import React from "react";
import { motion } from "framer-motion";

const hardSkills = [
  "JavaScript", "Python", "SQL", "React", "Vue", "Node.js", "C#", 
  "APIs", "Git/GitHub", "Automação", "MultiCloud (em andamento)", 
  "DevOps (em andamento)", "Scrum", "IA Generativa"
];

const softSkills = [
  "Proatividade", "Trabalho em equipe", "Resiliência", 
  "Planejamento", "Comunicação", "Adaptabilidade"
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text">
            Habilidades
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6 text-primary">Hard Skills</h3>
              <div className="flex flex-wrap gap-2">
                {hardSkills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6 text-primary">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
