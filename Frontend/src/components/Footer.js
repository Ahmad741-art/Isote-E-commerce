import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ISOTÉ</h3>
          <p>Timeless luxury crafted for the discerning.</p>
        </div>

        <div className="footer-section">
          <h4>Shop</h4>
          <Link to="/shop?category=women">Women</Link>
          <Link to="/shop?category=men">Men</Link>
          <Link to="/shop?category=accessories">Accessories</Link>
          <Link to="/shop">All Products</Link>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/legal/privacy">Privacy Policy</Link>
          <Link to="/legal/terms">Terms & Conditions</Link>
        </div>

        <div className="footer-section">
          <h4>Customer Care</h4>
          <Link to="/account">My Account</Link>
          <Link to="/legal/shipping">Shipping & Returns</Link>
          <Link to="/contact">Customer Service</Link>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <p className="newsletter-text">Subscribe to receive updates and exclusive offers.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Isoté. All rights reserved.</p>
        <div className="social-links">
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="Facebook">Facebook</a>
          <a href="#" aria-label="Twitter">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;