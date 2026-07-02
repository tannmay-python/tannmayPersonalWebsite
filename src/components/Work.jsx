import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import data from '../data.json';

const Work = () => {
  const categories = Object.keys(data.work).filter(k => data.work[k].length > 0);
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Takshashila Work</h2>
          <p className="section-subtitle">My research, writing, and discussions as an Adjunct Junior Scholar.</p>
        </div>

        <div className="tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid-2">
          <AnimatePresence mode="popLayout">
            {data.work[activeTab].map((item, index) => (
              <motion.div
                key={item.url + index}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card"
              >
                <h3 className="card-title">{item.title}</h3>
                {item.date && <p className="card-date">{item.date}</p>}
                <a href={item.url} target="_blank" rel="noreferrer" className="card-link">
                  Read More <ExternalLink size={16} />
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Work;
