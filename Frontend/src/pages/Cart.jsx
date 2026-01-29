import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!user) {
      alert('Please sign in to proceed with checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const handleQuantityChange = (itemId, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty > 0) {
      updateQuantity(itemId, newQty);
    }
  };

  // Empty cart state
  if (!cart || cart.length === 0) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #1a2332 0%, #2d3e50 100%)',
        padding: '60px 20px'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          {/* Empty Cart Icon */}
          <div style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 107, 90, 0.1) 0%, rgba(90, 141, 142, 0.1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(212, 165, 116, 0.3)'
          }}>
            <ShoppingBag size={60} color="var(--accent-gold)" strokeWidth={1.5} />
          </div>

          {/* Empty State Text */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 300,
            marginBottom: '16px',
            fontStyle: 'italic',
            letterSpacing: '0.03em',
            color: 'var(--text-primary)'
          }}>
            Your Cart is Empty
          </h2>
          
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '17px',
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            lineHeight: 1.7,
            letterSpacing: '0.02em'
          }}>
            Discover our curated collection of elegant pieces
            <br />
            and add your favorites to get started
          </p>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link 
              to="/shop"
              className="btn btn-primary"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '15px',
                padding: '16px 48px',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              Start Shopping
              <ArrowRight size={18} />
            </Link>

            <Link 
              to="/shop?sort=newest"
              className="btn btn-outline"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '15px',
                padding: '16px 48px',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                borderColor: 'var(--accent-gold)',
                color: 'var(--accent-gold)'
              }}
            >
              View New Arrivals
            </Link>
          </div>

          {/* Quick Links */}
          <div style={{
            marginTop: '48px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(212, 165, 116, 0.2)'
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '14px',
              color: 'var(--text-muted)',
              marginBottom: '16px',
              letterSpacing: '0.05em'
            }}>
              POPULAR CATEGORIES
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {[
                { to: '/shop?sort=popular', label: 'Most Popular' },
                { to: '/shop?category=accessories', label: 'Accessories' },
                { to: '/wishlist', label: 'My Wishlist' }
              ].map((link, idx) => (
                <Link
                  key={idx}
                  to={link.to}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '14px',
                    color: 'var(--accent-coral)',
                    textDecoration: 'none',
                    padding: '8px 20px',
                    border: '1px solid rgba(255, 107, 90, 0.3)',
                    borderRadius: '4px',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.03em'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 107, 90, 0.1)';
                    e.currentTarget.style.borderColor = 'var(--accent-coral)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255, 107, 90, 0.3)';
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
        `}</style>
      </div>
    );
  }

  // Cart with items
  return (
    <div style={{
      padding: '60px 0 100px',
      background: 'linear-gradient(180deg, #1a2332 0%, #2d3e50 100%)',
      minHeight: '100vh'
    }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '48px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 300,
              marginBottom: '8px',
              fontStyle: 'italic',
              letterSpacing: '0.03em',
              color: 'var(--text-primary)'
            }}>
              Shopping Cart
            </h1>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '16px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em'
            }}>
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your cart?')) {
                  clearCart();
                }
              }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '14px',
                color: 'var(--accent-coral)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                letterSpacing: '0.03em'
              }}
            >
              Clear Cart
            </button>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: '48px',
          alignItems: 'start'
        }}>
          
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cart.map((item) => (
              <div 
                key={item._id}
                className="card"
                style={{
                  padding: '24px',
                  background: 'var(--bg-card)',
                  display: 'flex',
                  gap: '24px',
                  position: 'relative'
                }}
              >
                {/* Product Image */}
                <Link 
                  to={`/product/${item.product._id}`}
                  style={{ flexShrink: 0, textDecoration: 'none' }}
                >
                  <img
                    src={item.product.images?.[0] || '/placeholder.png'}
                    alt={item.product.name}
                    style={{
                      width: '140px',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </Link>

                {/* Product Info */}
                <div style={{ flex: 1 }}>
                  <Link
                    to={`/product/${item.product._id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '22px',
                      fontWeight: 500,
                      marginBottom: '8px',
                      color: 'var(--text-primary)',
                      letterSpacing: '0.02em',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                    >
                      {item.product.name}
                    </h3>
                  </Link>

                  {item.product.description && (
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      marginBottom: '12px',
                      lineHeight: 1.6
                    }}>
                      {item.product.description.substring(0, 100)}
                      {item.product.description.length > 100 && '...'}
                    </p>
                  )}

                  {item.size && (
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '14px',
                      color: 'var(--text-muted)',
                      marginBottom: '16px'
                    }}>
                      Size: <span style={{ color: 'var(--text-primary)' }}>{item.size}</span>
                    </p>
                  )}

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginTop: '16px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      border: '1px solid rgba(212, 165, 116, 0.3)',
                      borderRadius: '4px',
                      padding: '4px'
                    }}>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--text-primary)',
                          transition: 'all 0.3s ease',
                          borderRadius: '2px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(212, 165, 116, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <Minus size={16} />
                      </button>
                      
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '16px',
                        fontWeight: 500,
                        minWidth: '30px',
                        textAlign: 'center',
                        color: 'var(--text-primary)'
                      }}>
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--text-primary)',
                          transition: 'all 0.3s ease',
                          borderRadius: '2px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(212, 165, 116, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '14px',
                      color: 'var(--text-muted)'
                    }}>
                      Quantity
                    </span>
                  </div>
                </div>

                {/* Price & Remove */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  minHeight: '100%'
                }}>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      padding: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-coral)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>

                  <div style={{ textAlign: 'right' }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '24px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '4px'
                    }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    {item.quantity > 1 && (
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '13px',
                        color: 'var(--text-muted)'
                      }}>
                        ${item.product.price.toFixed(2)} each
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - Sticky */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="card" style={{
              padding: '32px',
              background: 'var(--bg-card)'
            }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '24px',
                fontWeight: 400,
                marginBottom: '24px',
                letterSpacing: '0.03em',
                color: 'var(--text-primary)'
              }}>
                Order Summary
              </h2>

              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '15px'
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                  <span style={{ color: 'var(--text-primary)' }}>${subtotal.toFixed(2)}</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '15px'
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                  <span style={{ color: 'var(--text-primary)' }}>
                    {shipping === 0 ? (
                      <span style={{ color: 'var(--accent-teal)' }}>FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '15px'
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Tax (estimated)</span>
                  <span style={{ color: 'var(--text-primary)' }}>${tax.toFixed(2)}</span>
                </div>

                {shipping > 0 && subtotal < 100 && (
                  <div style={{
                    padding: '12px',
                    background: 'rgba(212, 165, 116, 0.1)',
                    border: '1px solid rgba(212, 165, 116, 0.3)',
                    borderRadius: '4px',
                    fontSize: '13px',
                    textAlign: 'center',
                    marginTop: '16px',
                    fontFamily: "'Cormorant Garamond', serif",
                    color: 'var(--accent-gold)'
                  }}>
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}

                <div className="divider" style={{ margin: '20px 0' }} />

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '16px',
                  padding: '18px',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  marginBottom: '12px'
                }}
              >
                Proceed to Checkout
                <ArrowRight size={20} />
              </button>

              {/* Continue Shopping */}
              <Link
                to="/shop"
                className="btn btn-outline"
                style={{
                  width: '100%',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '15px',
                  padding: '14px',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div style={{
                marginTop: '24px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(212, 165, 116, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '13px',
                  color: 'var(--text-secondary)'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Secure SSL Encryption
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '13px',
                  color: 'var(--text-secondary)'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Easy Returns & Exchanges
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
        
        @media (max-width: 968px) {
          div[style*="grid-template-columns: 1fr 420px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;