import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-logo">ISOTÉ</h3>
            <p className="footer-tagline">Timeless elegance,<br/>crafted with care</p>
          </div>

          <div className="footer-section">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop/Women">Women</Link></li>
              <li><Link to="/shop/Men">Men</Link></li>
              <li><Link to="/shop">New Arrivals</Link></li>
              <li><Link to="/shop">Sale</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Customer Care</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/legal/shipping">Shipping & Returns</Link></li>
              <li><Link to="/legal/size-guide">Size Guide</Link></li>
              <li><Link to="/legal/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/legal/privacy">Privacy Policy</Link></li>
              <li><Link to="/legal/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer-section newsletter-section">
            <h4>Newsletter</h4>
            <p>Subscribe for exclusive offers and updates</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Isoté. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Twitter">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
