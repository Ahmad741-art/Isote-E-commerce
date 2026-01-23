import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, LogOut, Sword, Shield, Flame } from 'lucide-react';
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
      background: 'linear-gradient(180deg, rgba(22, 33, 62, 0.98) 0%, rgba(15, 15, 30, 0.98) 100%)',
      backdropFilter: 'blur(20px)',
      borderBottom: '3px solid var(--accent)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.8), inset 0 -1px 0 rgba(201, 169, 97, 0.3)',
      zIndex: 1000
    }}>
      {/* Battle Banner */}
      <div style={{
        background: 'var(--gradient-2)',
        color: 'white',
        textAlign: 'center',
        padding: '12px',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '2.5px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '2px solid var(--accent)'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
        }} />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          position: 'relative'
        }}>
          <Sword size={18} />
          <span>⚔️ LEGENDARY COLLECTION | FREE DELIVERY ON CONQUESTS OVER $100 ⚔️</span>
          <Shield size={18} />
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 0',
          gap: '40px'
        }}>
          {/* Epic Logo */}
          <Link to="/" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '48px',
            fontWeight: 900,
            letterSpacing: '4px',
            background: 'var(--gradient-1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(201, 169, 97, 0.6))',
            transition: 'var(--transition)',
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.filter = 'drop-shadow(0 0 30px rgba(201, 169, 97, 1))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(201, 169, 97, 0.6))';
          }}
          >
            <Shield size={40} style={{ color: 'var(--accent)' }} />
            LUXE
            <Sword size={36} style={{ color: 'var(--accent)', transform: 'rotate(-45deg)' }} />
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            gap: '48px',
            flex: 1,
            justifyContent: 'center'
          }}>
            {[
              { to: '/shop?category=women', label: 'QUEENS', icon: '👑' },
              { to: '/shop?category=men', label: 'WARRIORS', icon: '⚔️' },
              { to: '/shop?category=accessories', label: 'ARMORY', icon: '🛡️' },
              { to: '/shop', label: 'CONQUEST', special: true, icon: '🔥' }
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  color: link.special ? 'var(--accent)' : 'var(--text-primary)',
                  position: 'relative',
                  padding: '12px 20px',
                  transition: 'var(--transition)',
                  border: '2px solid transparent',
                  borderRadius: '4px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.background = 'rgba(201, 169, 97, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(201, 169, 97, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{ marginRight: '8px' }}>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Icons */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              className="btn-icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
              style={{
                background: isSearchOpen ? 'var(--gradient-1)' : 'var(--bg-card)',
                color: isSearchOpen ? 'var(--text-dark)' : 'var(--accent)'
              }}
            >
              <Search size={20} />
            </button>

            {user ? (
              <div style={{ position: 'relative', display: 'flex', gap: '12px' }}>
                <Link to="/wishlist" className="btn-icon forge-glow" aria-label="Wishlist">
                  <Heart size={20} />
                </Link>

                <Link to="/cart" style={{ position: 'relative' }}>
                  <button className="btn-icon forge-glow">
                    <ShoppingBag size={20} />
                  </button>
                  {getCartCount() > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      background: 'var(--gradient-2)',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: 900,
                      minWidth: '26px',
                      height: '26px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-fire)',
                      border: '2px solid var(--accent-red)',
                      animation: 'forge 2s infinite'
                    }}>
                      {getCartCount()}
                    </span>
                  )}
                </Link>

                <div className="user-menu" style={{ position: 'relative' }}>
                  <button className="btn-icon forge-glow" aria-label="Account">
                    <User size={20} />
                  </button>
                  <div className="dropdown steel-border" style={{
                    position: 'absolute',
                    top: 'calc(100% + 16px)',
                    right: 0,
                    background: 'var(--bg-card)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: 'var(--shadow-lg), 0 0 40px rgba(201, 169, 97, 0.3)',
                    borderRadius: '8px',
                    minWidth: '280px',
                    opacity: 0,
                    visibility: 'hidden',
                    transform: 'translateY(-10px)',
                    transition: 'all 0.4s ease',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      padding: '24px',
                      background: 'var(--gradient-1)',
                      color: 'var(--text-dark)',
                      position: 'relative',
                      borderBottom: '3px solid var(--accent-red)'
                    }}>
                      <Shield size={24} style={{ position: 'absolute', top: '12px', right: '12px', opacity: 0.3 }} />
                      <p style={{ fontWeight: 900, marginBottom: '6px', fontSize: '18px', letterSpacing: '1px' }}>
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p style={{ fontSize: '12px', opacity: 0.8, fontWeight: 600 }}>
                        {user?.email}
                      </p>
                    </div>
                    <Link to="/account" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '18px 24px',
                      fontSize: '14px',
                      fontWeight: 600,
                      borderBottom: '2px solid var(--border)',
                      transition: 'var(--transition)',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(201, 169, 97, 0.1)';
                      e.currentTarget.style.paddingLeft = '32px';
                      e.currentTarget.style.borderLeftColor = 'var(--accent)';
                      e.currentTarget.style.borderLeftWidth = '4px';
                      e.currentTarget.style.borderLeftStyle = 'solid';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.paddingLeft = '24px';
                      e.currentTarget.style.borderLeft = 'none';
                    }}
                    >
                      <User size={16} /> MY PROFILE
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '18px 24px',
                        fontSize: '14px',
                        fontWeight: 700,
                        borderBottom: '2px solid var(--border)',
                        background: 'rgba(139, 0, 0, 0.15)',
                        color: 'var(--accent)',
                        transition: 'var(--transition)',
                        letterSpacing: '1px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(139, 0, 0, 0.25)';
                        e.currentTarget.style.paddingLeft = '32px';
                        e.currentTarget.style.borderLeftColor = 'var(--accent-red)';
                        e.currentTarget.style.borderLeftWidth = '4px';
                        e.currentTarget.style.borderLeftStyle = 'solid';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(139, 0, 0, 0.15)';
                        e.currentTarget.style.paddingLeft = '24px';
                        e.currentTarget.style.borderLeft = 'none';
                      }}
                      >
                        <Shield size={16} /> COMMAND CENTER
                      </Link>
                    )}
                    <button onClick={handleLogout} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                      padding: '18px 24px',
                      fontSize: '14px',
                      fontWeight: 600,
                      textAlign: 'left',
                      background: 'transparent',
                      color: 'var(--text-primary)',
                      transition: 'var(--transition)',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 107, 107, 0.15)';
                      e.currentTarget.style.color = '#ff6b6b';
                      e.currentTarget.style.paddingLeft = '32px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.paddingLeft = '24px';
                    }}
                    >
                      <LogOut size={16} />
                      RETREAT
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ padding: '14px 36px' }}>
                <Shield size={18} />
                ENTER
              </Link>
            )}
          </div>
        </div>

        {/* Epic Search Bar */}
        {isSearchOpen && (
          <div style={{
            padding: '0 0 28px 0',
            animation: 'fadeIn 0.5s ease'
          }}>
            <form onSubmit={handleSearch} style={{
              display: 'flex',
              gap: '16px',
              maxWidth: '800px',
              margin: '0 auto',
              position: 'relative'
            }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Search the realm for legendary items... ⚔️"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    background: 'var(--bg-card)',
                    border: '3px solid var(--accent)',
                    boxShadow: '0 0 30px rgba(201, 169, 97, 0.3), inset 0 2px 8px rgba(0, 0, 0, 0.5)',
                    fontSize: '15px',
                    fontWeight: 600
                  }}
                />
                <Flame size={22} style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--accent-red)',
                  animation: 'forge 2s infinite'
                }} />
              </div>
              <button type="submit" className="btn btn-accent" style={{ padding: '16px 40px' }}>
                <Search size={20} />
                QUEST
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