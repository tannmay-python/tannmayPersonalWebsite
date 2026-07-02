import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, BookOpen } from 'lucide-react';
import data from '../data.json';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const books = data.library;
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="page-title">The Library</h1>
            <p className="page-subtitle">
              A curated index of literature shaping my perspective across economics, history, and philosophy. 
            </p>
          </header>

          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search by title or author..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="library-stats">
            <span>{filteredBooks.length} titles found</span>
          </div>

          <div className="books-grid">
            {filteredBooks.map((book, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx % 15) * 0.03 }}
                className="book-card"
              >
                <div className="book-card-inner">
                  <div className="book-icon-wrapper">
                    <BookOpen size={16} />
                  </div>
                  <div className="book-details">
                    <h4 className="book-title">{book.title}</h4>
                    <p className="book-author">{book.author}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {filteredBooks.length === 0 && (
              <div className="no-results">
                <p>No titles match your search criteria.</p>
              </div>
            )}
          </div>
          
          <motion.div 
            className="library-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="library-cta-content">
              <h3>Borrow a Title</h3>
              <p>Located in Bengaluru? Reach out to borrow a book from the physical archives.</p>
            </div>
            <a href={`mailto:${data.profile.links.email}`} className="btn-primary">
              <Mail size={18} /> Request Book
            </a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Library;
