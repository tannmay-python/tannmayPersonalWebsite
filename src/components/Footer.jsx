import React from 'react';
import data from '../data.json';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <span className="footer-name">Tannmay K. Baid</span>
        </div>
        <div className="footer-socials">
          <a href={data.profile.links.linkedin} target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
          <a href={data.profile.links.twitter} target="_blank" rel="noreferrer" className="footer-link">Twitter</a>
          <a href={`mailto:${data.profile.links.email}`} className="footer-link">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
