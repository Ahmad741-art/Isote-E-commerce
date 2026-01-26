import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, AlertCircle, CheckCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      alert('Please login to proceed with checkout');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    // Redirect if cart is empty
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  // Validate cart items are still available
  useEffect(() => {
    if (cart.length > 0) {
      validateCartItems();
    }
  }, []);

  const validateCartItems = async () => {
    setValidating(true);
    setValidationError('');
    
    try {
      // Check if all items are still in stock
      const unavailableItems = [];
      
      for (const item of cart) {
        // In a real app, you'd make an API call here to check stock
        if (item.product.stock < item.quantity) {
          unavailableItems.push(item.product.name);
        }
      }

      if (unavailableItems.length > 0) {
        setValidationError(
          `⚠️ The following items are no longer available in the requested quantity: ${unavailableItems.join(', ')}. Please update your cart.`
        );
      }
    } catch (error) {
      console.error('Failed to validate cart:', error);
      setValidationError('Unable to validate cart items. Please try again.');
    } finally {
      setValidating(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.address && formData.city && formData.state && formData.zipCode;
      case 3:
        return formData.cardNumber && formData.expiryDate && formData.cvv;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validationError) {
      alert('Please resolve cart issues before proceeding');
      return;
    }

    setLoading(true);

    try {
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
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        total: getCartTotal() + (getCartTotal() >= 100 ? 0 : 9.99) + getCartTotal() * 0.08,
      };

      await ordersAPI.create(orderData);
      await clearCart();
      
      // Show success message
      alert('🎉 Order placed successfully! You will receive a confirmation email shortly.');
      navigate('/account');
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('❌ Failed to place order. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div style={{ padding: '48px 0', backgroundColor: 'var(--bg-secondary)', minHeight: '60vh' }}>
      <div className="container">
        {/* Progress Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '40px'
        }}>
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: currentStep >= step ? 'var(--gradient-1)' : 'var(--bg-card)',
                border: `2px solid ${currentStep >= step ? 'var(--accent)' : 'var(--border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: currentStep >= step ? 'var(--text-dark)' : 'var(--text-secondary)',
                fontSize: '16px'
              }}>
                {step}
              </div>
              {step < 3 && (
                <div style={{
                  width: '80px',
                  height: '2px',
                  background: currentStep > step ? 'var(--accent)' : 'var(--border)'
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5vw, 42px)',
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          {currentStep === 1 && 'Contact Information'}
          {currentStep === 2 && 'Shipping Address'}
          {currentStep === 3 && 'Payment Details'}
        </h1>
        
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          marginBottom: '40px',
          fontSize: '14px'
        }}>
          Step {currentStep} of 3
        </p>

        {/* Validation Error */}
        {validationError && (
          <div className="error-message" style={{ marginBottom: '24px', maxWidth: '800px', margin: '0 auto 24px' }}>
            <AlertCircle size={20} style={{ marginRight: '8px' }} />
            {validationError}
          </div>
        )}

        {/* Validating Indicator */}
        {validating && (
          <div style={{
            maxWidth: '800px',
            margin: '0 auto 24px',
            padding: '16px',
            background: 'rgba(201, 169, 97, 0.1)',
            border: '2px solid var(--accent)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
            <span style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: 600 }}>
              Validating cart items...
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '32px',
            alignItems: 'start'
          }}>
            {/* Form Section */}
            <div>
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <div className="card" style={{ padding: '32px', backgroundColor: 'white' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
                    Contact Information
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="input"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="input"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="input"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '24px' }}
                  >
                    Continue to Shipping
                  </button>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {currentStep === 2 && (
                <div className="card" style={{ padding: '32px', backgroundColor: 'white' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
                    Shipping Address
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        className="input"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          className="input"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          className="input"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          className="input"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn btn-outline"
                      style={{ flex: 1 }}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Information */}
              {currentStep === 3 && (
                <div className="card" style={{ padding: '32px', backgroundColor: 'white' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lock size={20} />
                    Payment Information
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
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
                          required
                        />
                        <CreditCard size={20} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
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
                          required
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
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
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn btn-outline"
                      style={{ flex: 1 }}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading || !!validationError}
                      style={{ flex: 1 }}
                    >
                      {loading ? (
                        <>
                          <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle size={20} />
                          Place Order
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary - Sticky */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div className="card" style={{ padding: '32px', backgroundColor: 'white' }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  marginBottom: '24px'
                }}>
                  Order Summary
                </h2>

                <div style={{ marginBottom: '24px', maxHeight: '200px', overflowY: 'auto' }}>
                  {cart.map((item) => (
                    <div key={item._id} style={{
                      display: 'flex',
                      gap: '12px',
                      marginBottom: '16px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid var(--border)'
                    }}>
                      <img
                        src={item.product.images?.[0] || '/placeholder.png'}
                        alt={item.product.name}
                        style={{
                          width: '60px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>
                          {item.product.name}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                          Qty: {item.quantity} {item.size && `| Size: ${item.size}`}
                        </p>
                        <p style={{ fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="divider" />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '20px',
                    fontWeight: 700
                  }}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && subtotal < 100 && (
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#fff3cd',
                    border: '1px solid #ffc107',
                    borderRadius: '4px',
                    fontSize: '13px',
                    textAlign: 'center',
                    marginBottom: '16px'
                  }}>
                    Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                  </div>
                )}

                <div style={{
                  padding: '16px',
                  background: 'rgba(201, 169, 97, 0.1)',
                  borderRadius: '4px',
                  border: '2px solid var(--accent)',
                  textAlign: 'center'
                }}>
                  <Lock size={20} color="var(--accent)" style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    🔒 Secure 256-bit SSL Encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>

        <style>{`
          @media (max-width: 968px) {
            form > div[style*="grid-template-columns: 1fr 400px"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Checkout;