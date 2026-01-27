import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, LogOut, Sparkles } from 'lucide-react';
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
      background: 'linear-gradient(180deg, rgba(26, 35, 50, 0.98) 0%, rgba(45, 62, 80, 0.96) 100%)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(212, 165, 116, 0.15)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)',
      zIndex: 1000
    }}>
      {/* Elegant Top Banner */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(255, 107, 90, 0.15) 0%, rgba(90, 141, 142, 0.15) 50%, rgba(212, 165, 116, 0.15) 100%)',
        color: 'var(--text-primary)',
        textAlign: 'center',
        padding: '8px',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.15em',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 165, 116, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <span style={{ opacity: 0.7 }}>✦</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '12px' }}>
            Complimentary delivery on orders above $100
          </span>
          <span style={{ opacity: 0.7 }}>✦</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px 0',
          gap: '48px'
        }}>
          {/* Logo - Elegant Script */}
          <Link to="/" style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
            fontSize: '52px',
            fontWeight: 300,
            letterSpacing: '0.08em',
            background: 'linear-gradient(135deg, #ff8c75 0%, #d4a574 50%, #8ca89d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 8px rgba(255, 107, 90, 0.3))',
            transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
            position: 'relative',
            fontStyle: 'italic'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.filter = 'drop-shadow(0 4px 16px rgba(255, 107, 90, 0.5))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.filter = 'drop-shadow(0 2px 8px rgba(255, 107, 90, 0.3))';
          }}
          >
            Isoté
          </Link>

          {/* Desktop Navigation - Refined Categories */}
          <div style={{
            display: 'flex',
            gap: '48px',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {[
              { to: '/shop?featured=new', label: 'New Arrivals' },
              { to: '/shop?featured=popular', label: 'Most Popular' },
              { to: '/shop?category=accessories', label: 'Accessories' },
              { to: '/shop', label: 'Collection', special: true }
            ].map((link, idx) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '15px',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  color: link.special ? 'var(--accent-coral)' : 'var(--text-primary)',
                  position: 'relative',
                  padding: '8px 0',
                  transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = link.special ? 'var(--accent-coral-light)' : 'var(--accent-gold)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = link.special ? 'var(--accent-coral)' : 'var(--text-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {link.label}
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '1px',
                  background: link.special ? 'var(--accent-coral)' : 'var(--accent-gold)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'right',
                  transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scaleX(1)';
                  e.target.style.transformOrigin = 'left';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scaleX(0)';
                  e.target.style.transformOrigin = 'right';
                }}
                />
              </Link>
            ))}
          </div>

          {/* Action Icons */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Search */}
            <button
              className="btn-icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
              style={{
                background: isSearchOpen ? 'rgba(255, 107, 90, 0.15)' : 'transparent',
                color: isSearchOpen ? 'var(--accent-coral)' : 'var(--text-primary)',
                border: `1px solid ${isSearchOpen ? 'var(--accent-coral)' : 'transparent'}`
              }}
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <Link 
              to={user ? "/wishlist" : "/login"} 
              className="btn-icon" 
              aria-label="Wishlist"
              style={{
                background: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid transparent'
              }}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  navigate('/login');
                }
              }}
            >
              <Heart size={18} />
            </Link>

            {/* Cart */}
            <Link 
              to="/cart" 
              style={{ position: 'relative' }}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  navigate('/login');
                }
              }}
            >
              <button className="btn-icon" style={{
                background: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid transparent'
              }}>
                <ShoppingBag size={18} />
              </button>
              {getCartCount() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: 'var(--gradient-sunset)',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 700,
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(255, 107, 90, 0.4)',
                  border: '1px solid var(--bg-card)'
                }}>
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="user-menu" style={{ position: 'relative' }}>
                <button className="btn-icon" aria-label="Account" style={{
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1px solid transparent'
                }}>
                  <User size={18} />
                </button>
                <div className="dropdown" style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  right: 0,
                  background: 'rgba(42, 58, 74, 0.98)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                  borderRadius: '4px',
                  minWidth: '240px',
                  opacity: 0,
                  visibility: 'hidden',
                  transform: 'translateY(-8px)',
                  transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                  overflow: 'hidden',
                  border: '1px solid rgba(212, 165, 116, 0.2)'
                }}>
                  <div style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(255, 107, 90, 0.1) 0%, rgba(90, 141, 142, 0.1) 100%)',
                    borderBottom: '1px solid rgba(212, 165, 116, 0.2)'
                  }}>
                    <p style={{ 
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 500, 
                      marginBottom: '4px', 
                      fontSize: '16px', 
                      letterSpacing: '0.03em' 
                    }}>
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p style={{ fontSize: '12px', opacity: 0.7, letterSpacing: '0.02em' }}>
                      {user?.email}
                    </p>
                  </div>
                  <Link to="/account" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 20px',
                    fontSize: '13px',
                    fontWeight: 500,
                    borderBottom: '1px solid rgba(212, 165, 116, 0.1)',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.03em',
                    fontFamily: "'Cormorant Garamond', serif"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 107, 90, 0.08)';
                    e.currentTarget.style.paddingLeft = '28px';
                    e.currentTarget.style.color = 'var(--accent-coral)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.paddingLeft = '20px';
                    e.currentTarget.style.color = 'inherit';
                  }}
                  >
                    <User size={14} /> My Account
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px 20px',
                      fontSize: '13px',
                      fontWeight: 600,
                      borderBottom: '1px solid rgba(212, 165, 116, 0.1)',
                      background: 'rgba(90, 141, 142, 0.1)',
                      color: 'var(--accent-teal)',
                      transition: 'all 0.3s ease',
                      letterSpacing: '0.05em',
                      fontFamily: "'Cormorant Garamond', serif"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(90, 141, 142, 0.2)';
                      e.currentTarget.style.paddingLeft = '28px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(90, 141, 142, 0.1)';
                      e.currentTarget.style.paddingLeft = '20px';
                    }}
                    >
                      <Sparkles size={14} /> Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '16px 20px',
                    fontSize: '13px',
                    fontWeight: 500,
                    textAlign: 'left',
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.03em',
                    fontFamily: "'Cormorant Garamond', serif"
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
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline" style={{ 
                padding: '10px 28px',
                fontSize: '12px',
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '0.08em',
                borderColor: 'var(--accent-gold)',
                color: 'var(--accent-gold)'
              }}>
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Elegant Search Bar */}
        {isSearchOpen && (
          <div style={{
            padding: '0 0 28px 0',
            animation: 'fadeIn 0.4s ease'
          }}>
            <form onSubmit={handleSearch} style={{
              display: 'flex',
              gap: '16px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Search our collection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    background: 'rgba(42, 58, 74, 0.6)',
                    border: '1px solid rgba(212, 165, 116, 0.3)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    fontSize: '14px',
                    fontWeight: 400,
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: '0.02em'
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ 
                padding: '12px 32px',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '13px',
                letterSpacing: '0.05em'
              }}>
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
        
        @media (max-width: 968px) {
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