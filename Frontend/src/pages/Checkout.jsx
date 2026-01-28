import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, Shield, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    // Contact Information
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    
    // Shipping Address
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  // Don't redirect if cart is empty - just show message
  if (cart.length === 0) {
    return (
      <div style={{ 
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)'
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
            fontStyle: 'italic'
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
            Add some beautiful pieces to your cart before checking out
          </p>
          <Link to="/shop" className="btn btn-primary" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '15px',
            padding: '16px 48px',
            letterSpacing: '0.08em'
          }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Only redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      alert('Please sign in to continue with checkout');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19);
      setFormData({ ...formData, [name]: formatted });
    }
    // Format expiry date
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').substring(0, 5);
      setFormData({ ...formData, [name]: formatted });
    }
    // Format CVV
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').substring(0, 3);
      setFormData({ ...formData, [name]: formatted });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Contact validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name required';
    if (!formData.email.trim()) newErrors.email = 'Email required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone required';
    
    // Address validation
    if (!formData.address.trim()) newErrors.address = 'Address required';
    if (!formData.city.trim()) newErrors.city = 'City required';
    if (!formData.state.trim()) newErrors.state = 'State required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code required';
    
    // Payment validation
    const cardNum = formData.cardNumber.replace(/\s/g, '');
    if (!cardNum) {
      newErrors.cardNumber = 'Card number required';
    } else if (cardNum.length < 16) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date required';
    } else if (formData.expiryDate.length < 5) {
      newErrors.expiryDate = 'Invalid expiry date';
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV required';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('[style*="border-color: var(--accent-coral)"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart
      await clearCart();
      
      // Show success notification
      const notification = document.createElement('div');
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 24px;
          right: 24px;
          background: linear-gradient(135deg, rgba(90, 141, 142, 0.98) 0%, rgba(90, 141, 142, 0.95) 100%);
          color: white;
          padding: 24px 32px;
          border-radius: 4px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
          z-index: 10000;
          animation: slideIn 0.5s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-family: 'Cormorant Garamond', serif;
        ">
          <div style="display: flex; align-items: center; gap: 16px; font-size: 16px;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <div>
              <div style="font-weight: 600; margin-bottom: 4px; letter-spacing: 0.03em;">Order Confirmed!</div>
              <div style="font-size: 14px; opacity: 0.9;">Thank you for your purchase</div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
        navigate('/account');
      }, 2500);
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '60px 0 100px', 
      background: 'linear-gradient(180deg, #1a2332 0%, #2d3e50 100%)',
      minHeight: '100vh'
    }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Back to Cart Link */}
        <Link to="/cart" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '14px',
          color: 'var(--text-secondary)',
          marginBottom: '32px',
          transition: 'color 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-coral)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={18} />
          Back to Cart
        </Link>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 300,
          marginBottom: '48px',
          fontStyle: 'italic',
          letterSpacing: '0.03em'
        }}>
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '40px',
            alignItems: 'start'
          }}>
            
            {/* Form Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Contact Information */}
              <div className="card" style={{ padding: '40px', background: 'var(--bg-card)' }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '24px',
                  fontWeight: 400,
                  marginBottom: '24px',
                  letterSpacing: '0.03em'
                }}>
                  Contact Information
                </h2>
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '14px', 
                        marginBottom: '8px'
                      }}>
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="input"
                        value={formData.firstName}
                        onChange={handleChange}
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          borderColor: errors.firstName ? 'var(--accent-coral)' : undefined
                        }}
                      />
                      {errors.firstName && <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>{errors.firstName}</span>}
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '14px', 
                        marginBottom: '8px'
                      }}>
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="input"
                        value={formData.lastName}
                        onChange={handleChange}
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          borderColor: errors.lastName ? 'var(--accent-coral)' : undefined
                        }}
                      />
                      {errors.lastName && <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>{errors.lastName}</span>}
                    </div>
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '14px', 
                      marginBottom: '8px'
                    }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="input"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        borderColor: errors.email ? 'var(--accent-coral)' : undefined
                      }}
                    />
                    {errors.email && <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '14px', 
                      marginBottom: '8px'
                    }}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="input"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        borderColor: errors.phone ? 'var(--accent-coral)' : undefined
                      }}
                    />
                    {errors.phone && <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="card" style={{ padding: '40px', background: 'var(--bg-card)' }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '24px',
                  fontWeight: 400,
                  marginBottom: '24px',
                  letterSpacing: '0.03em'
                }}>
                  Shipping Address
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '14px', 
                      marginBottom: '8px'
                    }}>
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="input"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={handleChange}
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        borderColor: errors.address ? 'var(--accent-coral)' : undefined
                      }}
                    />
                    {errors.address && <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>{errors.address}</span>}
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '14px', 
                      marginBottom: '8px'
                    }}>
                      Apartment, Suite (Optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      className="input"
                      placeholder="Apt 4B"
                      value={formData.apartment}
                      onChange={handleChange}
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '14px', 
                        marginBottom: '8px'
                      }}>
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        className="input"
                        value={formData.city}
                        onChange={handleChange}
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          borderColor: errors.city ? 'var(--accent-coral)' : undefined
                        }}
                      />
                      {errors.city && <span style={{ fontSize: '11px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>{errors.city}</span>}
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '14px', 
                        marginBottom: '8px'
                      }}>
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        className="input"
                        placeholder="CA"
                        value={formData.state}
                        onChange={handleChange}
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          borderColor: errors.state ? 'var(--accent-coral)' : undefined
                        }}
                      />
                      {errors.state && <span style={{ fontSize: '11px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>{errors.state}</span>}
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '14px', 
                        marginBottom: '8px'
                      }}>
                        ZIP *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        className="input"
                        placeholder="90210"
                        value={formData.zipCode}
                        onChange={handleChange}
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          borderColor: errors.zipCode ? 'var(--accent-coral)' : undefined
                        }}
                      />
                      {errors.zipCode && <span style={{ fontSize: '11px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>{errors.zipCode}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="card" style={{ padding: '40px', background: 'var(--bg-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <Lock size={22} color="var(--accent-gold)" />
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '24px',
                    fontWeight: 400,
                    letterSpacing: '0.03em',
                    margin: 0
                  }}>
                    Payment Details
                  </h2>
                </div>
                
                <div style={{
                  padding: '14px',
                  background: 'rgba(90, 141, 142, 0.1)',
                  borderRadius: '4px',
                  border: '1px solid rgba(90, 141, 142, 0.3)',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <Shield size={18} color="var(--accent-teal)" />
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '13px',
                    margin: 0,
                    color: 'var(--accent-teal)'
                  }}>
                    Secure SSL encrypted payment
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '14px', 
                      marginBottom: '8px'
                    }}>
                      Card Number *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        name="cardNumber"
                        className="input"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          borderColor: errors.cardNumber ? 'var(--accent-coral)' : undefined,
                          paddingRight: '48px'
                        }}
                      />
                      <CreditCard size={20} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    </div>
                    {errors.cardNumber && <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>{errors.cardNumber}</span>}
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '14px', 
                      marginBottom: '8px'
                    }}>
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      className="input"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={handleChange}
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        borderColor: errors.cardName ? 'var(--accent-coral)' : undefined
                      }}
                    />
                    {errors.cardName && <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>{errors.cardName}</span>}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '14px', 
                        marginBottom: '8px'
                      }}>
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        className="input"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          borderColor: errors.expiryDate ? 'var(--accent-coral)' : undefined
                        }}
                      />
                      {errors.expiryDate && <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>{errors.expiryDate}</span>}
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '14px', 
                        marginBottom: '8px'
                      }}>
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        className="input"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          borderColor: errors.cvv ? 'var(--accent-coral)' : undefined
                        }}
                      />
                      {errors.cvv && <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>{errors.cvv}</span>}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ 
                    width: '100%',
                    marginTop: '32px',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '15px',
                    padding: '18px',
                    letterSpacing: '0.05em'
                  }}
                >
                  {loading ? (
                    <>
                      <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />
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

            {/* Order Summary - Sticky */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div className="card" style={{ padding: '32px', background: 'var(--bg-card)' }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '22px',
                  fontWeight: 400,
                  marginBottom: '24px',
                  letterSpacing: '0.03em'
                }}>
                  Order Summary
                </h2>

                <div style={{ marginBottom: '24px', maxHeight: '300px', overflowY: 'auto' }}>
                  {cart.map((item) => (
                    <div key={item._id} style={{
                      display: 'flex',
                      gap: '16px',
                      marginBottom: '20px',
                      paddingBottom: '20px',
                      borderBottom: '1px solid var(--border)'
                    }}>
                      <img
                        src={item.product.images?.[0] || '/placeholder.png'}
                        alt={item.product.name}
                        style={{
                          width: '64px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p style={{ 
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '15px', 
                          fontWeight: 500, 
                          marginBottom: '6px'
                        }}>
                          {item.product.name}
                        </p>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                          Qty: {item.quantity} {item.size && `• ${item.size}`}
                        </p>
                        <p style={{ 
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '15px', 
                          fontWeight: 600
                        }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>Subtotal</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>${subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>Shipping</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px', color: 'var(--text-secondary)' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>Tax</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>${tax.toFixed(2)}</span>
                  </div>

                  <div className="divider" style={{ margin: '20px 0' }} />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '22px',
                    fontWeight: 600
                  }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>Total</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && subtotal < 100 && (
                  <div style={{
                    padding: '12px',
                    background: 'rgba(212, 165, 116, 0.1)',
                    border: '1px solid rgba(212, 165, 116, 0.3)',
                    borderRadius: '4px',
                    fontSize: '13px',
                    textAlign: 'center',
                    marginBottom: '16px',
                    fontFamily: "'Cormorant Garamond', serif"
                  }}>
                    Add ${(100 - subtotal).toFixed(2)} for free shipping
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
          
          @media (max-width: 968px) {
            form > div > div[style*="grid-template-columns: 1fr 400px"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Checkout;