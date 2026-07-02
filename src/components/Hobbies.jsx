import React from 'react';
import { motion } from 'framer-motion';
import { Telescope, Book, Calculator, Dumbbell, Mic, Star } from 'lucide-react';
import data from '../data.json';

const getIcon = (hobby) => {
  const lower = hobby.toLowerCase();
  if (lower.includes('astronomy')) return <Telescope size={24} />;
  if (lower.includes('reading')) return <Book size={24} />;
  if (lower.includes('math')) return <Calculator size={24} />;
  if (lower.includes('gym')) return <Dumbbell size={24} />;
  if (lower.includes('debate')) return <Mic size={24} />;
  return <Star size={24} />;
};

const Hobbies = () => {
  return (
    <section id="hobbies" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Beyond the Desk</h2>
          <p className="section-subtitle">What I do when I'm not building projects or writing policy research.</p>
        </div>

        <div className="hobbies-list">
          {data.profile.hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              className="hobby-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="hobby-icon">
                {getIcon(hobby)}
              </div>
              <p style={{ fontWeight: 500 }}>{hobby}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
