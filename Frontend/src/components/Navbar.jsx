import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, LogOut, Sparkles, Leaf } from 'lucide-react';
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
      background: 'linear-gradient(180deg, rgba(26, 35, 50, 0.97) 0%, rgba(45, 62, 80, 0.95) 100%)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(212, 165, 116, 0.2)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.6)',
      zIndex: 1000
    }}>
      {/* Elegant banner */}
      <div style={{
        background: 'var(--gradient-sunset)',
        color: 'white',
        textAlign: 'center',
        padding: '10px',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '2px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          position: 'relative'
        }}>
          <Leaf size={16} />
          <span>✨ CURATED COLLECTIONS | FREE DELIVERY OVER $100 ✨</span>
          <Sparkles size={16} />
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0',
          gap: '40px'
        }}>
          {/* Elegant Logo */}
          <Link to="/" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '42px',
            fontWeight: 700,
            letterSpacing: '3px',
            background: 'var(--gradient-sunset)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 15px rgba(255, 107, 90, 0.4))',
            transition: 'var(--transition)',
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.filter = 'drop-shadow(0 0 25px rgba(255, 107, 90, 0.6))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.filter = 'drop-shadow(0 0 15px rgba(255, 107, 90, 0.4))';
          }}
          >
            <Leaf size={32} style={{ color: 'var(--accent-sage)' }} />
            ISOTÉ
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            gap: '40px',
            flex: 1,
            justifyContent: 'center'
          }}>
            {[
              { to: '/shop?category=women', label: 'WOMEN', icon: '🌸' },
              { to: '/shop?category=men', label: 'MEN', icon: '🍃' },
              { to: '/shop?category=accessories', label: 'ACCESSORIES', icon: '✨' },
              { to: '/shop', label: 'COLLECTION', special: true, icon: '🌿' }
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  color: link.special ? 'var(--accent-coral)' : 'var(--text-primary)',
                  position: 'relative',
                  padding: '10px 16px',
                  transition: 'var(--transition)',
                  border: '1px solid transparent',
                  borderRadius: '2px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = link.special ? 'var(--accent-coral)' : 'var(--accent-teal)';
                  e.currentTarget.style.background = link.special 
                    ? 'rgba(255, 107, 90, 0.1)' 
                    : 'rgba(90, 141, 142, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ marginRight: '6px' }}>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Icons */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Search Button */}
            <button
              className="btn-icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
              style={{
                background: isSearchOpen ? 'var(--gradient-sunset)' : 'var(--bg-card)',
                color: isSearchOpen ? 'white' : 'var(--accent-coral)',
                border: `1px solid ${isSearchOpen ? 'var(--accent-coral)' : 'var(--border)'}`
              }}
            >
              <Search size={18} />
            </button>

            {/* Wishlist Button */}
            <Link 
              to={user ? "/wishlist" : "/login"} 
              className="btn-icon soft-glow" 
              aria-label="Wishlist"
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  alert('Please login to view your wishlist');
                  navigate('/login');
                }
              }}
            >
              <Heart size={18} />
            </Link>

            {/* Cart Button */}
            <Link 
              to="/cart" 
              style={{ position: 'relative' }}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  alert('Please login to view your cart');
                  navigate('/login');
                }
              }}
            >
              <button className="btn-icon soft-glow">
                <ShoppingBag size={18} />
              </button>
              {getCartCount() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'var(--gradient-sunset)',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 700,
                  minWidth: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-coral)',
                  border: '2px solid var(--bg-card)'
                }}>
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="user-menu" style={{ position: 'relative' }}>
                <button className="btn-icon soft-glow" aria-label="Account">
                  <User size={18} />
                </button>
                <div className="dropdown organic-border" style={{
                  position: 'absolute',
                  top: 'calc(100% + 14px)',
                  right: 0,
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: 'var(--shadow-lg), 0 0 30px rgba(255, 107, 90, 0.2)',
                  borderRadius: '4px',
                  minWidth: '260px',
                  opacity: 0,
                  visibility: 'hidden',
                  transform: 'translateY(-8px)',
                  transition: 'all 0.4s ease',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '20px',
                    background: 'var(--gradient-3)',
                    color: 'white',
                    position: 'relative',
                    borderBottom: '1px solid rgba(212, 165, 116, 0.3)'
                  }}>
                    <Leaf size={20} style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.4 }} />
                    <p style={{ fontWeight: 700, marginBottom: '5px', fontSize: '16px', letterSpacing: '0.5px' }}>
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p style={{ fontSize: '12px', opacity: 0.9 }}>
                      {user?.email}
                    </p>
                  </div>
                  <Link to="/account" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    borderBottom: '1px solid var(--border)',
                    transition: 'var(--transition)',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 107, 90, 0.1)';
                    e.currentTarget.style.paddingLeft = '28px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.paddingLeft = '20px';
                  }}
                  >
                    <User size={14} /> MY PROFILE
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '16px 20px',
                      fontSize: '13px',
                      fontWeight: 700,
                      borderBottom: '1px solid var(--border)',
                      background: 'rgba(90, 141, 142, 0.12)',
                      color: 'var(--accent-teal)',
                      transition: 'var(--transition)',
                      letterSpacing: '0.8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(90, 141, 142, 0.2)';
                      e.currentTarget.style.paddingLeft = '28px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(90, 141, 142, 0.12)';
                      e.currentTarget.style.paddingLeft = '20px';
                    }}
                    >
                      <Sparkles size={14} /> ADMIN PANEL
                    </Link>
                  )}
                  <button onClick={handleLogout} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '16px 20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    textAlign: 'left',
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    transition: 'var(--transition)',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 107, 90, 0.12)';
                    e.currentTarget.style.color = 'var(--accent-coral)';
                    e.currentTarget.style.paddingLeft = '28px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.paddingLeft = '20px';
                  }}
                  >
                    <LogOut size={14} />
                    SIGN OUT
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ padding: '12px 32px' }}>
                <User size={16} />
                SIGN IN
              </Link>
            )}
          </div>
        </div>

        {/* Elegant Search Bar */}
        {isSearchOpen && (
          <div style={{
            padding: '0 0 24px 0',
            animation: 'fadeIn 0.4s ease'
          }}>
            <form onSubmit={handleSearch} style={{
              display: 'flex',
              gap: '14px',
              maxWidth: '700px',
              margin: '0 auto',
              position: 'relative'
            }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Search for timeless pieces... 🌸"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    background: 'var(--bg-card)',
                    border: '2px solid var(--accent-gold)',
                    boxShadow: '0 0 20px rgba(212, 165, 116, 0.2)',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                />
                <Sparkles size={20} style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--accent-gold)',
                  animation: 'gentleFloat 3s infinite'
                }} />
              </div>
              <button type="submit" className="btn btn-accent" style={{ padding: '14px 36px' }}>
                <Search size={18} />
                SEARCH
              </button>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          nav > div > div > div:nth-child(2) {
            display: none;
          }
        }
        
        .user-menu:hover .dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;