import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
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

  const navItems = [
    { to: '/shop', label: 'ALL PRODUCTS' },
    { to: '/shop?sort=newest', label: 'NEW ARRIVALS' },
    { to: '/shop?sort=popular', label: 'BEST SELLERS' },
    { to: '/shop?category=accessories', label: 'ACCESSORIES' },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      background: '#0a0e12',
      borderBottom: '1px solid #1f2429',
      zIndex: 1000
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
          gap: '32px'
        }}>
          
          {/* Logo */}
          <Link to="/" style={{
            fontSize: '20px',
            fontWeight: 600,
            letterSpacing: '1.5px',
            color: '#d4a65c',
            textTransform: 'uppercase'
          }}>
            ISOTÉ
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            gap: '40px',
            flex: 1,
            justifyContent: 'center'
          }}
          className="desktop-only"
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  color: '#e8e8e8',
                  textTransform: 'uppercase',
                  position: 'relative',
                  transition: 'color 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#e8e8e8',
                transition: 'all 0.3s ease'
              }}
              className="icon-btn"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link 
              to="/cart" 
              style={{ position: 'relative', display: 'flex' }}
            >
              <button style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#e8e8e8',
                transition: 'all 0.3s ease'
              }}
              className="icon-btn"
              >
                <ShoppingBag size={20} />
              </button>
              {getCartCount() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: '#d4a65c',
                  color: '#0a0e12',
                  fontSize: '10px',
                  fontWeight: 700,
                  minWidth: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px'
                }}>
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Account */}
            {user ? (
              <div className="user-menu" style={{ position: 'relative' }}>
                <button style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#e8e8e8',
                  transition: 'all 0.3s ease'
                }}
                className="icon-btn"
                >
                  <User size={20} />
                </button>
                <div className="dropdown" style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: '#1a1f26',
                  border: '1px solid #2a3038',
                  minWidth: '220px',
                  opacity: 0,
                  visibility: 'hidden',
                  transform: 'translateY(-8px)',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)'
                }}>
                  <div style={{
                    padding: '16px',
                    borderBottom: '1px solid #2a3038'
                  }}>
                    <p style={{ 
                      fontSize: '13px',
                      fontWeight: 600,
                      marginBottom: '4px',
                      color: '#e8e8e8'
                    }}>
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>
                      {user?.email}
                    </p>
                  </div>
                  <Link to="/account" style={{
                    display: 'block',
                    padding: '12px 16px',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: '1px solid #2a3038',
                    color: '#e8e8e8',
                    transition: 'all 0.2s ease'
                  }}
                  className="dropdown-link"
                  >
                    My Account
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" style={{
                      display: 'block',
                      padding: '12px 16px',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid #2a3038',
                      color: '#d4a65c',
                      fontWeight: 500,
                      transition: 'all 0.2s ease'
                    }}
                    className="dropdown-link"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={() => { logout(); navigate('/'); }} style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#e8e8e8',
                    transition: 'all 0.2s ease'
                  }}
                  className="dropdown-link"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '1px',
                color: '#e8e8e8',
                textTransform: 'uppercase',
                padding: '8px 20px',
                border: '1px solid #2a3038',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease'
              }}
              className="sign-in-btn"
              >
                SIGN IN
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-only"
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#e8e8e8',
                marginLeft: '8px'
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div style={{
            padding: '0 0 20px 0',
            animation: 'fadeIn 0.2s ease'
          }}>
            <form onSubmit={handleSearch} style={{
              display: 'flex',
              gap: '12px',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: '#151a20',
                  border: '1px solid #2a3038',
                  color: '#e8e8e8',
                  fontSize: '14px'
                }}
              />
              <button type="submit" className="btn btn-primary" style={{
                padding: '12px 24px',
                fontSize: '12px'
              }}>
                SEARCH
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-only" style={{
          background: '#0a0e12',
          borderTop: '1px solid #1f2429',
          padding: '20px 0'
        }}>
          <div className="container">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  color: '#e8e8e8',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid #1f2429'
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #d4a65c;
          transition: width 0.3s ease;
        }
        
        .nav-link:hover {
          color: #d4a65c;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .icon-btn:hover {
          color: #d4a65c;
        }
        
        .sign-in-btn:hover {
          background: #151a20;
          border-color: #d4a65c;
          color: #d4a65c;
        }
        
        .user-menu:hover .dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .dropdown-link:hover {
          background: #242a32;
          color: #d4a65c !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;