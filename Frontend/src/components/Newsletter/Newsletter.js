import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter">
      <div className="newsletter-content">
        <h2 className="newsletter-title">Join Our Community</h2>
        <p className="newsletter-description">
          Subscribe to receive exclusive offers, early access to new collections, and style inspiration.
        </p>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <div className="newsletter-input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="newsletter-input"
              disabled={loading}
            />
            <button
              type="submit"
              className="newsletter-button"
              disabled={loading}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          <p className="newsletter-privacy">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;