import React from 'react';
import data from '../data.json';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '3rem 0',
      backgroundColor: '#ffffff',
      marginTop: 'auto'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>Tannmay Kumarr Baid</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{data.profile.education}</p>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href={data.profile.links.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>LinkedIn</a>
          <a href={data.profile.links.twitter} target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Twitter</a>
          <a href={`mailto:${data.profile.links.email}`} style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
