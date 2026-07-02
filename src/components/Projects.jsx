import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import data from '../data.json';

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Babies</h2>
          <p className="section-subtitle">A collection of projects I've built from scratch, combining code, research, and design.</p>
        </div>
        
        <div className="grid-3">
          {data.projects.map((project, index) => (
            <motion.div
              key={index}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="card-title">{project.title}</h3>
              {project.date && <p className="card-date">{project.date}</p>}
              <a href={project.url} target="_blank" rel="noreferrer" className="card-link">
                View Project <ExternalLink size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
