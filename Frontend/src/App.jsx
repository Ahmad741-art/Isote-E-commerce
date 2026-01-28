import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/Product/ProductPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Account from './pages/Account/Account';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProductForm from './pages/Admin/AdminProductForm';
import AdminRoute from './components/AdminRoute';
import Contact from './support/Contact';
import FAQ from './support/FAQ';
import Shipping from './support/Shipping';
import Returns from './support/Returns';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <React.Suspense fallback={<div className="loading"><div className="spinner" /></div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/returns" element={<Returns />} />
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/products/new"
                    element={
                      <AdminRoute>
                        <AdminProductForm />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/products/edit/:id"
                    element={
                      <AdminRoute>
                        <AdminProductForm />
                      </AdminRoute>
                    }
                  />
                </Routes>
              </React.Suspense>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

const Footer = () => (
  <footer style={{
    background: 'linear-gradient(180deg, #1a2332 0%, #0f1419 100%)',
    color: 'white',
    padding: '80px 0 32px',
    marginTop: '100px',
    borderTop: '1px solid rgba(212, 165, 116, 0.2)',
    position: 'relative'
  }}>
    {/* Subtle top accent */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '120px',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)'
    }} />

    <div className="container">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '48px',
        marginBottom: '48px'
      }}>
        
        {/* Brand Section */}
        <div>
          <h3 style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '42px',
            fontWeight: 300,
            fontStyle: 'italic',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #ff8c75 0%, #d4a574 50%, #8ca89d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.05em'
          }}>
            Isoté
          </h3>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '15px',
            lineHeight: '1.8',
            marginBottom: '24px',
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: '0.02em'
          }}>
            Where timeless elegance meets modern sophistication. Curated collections for the discerning.
          </p>
          
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { icon: Instagram, href: '#' },
              { icon: Facebook, href: '#' },
              { icon: Twitter, href: '#' }
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <a 
                  key={idx}
                  href={social.href}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid rgba(212, 165, 116, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-gold)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    e.currentTarget.style.background = 'rgba(212, 165, 116, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.3)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Shop Section */}
        <div>
          <h4 style={{ 
            marginBottom: '24px',
            fontSize: '15px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            color: 'var(--accent-coral)',
            fontFamily: "'Cormorant Garamond', serif"
          }}>
            EXPLORE
          </h4>
          <ul style={{ listStyle: 'none', fontSize: '14px' }}>
            {[
              { to: '/shop?featured=new', label: 'New Arrivals' },
              { to: '/shop?featured=popular', label: 'Most Popular' },
              { to: '/shop?category=accessories', label: 'Accessories' },
              { to: '/shop', label: 'Full Collection' }
            ].map((link, idx) => (
              <li key={idx} style={{ marginBottom: '12px' }}>
                <Link 
                  to={link.to}
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.6)',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '15px',
                    letterSpacing: '0.02em'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent-gold)';
                    e.currentTarget.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.paddingLeft = '0';
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h4 style={{ 
            marginBottom: '24px',
            fontSize: '15px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            color: 'var(--accent-coral)',
            fontFamily: "'Cormorant Garamond', serif"
          }}>
            SUPPORT
          </h4>
          <ul style={{ listStyle: 'none', fontSize: '14px' }}>
            {[
              { to: '/contact', label: 'Contact Us' },
              { to: '/shipping', label: 'Shipping Information' },
              { to: '/returns', label: 'Returns & Exchanges' },
              { to: '/faq', label: 'FAQ' }
            ].map((link, idx) => (
              <li key={idx} style={{ marginBottom: '12px' }}>
                <Link 
                  to={link.to}
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.6)',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '15px',
                    letterSpacing: '0.02em'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent-gold)';
                    e.currentTarget.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.paddingLeft = '0';
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h4 style={{ 
            marginBottom: '24px',
            fontSize: '15px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            color: 'var(--accent-coral)',
            fontFamily: "'Cormorant Garamond', serif"
          }}>
            NEWSLETTER
          </h4>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
            marginBottom: '16px',
            lineHeight: '1.7',
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: '0.02em'
          }}>
            Join our community for exclusive offers and style inspiration
          </p>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{
                padding: '14px 16px',
                border: '1px solid rgba(212, 165, 116, 0.3)',
                backgroundColor: 'rgba(42, 58, 74, 0.4)',
                color: 'white',
                fontSize: '14px',
                borderRadius: '2px',
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '0.02em',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
                e.currentTarget.style.background = 'rgba(42, 58, 74, 0.6)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.3)';
                e.currentTarget.style.background = 'rgba(42, 58, 74, 0.4)';
              }}
            />
            <button 
              type="submit"
              style={{
                padding: '14px 24px',
                background: 'var(--gradient-sunset)',
                color: 'white',
                fontSize: '13px',
                fontWeight: 500,
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '0.08em',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 107, 90, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Contact Info Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        padding: '32px 0',
        borderTop: '1px solid rgba(212, 165, 116, 0.15)',
        borderBottom: '1px solid rgba(212, 165, 116, 0.15)',
        marginBottom: '32px'
      }}>
        {[
          { icon: Mail, text: 'hello@isote.com' },
          { icon: Phone, text: '+1 (555) 123-4567' },
          { icon: MapPin, text: 'New York, NY 10012' }
        ].map((contact, idx) => {
          const Icon = contact.icon;
          return (
            <div 
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '14px',
                fontFamily: "'Cormorant Garamond', serif"
              }}
            >
              <Icon size={18} color="var(--accent-gold)" />
              <span style={{ letterSpacing: '0.02em' }}>{contact.text}</span>
            </div>
          );
        })}
      </div>

      {/* Copyright */}
      <div style={{
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: '13px',
        fontFamily: "'Cormorant Garamond', serif",
        letterSpacing: '0.05em'
      }}>
        <p style={{ marginBottom: '8px' }}>
          &copy; 2026 Isoté. All rights reserved.
        </p>
        <p style={{ fontSize: '12px', opacity: 0.7 }}>
          Crafted with elegance and care
        </p>
      </div>
    </div>

    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
    `}</style>
  </footer>
);

export default App;