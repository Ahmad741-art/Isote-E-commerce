import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, isAdmin } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      borderBottom: '1px solid var(--border)',
      zIndex: 1000,
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Top Banner */}
      <div style={{
        backgroundColor: 'var(--primary)',
        color: 'white',
        textAlign: 'center',
        padding: '8px',
        fontSize: '12px',
        letterSpacing: '0.5px'
      }}>
        FREE SHIPPING ON ORDERS OVER $100 | NEW ARRIVALS WEEKLY
      </div>

      {/* Main Navbar */}
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 0',
          gap: '24px'
        }}>
          {/* Mobile Menu Button */}
          <button
            className="btn-icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ display: 'none' }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '2px'
          }}>
            LUXE
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            gap: '32px',
            flex: 1,
            justifyContent: 'center'
          }}>
            <Link to="/shop?category=women" style={{
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              Women
            </Link>
            <Link to="/shop?category=men" style={{
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              Men
            </Link>
            <Link to="/shop?category=accessories" style={{
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              Accessories
            </Link>
            <Link to="/shop" style={{
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: 'var(--accent)'
            }}>
              Sale
            </Link>
          </div>

          {/* Action Icons */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              className="btn-icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {user ? (
              <div style={{ position: 'relative', display: 'flex', gap: '16px' }}>
                <Link to="/wishlist" className="btn-icon" aria-label="Wishlist">
                  <Heart size={20} />
                </Link>

                <Link to="/cart" className="btn-icon" style={{ position: 'relative' }}>
                  <ShoppingBag size={20} />
                  {getCartCount() > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      backgroundColor: 'var(--accent)',
                      color: 'var(--primary)',
                      fontSize: '10px',
                      fontWeight: 700,
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {getCartCount()}
                    </span>
                  )}
                </Link>

                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <button className="btn-icon" aria-label="Account">
                    <User size={20} />
                  </button>
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    backgroundColor: 'white',
                    boxShadow: 'var(--shadow-lg)',
                    borderRadius: '4px',
                    minWidth: '180px',
                    opacity: 0,
                    visibility: 'hidden',
                    transition: 'var(--transition)',
                    zIndex: 10
                  }}
                  className="user-dropdown">
                    <Link to="/account" style={{
                      display: 'block',
                      padding: '12px 16px',
                      fontSize: '14px',
                      borderBottom: '1px solid var(--border)'
                    }}>
                      My Account
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" style={{
                        display: 'block',
                        padding: '12px 16px',
                        fontSize: '14px',
                        borderBottom: '1px solid var(--border)'
                      }}>
                        Admin Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '14px',
                      textAlign: 'left',
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary)'
                    }}>
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ padding: '10px 24px' }}>
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div style={{
            padding: '16px 0',
            borderTop: '1px solid var(--border)',
            animation: 'slideDown 0.3s ease'
          }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="input"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          nav > div > div > div:nth-child(3) {
            display: none;
          }
          nav > div > div > button:first-child {
            display: flex !important;
          }
        }
        
        .user-dropdown:hover,
        .btn-icon:hover + .user-dropdown {
          opacity: 1;
          visibility: visible;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;