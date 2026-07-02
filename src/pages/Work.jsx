import React from 'react';
import data from '../data.json';

const Work = () => {
  const categories = Object.keys(data.work).filter(k => data.work[k].length > 0);

  return (
    <div className="page-transition">
      <section className="section">
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Research & Writing</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '700px' }}>
            A comprehensive index of my publications, op-eds, podcasts, and newsletter pieces contributed during my tenure as an Adjunct Junior Scholar at the Takshashila Institution.
          </p>

          {categories.map((cat) => (
            <div key={cat} style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>{cat}</h2>
              <ul className="formal-list">
                {data.work[cat].map((item, idx) => (
                  <li key={idx} className="formal-list-item">
                    <a href={item.url} target="_blank" rel="noreferrer" style={{ display: 'block' }}>
                      <div className="formal-list-title">{item.title}</div>
                      {item.date && <div className="formal-list-meta">{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Work;
