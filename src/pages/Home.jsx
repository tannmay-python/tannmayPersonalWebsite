import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data.json';

const Home = () => {
  return (
    <div className="page-transition">
      <section className="section">
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', maxWidth: '800px' }}>
            Tannmay Kumarr Baid
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '700px', marginBottom: '2rem', lineHeight: 1.8 }}>
            I am a student at National Public School, HSR, and an Adjunct Junior Scholar at the Takshashila Institution. My academic and professional interests span policy, law, economics, and technology geopolitics. 
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/work" style={{ borderBottom: '1px solid var(--llama)', paddingBottom: '2px', fontWeight: 500 }}>
              Read my research
            </Link>
            <span style={{ color: 'var(--border)' }}>|</span>
            <a href="mailto:tannmay1303@gmail.com" style={{ color: 'var(--text-muted)' }}>tannmay1303@gmail.com</a>
            <a href="https://www.linkedin.com/in/tannmaykumarrbaid/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}>LinkedIn</a>
            <a href="https://x.com/tannmaybaid" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}>Twitter</a>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Selected Initiatives</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {data.projects.map((project, idx) => (
              <div key={idx} style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '4px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontFamily: 'var(--font-sans)', color: 'var(--text-main)' }}>
                  {project.title}
                </h3>
                <a href={project.url} target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--llama)', fontWeight: 500 }}>
                  View Project &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Achievements & Interests</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-sans)', color: 'var(--text-main)' }}>Competitive Debating</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Ranked among the Top-40 debaters in India by the Indian Schools Debating Society (ISDS) in 2023, and Top-18 in 2025 during the WSDC national selection process. Selected to represent India at LSE Open (Juniors and Seniors), securing the Senior Novice Gold Medal.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-sans)', color: 'var(--text-main)' }}>Other Pursuits</h3>
              <ul style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
                <li>Astronomy (observing with an 8-inch Dobsonian telescope)</li>
                <li>Mathematics</li>
                <li>Fitness and Gym training</li>
                <li>Extensive reading across philosophy, economics, and history (see <Link to="/library" style={{ textDecoration: 'underline' }}>Library</Link>)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
