import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, AlertCircle, CheckCircle, ShoppingBag, Truck, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
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

  // Redirect if not authenticated or cart is empty
  useEffect(() => {
    if (!isAuthenticated) {
      alert('Please sign in to proceed with checkout');
      navigate('/login');
    } else if (cart.length === 0) {
      navigate('/cart');
    }
  }, [isAuthenticated, cart, navigate]);

  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData({ ...formData, [name]: formatted });
    }
    // Format expiry date
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2');
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

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    }
    
    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    }
    
    if (step === 3) {
      if (!formData.cardNumber.replace(/\s/g, '').trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Invalid card number';
      }
      
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (formData.expiryDate.length < 5) {
        newErrors.expiryDate = 'Invalid expiry date';
      }
      
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (formData.cvv.length < 3) {
        newErrors.cvv = 'Invalid CVV';
      }
      
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const processStripePayment = async () => {
    // This is a simulated Stripe payment
    // In production, you would use Stripe.js and create a payment intent
    
    setProcessing(true);
    
    // Simulate API call to Stripe
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful payment
        const success = Math.random() > 0.1; // 90% success rate
        if (success) {
          resolve({
            id: 'pi_' + Math.random().toString(36).substring(7),
            status: 'succeeded'
          });
        } else {
          reject(new Error('Payment declined'));
        }
      }, 2000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      return;
    }

    setLoading(true);

    try {
      // Process payment with Stripe
      const paymentResult = await processStripePayment();
      
      if (paymentResult.status === 'succeeded') {
        // Create order
        const orderData = {
          items: cart.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            size: item.size,
            price: item.product.price
          })),
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            apartment: formData.apartment,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country
          },
          contactInfo: {
            email: formData.email,
            phone: formData.phone
          },
          total: total,
          subtotal: subtotal,
          shipping: shipping,
          tax: tax,
          paymentId: paymentResult.id
        };

        try {
          await ordersAPI.create(orderData);
        } catch (orderError) {
          console.warn('Order API failed, but payment succeeded:', orderError);
        }
        
        // Clear cart
        await clearCart();
        
        // Show success message
        showSuccessNotification();
        
        // Redirect to success page
        setTimeout(() => {
          navigate('/account?order=success');
        }, 2000);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      showErrorNotification(error.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
      setProcessing(false);
    }
  };

  const showSuccessNotification = () => {
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
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        animation: slideIn 0.5s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        font-family: 'Cormorant Garamond', serif;
        font-size: 16px;
        max-width: 400px;
      ">
        <div style="display: flex; align-items: center; gap: 16px;">
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
    setTimeout(() => notification.remove(), 3000);
  };

  const showErrorNotification = (message) => {
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 24px;
        right: 24px;
        background: linear-gradient(135deg, rgba(255, 107, 90, 0.98) 0%, rgba(255, 107, 90, 0.95) 100%);
        color: white;
        padding: 24px 32px;
        border-radius: 4px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        animation: slideIn 0.5s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        font-family: 'Cormorant Garamond', serif;
        font-size: 16px;
        max-width: 400px;
      ">
        <div style="display: flex; align-items: start; gap: 16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div>
            <div style="font-weight: 600; margin-bottom: 4px; letter-spacing: 0.03em;">Payment Failed</div>
            <div style="font-size: 14px; opacity: 0.9;">${message}</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div style={{ 
      padding: '60px 0', 
      background: 'linear-gradient(180deg, #1a2332 0%, #2d3e50 100%)',
      minHeight: '100vh'
    }}>
      <div className="container">
        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '48px'
        }}>
          {[
            { num: 1, label: 'Contact' },
            { num: 2, label: 'Shipping' },
            { num: 3, label: 'Payment' }
          ].map((step, idx) => (
            <React.Fragment key={step.num}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: currentStep >= step.num ? 'var(--gradient-sunset)' : 'rgba(255, 255, 255, 0.1)',
                  border: `2px solid ${currentStep >= step.num ? 'var(--accent-coral)' : 'var(--border)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  color: currentStep >= step.num ? 'white' : 'var(--text-muted)',
                  fontSize: '18px',
                  transition: 'all 0.4s ease'
                }}>
                  {step.num}
                </div>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '13px',
                  color: currentStep >= step.num ? 'var(--text-primary)' : 'var(--text-muted)',
                  letterSpacing: '0.05em'
                }}>
                  {step.label}
                </span>
              </div>
              {idx < 2 && (
                <div style={{
                  width: '80px',
                  height: '2px',
                  background: currentStep > step.num ? 'var(--accent-coral)' : 'var(--border)',
                  transition: 'all 0.4s ease',
                  marginTop: '-24px'
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            gap: '40px',
            alignItems: 'start'
          }}>
            {/* Form Section */}
            <div>
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <div className="card" style={{ padding: '40px', background: 'var(--bg-card)' }}>
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '28px',
                    fontWeight: 400,
                    marginBottom: '32px',
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
                          fontWeight: 500, 
                          marginBottom: '8px',
                          letterSpacing: '0.02em'
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
                        {errors.firstName && (
                          <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>
                            {errors.firstName}
                          </span>
                        )}
                      </div>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '14px', 
                          fontWeight: 500, 
                          marginBottom: '8px',
                          letterSpacing: '0.02em'
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
                        {errors.lastName && (
                          <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>
                            {errors.lastName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '14px', 
                        fontWeight: 500, 
                        marginBottom: '8px',
                        letterSpacing: '0.02em'
                      }}>
                        Email Address *
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
                      {errors.email && (
                        <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>
                          {errors.email}
                        </span>
                      )}
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '14px', 
                        fontWeight: 500, 
                        marginBottom: '8px',
                        letterSpacing: '0.02em'
                      }}>
                        Phone Number *
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
                      {errors.phone && (
                        <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn btn-primary"
                    style={{ 
                      width: '100%', 
                      marginTop: '32px',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '15px',
                      padding: '16px',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Continue to Shipping
                  </button>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {currentStep === 2 && (
                <div className="card" style={{ padding: '40px', background: 'var(--bg-card)' }}>
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '28px',
                    fontWeight: 400,
                    marginBottom: '32px',
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
                        fontWeight: 500, 
                        marginBottom: '8px',
                        letterSpacing: '0.02em'
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
                      {errors.address && (
                        <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>
                          {errors.address}
                        </span>
                      )}
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '14px', 
                        fontWeight: 500, 
                        marginBottom: '8px',
                        letterSpacing: '0.02em'
                      }}>
                        Apartment, Suite, etc. (Optional)
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
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '14px', 
                          fontWeight: 500, 
                          marginBottom: '8px',
                          letterSpacing: '0.02em'
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
                        {errors.city && (
                          <span style={{ fontSize: '11px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>
                            {errors.city}
                          </span>
                        )}
                      </div>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '14px', 
                          fontWeight: 500, 
                          marginBottom: '8px',
                          letterSpacing: '0.02em'
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
                        {errors.state && (
                          <span style={{ fontSize: '11px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>
                            {errors.state}
                          </span>
                        )}
                      </div>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '14px', 
                          fontWeight: 500, 
                          marginBottom: '8px',
                          letterSpacing: '0.02em'
                        }}>
                          ZIP Code *
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
                        {errors.zipCode && (
                          <span style={{ fontSize: '11px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>
                            {errors.zipCode}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn btn-outline"
                      style={{ 
                        flex: 1,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '15px',
                        padding: '16px',
                        letterSpacing: '0.05em'
                      }}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn btn-primary"
                      style={{ 
                        flex: 1,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '15px',
                        padding: '16px',
                        letterSpacing: '0.05em'
                      }}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Information */}
              {currentStep === 3 && (
                <div className="card" style={{ padding: '40px', background: 'var(--bg-card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                    <Lock size={24} color="var(--accent-gold)" />
                    <h2 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '28px',
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      margin: 0
                    }}>
                      Payment Details
                    </h2>
                  </div>
                  
                  <div style={{
                    padding: '16px',
                    background: 'rgba(90, 141, 142, 0.1)',
                    borderRadius: '4px',
                    border: '1px solid rgba(90, 141, 142, 0.3)',
                    marginBottom: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <Shield size={20} color="var(--accent-teal)" />
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '13px',
                      margin: 0,
                      letterSpacing: '0.02em',
                      color: 'var(--accent-teal)'
                    }}>
                      Your payment information is encrypted and secure
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '14px', 
                        fontWeight: 500, 
                        marginBottom: '8px',
                        letterSpacing: '0.02em'
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
                          maxLength="19"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            borderColor: errors.cardNumber ? 'var(--accent-coral)' : undefined,
                            paddingRight: '48px'
                          }}
                        />
                        <CreditCard 
                          size={20} 
                          style={{ 
                            position: 'absolute', 
                            right: '16px', 
                            top: '50%', 
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)'
                          }} 
                        />
                      </div>
                      {errors.cardNumber && (
                        <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>
                          {errors.cardNumber}
                        </span>
                      )}
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '14px', 
                        fontWeight: 500, 
                        marginBottom: '8px',
                        letterSpacing: '0.02em'
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
                      {errors.cardName && (
                        <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>
                          {errors.cardName}
                        </span>
                      )}
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '14px', 
                          fontWeight: 500, 
                          marginBottom: '8px',
                          letterSpacing: '0.02em'
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
                          maxLength="5"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            borderColor: errors.expiryDate ? 'var(--accent-coral)' : undefined
                          }}
                        />
                        {errors.expiryDate && (
                          <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>
                            {errors.expiryDate}
                          </span>
                        )}
                      </div>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '14px', 
                          fontWeight: 500, 
                          marginBottom: '8px',
                          letterSpacing: '0.02em'
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
                          maxLength="3"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            borderColor: errors.cvv ? 'var(--accent-coral)' : undefined
                          }}
                        />
                        {errors.cvv && (
                          <span style={{ fontSize: '12px', color: 'var(--accent-coral)', marginTop: '4px', display: 'block' }}>
                            {errors.cvv}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn btn-outline"
                      disabled={loading}
                      style={{ 
                        flex: 1,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '15px',
                        padding: '16px',
                        letterSpacing: '0.05em'
                      }}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                      style={{ 
                        flex: 1,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '15px',
                        padding: '16px',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {loading ? (
                        <>
                          <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />
                          {processing ? 'Processing...' : 'Placing Order...'}
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
              )}
            </div>

            {/* Order Summary - Sticky */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div className="card" style={{ padding: '32px', background: 'var(--bg-card)' }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '24px',
                  fontWeight: 400,
                  marginBottom: '28px',
                  letterSpacing: '0.03em'
                }}>
                  Order Summary
                </h2>

                <div style={{ marginBottom: '24px', maxHeight: '280px', overflowY: 'auto' }}>
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
                          marginBottom: '6px',
                          letterSpacing: '0.02em'
                        }}>
                          {item.product.name}
                        </p>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                          Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
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
                    <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>Tax (estimated)</span>
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
                    padding: '14px',
                    background: 'rgba(212, 165, 116, 0.1)',
                    border: '1px solid rgba(212, 165, 116, 0.3)',
                    borderRadius: '4px',
                    fontSize: '13px',
                    textAlign: 'center',
                    marginBottom: '20px',
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: '0.02em'
                  }}>
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping
                  </div>
                )}

                <div style={{
                  padding: '16px',
                  background: 'rgba(90, 141, 142, 0.08)',
                  borderRadius: '4px',
                  border: '1px solid rgba(90, 141, 142, 0.2)',
                  textAlign: 'center'
                }}>
                  <Lock size={18} color="var(--accent-teal)" style={{ margin: '0 auto 8px' }} />
                  <p style={{ 
                    fontSize: '12px', 
                    color: 'var(--accent-teal)',
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: '0.02em'
                  }}>
                    Secure 256-bit SSL Encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @media (max-width: 968px) {
            form > div[style*="grid-template-columns: 1fr 420px"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Checkout;