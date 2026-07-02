import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import data from '../data.json';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge">Welcome to my space</span>
          <h1 className="hero-title">
            Hi, I'm {data.profile.name}.<br/>
            <span style={{ color: 'var(--marigold)' }}>Builder & Scholar.</span>
          </h1>
          <p className="hero-subtitle">
            {data.profile.bio}
          </p>
          
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              See My Projects <ArrowRight size={18} />
            </a>
            <a href="#work" className="btn btn-secondary">
              Read My Work <BookOpen size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
