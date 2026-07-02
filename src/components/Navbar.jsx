import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="nav-logo">TKB.</a>
        <div className="nav-links">
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#work" className="nav-link">Work</a>
          <a href="#library" className="nav-link">Library</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
