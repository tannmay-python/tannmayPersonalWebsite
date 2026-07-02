import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Mic, BookOpen, Rss, Newspaper, ArrowUpRight } from 'lucide-react';
import data from '../data.json';

const getIcon = (category) => {
  switch (category) {
    case 'Op-Eds': return <Newspaper size={20} strokeWidth={1.5} />;
    case 'Podcasts': return <Mic size={20} strokeWidth={1.5} />;
    case 'Publications': return <BookOpen size={20} strokeWidth={1.5} />;
    case 'Blogs': return <FileText size={20} strokeWidth={1.5} />;
    case 'Newsletters': return <Rss size={20} strokeWidth={1.5} />;
    default: return <FileText size={20} strokeWidth={1.5} />;
  }
};

const Work = () => {
  const categories = ['All', ...Object.keys(data.work).filter(k => data.work[k].length > 0)];
  const [activeFilter, setActiveFilter] = useState('All');

  const allItems = Object.entries(data.work).flatMap(([cat, items]) => 
    items.map(item => ({ ...item, category: cat }))
  ).sort((a, b) => new Date(b.date || '1970') - new Date(a.date || '1970'));

  const filteredItems = activeFilter === 'All' 
    ? allItems 
    : allItems.filter(item => item.category === activeFilter);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="page-transition"
    >
      <section className="section">
        <div className="container">
          <header className="page-header">
            <h1 className="page-title">Research & Writing</h1>
            <p className="page-subtitle">
              Essays, op-eds, and analyses exploring the intersections of technology, geopolitics, and policy.
            </p>
          </header>

          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="work-grid">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.url + idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                  className="work-card group"
                >
                  <a href={item.url} target="_blank" rel="noreferrer" className="work-card-link">
                    <div className="work-card-header">
                      <div className="work-card-icon">{getIcon(item.category)}</div>
                      <span className="work-card-category">{item.category}</span>
                    </div>
                    <h3 className="work-card-title">{item.title}</h3>
                    <div className="work-card-footer">
                      {item.date ? (
                        <span className="work-card-date">
                          {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      ) : <span />}
                      <span className="work-card-arrow"><ArrowUpRight size={18} /></span>
                    </div>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Work;
