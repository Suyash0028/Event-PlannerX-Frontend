import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 Event-PlannerX. All rights reserved.</p>
        <p>
          <Link to="/about">About Us</Link> |{' '}
          <Link to="/contact">Contact</Link> |{' '}
          <Link to="/privacy">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
