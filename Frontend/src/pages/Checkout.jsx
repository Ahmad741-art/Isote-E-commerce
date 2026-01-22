import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ordersAPI.create({
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
      });

      await clearCart();
      alert('Order placed successfully!');
      navigate('/account');
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div style={{ padding: '48px 0', backgroundColor: 'var(--bg-secondary)', minHeight: '60vh' }}>
      <div className="container">
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5vw, 42px)',
          marginBottom: '40px'
        }}>
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '32px',
            alignItems: 'start'
          }}>
            {/* Form Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Contact Information */}
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
              </div>

              {/* Shipping Address */}
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
              </div>

              {/* Payment Information */}
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
              </div>
            </div>

            {/* Order Summary */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div className="card" style={{ padding: '32px', backgroundColor: 'white' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
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

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ width: '100%', fontSize: '16px', padding: '18px' }}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>

                <p style={{
                  fontSize: '12px',
                  color: 'var(--text-light)',
                  textAlign: 'center',
                  marginTop: '16px'
                }}>
                  By placing your order, you agree to our terms and conditions
                </p>
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