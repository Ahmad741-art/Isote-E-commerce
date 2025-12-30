import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import CartSidebar from '../Cart/CartSidebar';
import './Navigation.css';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { setCartOpen, getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="navigation">
        <div className="nav-container">
          <div className="nav-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          <div className="nav-center">
            <Link to="/" className="logo">
              ISOTÉ
            </Link>
          </div>

          <div className="nav-right">
            <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>
                Shop
              </Link>
              <Link to="/shop/Women" onClick={() => setMobileMenuOpen(false)}>
                Women
              </Link>
              <Link to="/shop/Men" onClick={() => setMobileMenuOpen(false)}>
                Men
              </Link>
            </div>

            <div className="nav-icons">
              {isAuthenticated ? (
                <>
                  <Link to="/account" className="nav-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </Link>
                  <button onClick={handleLogout} className="nav-icon">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/auth/login" className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </Link>
              )}
              <button onClick={() => setCartOpen(true)} className="nav-icon cart-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="cart-count">{getCartCount()}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <CartSidebar />
    </>
  );
};

export default Navigation;
