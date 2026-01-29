import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, Shield, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  // NO AUTH CHECKS - Anyone can access this page
  // Only check if cart is empty
  if (!cart || cart.length === 0) {
    return (
      <div style={{ 
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #1a2332 0%, #2d3e50 100%)',
        padding: '40px 20px'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '60px 40px',
          maxWidth: '500px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 28px',
            borderRadius: '50%',
            background: 'rgba(255, 107, 90, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--accent-coral)'
          }}>
            <Shield size={40} color="var(--accent-coral)" />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '32px',
            fontWeight: 400,
            marginBottom: '16px',
            fontStyle: 'italic',
            color: 'var(--text-primary)'
          }}>
            Your Cart is Empty
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '16px',
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            lineHeight: 1.7
          }}>
            Add items to your cart to proceed with checkout
          </p>
          <Link to="/shop" className="btn btn-primary" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '15px',
            padding: '16px 48px',
            letterSpacing: '0.08em',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19);
      setFormData({ ...formData, [name]: formatted });
    }
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').substring(0, 5);
      setFormData({ ...formData, [name]: formatted });
    }
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').substring(0, 3);
      setFormData({ ...formData, [name]: formatted });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.address.trim()) newErrors.address = 'Required';
    if (!formData.city.trim()) newErrors.city = 'Required';
    if (!formData.state.trim()) newErrors.state = 'Required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Required';
    
    const cardNum = formData.cardNumber.replace(/\s/g, '');
    if (!cardNum) newErrors.cardNumber = 'Required';
    else if (cardNum.length < 16) newErrors.cardNumber = 'Invalid';
    
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Required';
    else if (formData.expiryDate.length < 5) newErrors.expiryDate = 'Invalid';
    
    if (!formData.cvv.trim()) newErrors.cvv = 'Required';
    else if (formData.cvv.length < 3) newErrors.cvv = 'Invalid';
    
    if (!formData.cardName.trim()) newErrors.cardName = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await clearCart();
      
      const notification = document.createElement('div');
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 24px;
          right: 24px;
          background: linear-gradient(135deg, #5a8d8e 0%, #4a7d7e 100%);
          color: white;
          padding: 20px 28px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          z-index: 10000;
          animation: slideIn 0.4s ease;
          font-family: 'Cormorant Garamond', serif;
          max-width: 90vw;
        ">
          <div style="display: flex; align-items: center; gap: 12px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <div>
              <div style="font-weight: 600; margin-bottom: 2px;">Order Confirmed!</div>
              <div style="font-size: 13px; opacity: 0.9;">Thank you for your purchase</div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
        navigate('/');
      }, 2500);
      
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '40px 20px 80px', 
      background: 'linear-gradient(180deg, #1a2332 0%, #2d3e50 100%)',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <Link to="/cart" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '14px',
          color: '#8ca89d',
          marginBottom: '24px',
          textDecoration: 'none'
        }}>
          <ArrowLeft size={16} />
          Back to Cart
        </Link>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(28px, 5vw, 42px)',
          fontWeight: 400,
          marginBottom: '32px',
          letterSpacing: '0.02em',
          color: 'var(--text-primary)'
        }}>
          Checkout
        </h1>

        {!user && (
          <div style={{
            padding: '16px 20px',
            background: 'rgba(90, 141, 142, 0.08)',
            border: '1px solid rgba(90, 141, 142, 0.2)',
            borderRadius: '6px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '14px',
              color: '#8ca89d',
              margin: 0
            }}>
              Checkout as guest or <Link to="/login" style={{ color: '#5a8d8e', textDecoration: 'underline' }}>sign in</Link>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: '32px'
          }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Contact */}
              <div style={{ 
                padding: '28px', 
                background: 'rgba(42, 58, 74, 0.4)',
                borderRadius: '8px',
                border: '1px solid rgba(212, 165, 116, 0.15)'
              }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '20px',
                  fontWeight: 500,
                  marginBottom: '20px',
                  color: 'var(--text-primary)'
                }}>
                  Contact
                </h2>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          background: 'rgba(26, 35, 50, 0.6)',
                          border: errors.firstName ? '1px solid #ff6b5a' : '1px solid rgba(212, 165, 116, 0.2)',
                          borderRadius: '4px',
                          color: 'white',
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '15px'
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          background: 'rgba(26, 35, 50, 0.6)',
                          border: errors.lastName ? '1px solid #ff6b5a' : '1px solid rgba(212, 165, 116, 0.2)',
                          borderRadius: '4px',
                          color: 'white',
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '15px'
                        }}
                      />
                    </div>
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(26, 35, 50, 0.6)',
                      border: errors.email ? '1px solid #ff6b5a' : '1px solid rgba(212, 165, 116, 0.2)',
                      borderRadius: '4px',
                      color: 'white',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '15px'
                    }}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(26, 35, 50, 0.6)',
                      border: errors.phone ? '1px solid #ff6b5a' : '1px solid rgba(212, 165, 116, 0.2)',
                      borderRadius: '4px',
                      color: 'white',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '15px'
                    }}
                  />
                </div>
              </div>

              {/* Shipping */}
              <div style={{ 
                padding: '28px', 
                background: 'rgba(42, 58, 74, 0.4)',
                borderRadius: '8px',
                border: '1px solid rgba(212, 165, 116, 0.15)'
              }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '20px',
                  fontWeight: 500,
                  marginBottom: '20px',
                  color: 'var(--text-primary)'
                }}>
                  Shipping
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(26, 35, 50, 0.6)',
                      border: errors.address ? '1px solid #ff6b5a' : '1px solid rgba(212, 165, 116, 0.2)',
                      borderRadius: '4px',
                      color: 'white',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '15px'
                    }}
                  />
                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.apartment}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(26, 35, 50, 0.6)',
                      border: '1px solid rgba(212, 165, 116, 0.2)',
                      borderRadius: '4px',
                      color: 'white',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '15px'
                    }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'rgba(26, 35, 50, 0.6)',
                        border: errors.city ? '1px solid #ff6b5a' : '1px solid rgba(212, 165, 116, 0.2)',
                        borderRadius: '4px',
                        color: 'white',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '15px'
                      }}
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'rgba(26, 35, 50, 0.6)',
                        border: errors.state ? '1px solid #ff6b5a' : '1px solid rgba(212, 165, 116, 0.2)',
                        borderRadius: '4px',
                        color: 'white',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '15px'
                      }}
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP"
                      value={formData.zipCode}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'rgba(26, 35, 50, 0.6)',
                        border: errors.zipCode ? '1px solid #ff6b5a' : '1px solid rgba(212, 165, 116, 0.2)',
                        borderRadius: '4px',
                        color: 'white',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '15px'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div style={{ 
                padding: '28px', 
                background: 'rgba(42, 58, 74, 0.4)',
                borderRadius: '8px',
                border: '1px solid rgba(212, 165, 116, 0.15)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <Lock size={18} color="#d4a574" />
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '20px',
                    fontWeight: 500,
                    margin: 0,
                    color: 'var(--text-primary)'
                  }}>
                    Payment
                  </h2>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card number"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        paddingRight: '45px',
                        background: 'rgba(26, 35, 50, 0.6)',
                        border: errors.cardNumber ? '1px solid #ff6b5a' : '1px solid rgba(212, 165, 116, 0.2)',
                        borderRadius: '4px',
                        color: 'white',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '15px'
                      }}
                    />
                    <CreditCard size={18} style={{ 
                      position: 'absolute', 
                      right: '14px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: '#8ca89d',
                      pointerEvents: 'none'
                    }} />
                  </div>
                  
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Cardholder name"
                    value={formData.cardName}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(26, 35, 50, 0.6)',
                      border: errors.cardName ? '1px solid #ff6b5a' : '1px solid rgba(212, 165, 116, 0.2)',
                      borderRadius: '4px',
                      color: 'white',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '15px'
                    }}
                  />
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'rgba(26, 35, 50, 0.6)',
                        border: errors.expiryDate ? '1px solid #ff6b5a' : '1px solid rgba(212, 165, 116, 0.2)',
                        borderRadius: '4px',
                        color: 'white',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '15px'
                      }}
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'rgba(26, 35, 50, 0.6)',
                        border: errors.cvv ? '1px solid #ff6b5a' : '1px solid rgba(212, 165, 116, 0.2)',
                        borderRadius: '4px',
                        color: 'white',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '15px'
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{ 
                    width: '100%',
                    marginTop: '24px',
                    padding: '16px',
                    background: loading ? '#4a7d7e' : 'linear-gradient(135deg, #5a8d8e 0%, #4a7d7e 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '16px',
                    fontWeight: 500,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    letterSpacing: '0.03em',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite'
                      }} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Complete Order
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div style={{ 
                padding: '28px', 
                background: 'rgba(42, 58, 74, 0.4)',
                borderRadius: '8px',
                border: '1px solid rgba(212, 165, 116, 0.15)',
                position: 'sticky',
                top: '20px'
              }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '20px',
                  fontWeight: 500,
                  marginBottom: '20px',
                  color: 'var(--text-primary)'
                }}>
                  Order Summary
                </h2>

                <div style={{ marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                  {cart.map((item) => (
                    <div key={item._id} style={{
                      display: 'flex',
                      gap: '12px',
                      marginBottom: '16px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid rgba(212, 165, 116, 0.1)'
                    }}>
                      <img
                        src={item.product.images?.[0] || '/placeholder.png'}
                        alt={item.product.name}
                        style={{
                          width: '60px',
                          height: '75px',
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p style={{ 
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '14px', 
                          fontWeight: 500, 
                          marginBottom: '4px',
                          color: 'var(--text-primary)'
                        }}>
                          {item.product.name}
                        </p>
                        <p style={{ fontSize: '12px', color: '#8ca89d', marginBottom: '6px' }}>
                          Qty: {item.quantity} {item.size && `• ${item.size}`}
                        </p>
                        <p style={{ 
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '15px', 
                          fontWeight: 600,
                          color: 'var(--text-primary)'
                        }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: '#8ca89d' }}>Subtotal</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--text-primary)' }}>${subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: '#8ca89d' }}>Shipping</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: shipping === 0 ? '#5a8d8e' : 'var(--text-primary)' }}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: '#8ca89d' }}>Tax</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--text-primary)' }}>${tax.toFixed(2)}</span>
                  </div>

                  <div style={{ height: '1px', background: 'rgba(212, 165, 116, 0.2)', margin: '16px 0' }} />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '20px',
                    fontWeight: 600
                  }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--text-primary)' }}>Total</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--text-primary)' }}>${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && subtotal < 100 && (
                  <div style={{
                    padding: '10px',
                    background: 'rgba(212, 165, 116, 0.08)',
                    border: '1px solid rgba(212, 165, 116, 0.2)',
                    borderRadius: '4px',
                    fontSize: '12px',
                    textAlign: 'center',
                    fontFamily: "'Cormorant Garamond', serif",
                    color: '#d4a574'
                  }}>
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
          
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(100px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          input::placeholder {
            color: #8ca89d;
            opacity: 0.6;
          }
          
          input:focus {
            outline: none;
            border-color: #5a8d8e !important;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Checkout;