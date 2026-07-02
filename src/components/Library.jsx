import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Mail } from 'lucide-react';
import data from '../data.json';

const Library = () => {
  const [visibleCount, setVisibleCount] = useState(12);
  const books = data.library;

  return (
    <section id="library" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Library</h2>
          <p className="section-subtitle">A glimpse into my massive collection of books. I love reading.</p>
        </div>

        <div className="library-grid">
          {books.slice(0, visibleCount).map((book, index) => (
            <motion.div
              key={index}
              className="book-card"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 12) * 0.05 }}
            >
              <BookMarked className="book-icon" size={24} />
              <div className="book-info">
                <h4>{book.title}</h4>
                <p>{book.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {visibleCount < books.length && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="btn btn-secondary" onClick={() => setVisibleCount(v => v + 12)}>
              Load More Books
            </button>
          </div>
        )}

        <motion.div 
          className="library-cta"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h3>Want to borrow a book?</h3>
          <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>If you're in the area and something catches your eye, feel free to reach out!</p>
          <a href={`mailto:${data.profile.links.email}`} className="btn btn-primary">
            <Mail size={18} /> Email Me to Borrow
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Library;
