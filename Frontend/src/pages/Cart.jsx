import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal, loading } = useCart();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="loading" style={{ minHeight: '60vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <ShoppingBag size={64} style={{ margin: '0 auto 24px', color: 'var(--text-light)' }} />
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            marginBottom: '16px'
          }}>
            Your Cart is Empty
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            fontSize: '16px'
          }}>
            Looks like you haven't added anything to your cart yet
          </p>
          <Link to="/shop" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '48px 0', backgroundColor: 'var(--bg-secondary)', minHeight: '60vh' }}>
      <div className="container">
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5vw, 42px)',
          marginBottom: '40px'
        }}>
          Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cart.map((item) => (
              <div
                key={item._id}
                className="card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  gap: '24px',
                  backgroundColor: 'white'
                }}
              >
                {/* Product Image */}
                <Link
                  to={`/product/${item.product._id}`}
                  style={{
                    width: '120px',
                    height: '160px',
                    flexShrink: 0,
                    overflow: 'hidden',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-secondary)'
                  }}
                >
                  <img
                    src={item.product.images?.[0] || '/placeholder.png'}
                    alt={item.product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Link>

                {/* Product Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <Link
                      to={`/product/${item.product._id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        marginBottom: '4px'
                      }}>
                        {item.product.name}
                      </h3>
                    </Link>
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--text-light)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {item.product.category}
                    </p>
                  </div>

                  {item.size && (
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      Size: <strong>{item.size}</strong>
                    </p>
                  )}

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto'
                  }}>
                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="btn-icon"
                        style={{
                          width: '32px',
                          height: '32px',
                          border: '1px solid var(--border)'
                        }}
                      >
                        <Minus size={16} />
                      </button>
                      <span style={{ fontSize: '16px', fontWeight: 600, width: '40px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="btn-icon"
                        style={{
                          width: '32px',
                          height: '32px',
                          border: '1px solid var(--border)'
                        }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right' }}>
                      <p style={{
                        fontSize: '20px',
                        fontWeight: 700
                      }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: '13px',
                        color: 'var(--text-light)'
                      }}>
                        ${item.product.price.toFixed(2)} each
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="btn-icon"
                      style={{ color: 'var(--error)' }}
                      aria-label="Remove from cart"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="card" style={{ padding: '32px', backgroundColor: 'white' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                marginBottom: '24px'
              }}>
                Order Summary
              </h2>

              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontSize: '15px'
                }}>
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontSize: '15px'
                }}>
                  <span>Shipping</span>
                  <span>{getCartTotal() >= 100 ? 'FREE' : '$9.99'}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontSize: '15px',
                  color: 'var(--text-secondary)'
                }}>
                  <span>Tax (estimated)</span>
                  <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>

                <div className="divider" />

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '20px',
                  fontWeight: 700
                }}>
                  <span>Total</span>
                  <span>
                    ${(getCartTotal() + (getCartTotal() >= 100 ? 0 : 9.99) + getCartTotal() * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              {getCartTotal() < 100 && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#fff3cd',
                  border: '1px solid #ffc107',
                  borderRadius: '4px',
                  fontSize: '13px',
                  marginBottom: '24px',
                  textAlign: 'center'
                }}>
                  Add ${(100 - getCartTotal()).toFixed(2)} more for FREE shipping!
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  fontSize: '16px',
                  padding: '18px',
                  marginBottom: '12px'
                }}
              >
                Proceed to Checkout
              </button>

              <Link to="/shop" style={{
                display: 'block',
                textAlign: 'center',
                fontSize: '14px',
                color: 'var(--text-secondary)',
                marginTop: '16px'
              }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 968px) {
            div[style*="grid-template-columns: 1fr 400px"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Cart;