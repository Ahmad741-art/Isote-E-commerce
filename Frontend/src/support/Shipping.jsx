import React from 'react';
import { Truck, Package, Clock, Globe } from 'lucide-react';

const Shipping = () => {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '80px 24px',
      background: 'linear-gradient(135deg, #0f0f1e 0%, #16213e 50%, #1a1a2e 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Effects */}
      <div style={{
        position: 'absolute',
        top: '25%',
        right: '8%',
        width: '550px',
        height: '550px',
        background: 'radial-gradient(circle, rgba(44, 95, 119, 0.18) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'battleFloat 14s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(201, 169, 97, 0.14) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'battleFloat 10s ease-in-out infinite reverse'
      }} />

      <div className="container" style={{ maxWidth: '1000px', position: 'relative', zIndex: 1 }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          textAlign: 'center',
          marginBottom: '20px',
          letterSpacing: '3px'
        }}>
          SHIPPING
          <br />
          INFORMATION
        </h1>

        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          marginBottom: '60px',
          fontSize: '16px',
          maxWidth: '600px',
          margin: '0 auto 60px'
        }}>
          We offer fast, reliable shipping worldwide with tracking on all orders
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          marginBottom: '60px'
        }}>
          <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
            <Truck size={48} color="var(--accent)" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '12px', letterSpacing: '1px' }}>
              FREE SHIPPING
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              On orders over $100
            </p>
          </div>

          <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
            <Clock size={48} color="var(--accent)" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '12px', letterSpacing: '1px' }}>
              FAST DELIVERY
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              3-5 business days
            </p>
          </div>

          <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
            <Globe size={48} color="var(--accent)" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '12px', letterSpacing: '1px' }}>
              WORLDWIDE
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              We ship globally
            </p>
          </div>
        </div>

        <div className="card" style={{ padding: '48px', marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '28px',
            marginBottom: '32px',
            letterSpacing: '2px'
          }}>
            SHIPPING OPTIONS
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--accent)' }}>
                Standard Shipping (3-5 Business Days)
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <strong>US Orders:</strong> $9.99 (FREE on orders over $100)<br />
                <strong>International Orders:</strong> $19.99 (FREE on orders over $200)
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--accent)' }}>
                Express Shipping (1-2 Business Days)
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <strong>US Orders:</strong> $24.99<br />
                <strong>Not available for international orders</strong>
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--accent)' }}>
                International Shipping (7-14 Business Days)
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                We ship to over 100 countries worldwide. Delivery times vary by location. 
                Customs fees and duties may apply and are the responsibility of the customer.
              </p>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '48px' }}>
          <h2 style={{
            fontSize: '28px',
            marginBottom: '32px',
            letterSpacing: '2px'
          }}>
            ORDER TRACKING
          </h2>

          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '16px' }}>
              Once your order ships, you'll receive a confirmation email with a tracking number. 
              You can track your package at any time through:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Your account dashboard</li>
              <li style={{ marginBottom: '8px' }}>The tracking link in your shipping confirmation email</li>
              <li style={{ marginBottom: '8px' }}>Our carrier's website using your tracking number</li>
            </ul>
            <p>
              Please allow 24-48 hours for tracking information to update after receiving your shipping confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;