import React from 'react';
import { Link2, MessageCircle, Mail } from 'lucide-react';
import data from '../data.json';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h2 style={{ color: 'var(--marigold)', marginBottom: '0.5rem' }}>Tannmay Kumarr Baid</h2>
        <p style={{ opacity: 0.9 }}>{data.profile.education}</p>
        
        <div className="footer-socials">
          <a href={data.profile.links.linkedin} target="_blank" rel="noreferrer" className="footer-link">
            <Link2 size={20} /> LinkedIn
          </a>
          <a href={data.profile.links.twitter} target="_blank" rel="noreferrer" className="footer-link">
            <MessageCircle size={20} /> Twitter
          </a>
          <a href={`mailto:${data.profile.links.email}`} className="footer-link">
            <Mail size={20} /> Email
          </a>
        </div>
        
        <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
          &copy; {new Date().getFullYear()} Tannmay Kumarr Baid. Built with soul.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
