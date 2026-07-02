import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? { fontWeight: 600, borderBottom: '2px solid var(--llama)' } : {};

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: 'rgba(250, 249, 246, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)',
      zIndex: 100,
      padding: '1.2rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--llama)' }}>
          Tannmay K. Baid
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ ...isActive('/'), color: 'var(--text-main)', paddingBottom: '4px' }}>Home</Link>
          <Link to="/work" style={{ ...isActive('/work'), color: 'var(--text-main)', paddingBottom: '4px' }}>Research & Writing</Link>
          <Link to="/library" style={{ ...isActive('/library'), color: 'var(--text-main)', paddingBottom: '4px' }}>Library</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
