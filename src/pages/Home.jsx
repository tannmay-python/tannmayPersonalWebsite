import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Book, Activity, Compass, Telescope } from 'lucide-react';
import data from '../data.json';

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="page-transition"
    >
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="hero-content"
          >
            <h1 className="hero-title">Tannmay K. Baid</h1>
            <p className="hero-description">
              Student at National Public School, HSR, and Adjunct Junior Scholar at the Takshashila Institution. Exploring the intersection of technology geopolitics, law, and economics.
            </p>
            <div className="hero-links">
              <Link to="/work" className="btn-primary">
                Explore Research <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="section-header-row">
            <h2 className="section-heading">Projects</h2>
          </div>
          
          <div className="projects-grid">
            {data.projects.map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="project-card group"
              >
                <div className="project-card-content">
                  <h3 className="project-title">{project.title}</h3>
                  <a href={project.url} target="_blank" rel="noreferrer" className="project-link">
                    View Project <ArrowRight size={16} className="project-link-icon" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagements Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading mb-large">Engagements & Pursuits</h2>
          
          <div className="engagements-layout">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="highlight-card"
            >
              <div className="highlight-icon"><Trophy size={28} /></div>
              <h3 className="highlight-title">Competitive Debating</h3>
              <p className="highlight-desc">
                Ranked among the Top-40 debaters in India (ISDS 2023) and Top-18 (2025 WSDC selection). Secured the Senior Novice Gold Medal representing India at the LSE Open.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="pursuits-grid"
            >
              <div className="pursuit-item">
                <Telescope className="pursuit-icon" size={20} />
                <span>Astronomy (8-inch Dobsonian)</span>
              </div>
              <div className="pursuit-item">
                <Book className="pursuit-icon" size={20} />
                <span>Literature & Philosophy</span>
              </div>
              <div className="pursuit-item">
                <Compass className="pursuit-icon" size={20} />
                <span>Mathematics</span>
              </div>
              <div className="pursuit-item">
                <Activity className="pursuit-icon" size={20} />
                <span>Fitness</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
