import React, { useState } from 'react';
import data from '../data.json';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const books = data.library;
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-transition">
      <section className="section">
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Library Index</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '700px' }}>
            An archive of books spanning my areas of interest. If you reside nearby and wish to borrow a title from this repository, you may contact me at <a href="mailto:tannmay1303@gmail.com" style={{ textDecoration: 'underline' }}>tannmay1303@gmail.com</a>.
          </p>

          <input 
            type="text" 
            placeholder="Search by title or author..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="library-table-container">
            <table className="library-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 500 }}>{book.title}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{book.author}</td>
                  </tr>
                ))}
                {filteredBooks.length === 0 && (
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No matching titles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-light)', textAlign: 'right' }}>
            Showing {filteredBooks.length} of {books.length} records.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Library;
