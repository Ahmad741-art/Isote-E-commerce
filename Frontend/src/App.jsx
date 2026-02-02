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
    background: '#0a0e12',
    color: 'white',
    padding: '60px 0 32px',
    borderTop: '1px solid #1f2429'
  }}>
    <div className="container">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
        marginBottom: '48px'
      }}>
        <div>
          <h3 style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '32px',
            fontWeight: 300,
            marginBottom: '16px',
            color: '#d4a65c',
            letterSpacing: '4px',
            fontStyle: 'italic'
          }}>
            Isoté
          </h3>
          <p style={{ 
            color: '#a8adb5',
            fontSize: '14px',
            lineHeight: '1.8',
            marginBottom: '20px'
          }}>
            Timeless elegance inspired by Japanese artistry and modern design.
          </p>
        </div>
        
        <div>
          <h4 style={{ 
            marginBottom: '16px',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '1px',
            color: '#e8e8e8'
          }}>
            SHOP
          </h4>
          <ul style={{ listStyle: 'none', fontSize: '14px' }}>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/shop" style={{ color: '#a8adb5' }}>All Products</Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/shop?sort=newest" style={{ color: '#a8adb5' }}>New Arrivals</Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/shop?sort=popular" style={{ color: '#a8adb5' }}>Best Sellers</Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/shop?category=accessories" style={{ color: '#a8adb5' }}>Accessories</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ 
            marginBottom: '16px',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '1px',
            color: '#e8e8e8'
          }}>
            SUPPORT
          </h4>
          <ul style={{ listStyle: 'none', fontSize: '14px' }}>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/contact" style={{ color: '#a8adb5' }}>Contact Us</Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/shipping" style={{ color: '#a8adb5' }}>Shipping Info</Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/returns" style={{ color: '#a8adb5' }}>Returns</Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/faq" style={{ color: '#a8adb5' }}>FAQ</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ 
            marginBottom: '16px',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '1px',
            color: '#e8e8e8'
          }}>
            NEWSLETTER
          </h4>
          <p style={{ 
            color: '#a8adb5',
            fontSize: '13px',
            marginBottom: '16px',
            lineHeight: '1.6'
          }}>
            Subscribe for exclusive offers
          </p>
          <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
            <input
              type="email"
              placeholder="Your email"
              style={{
                padding: '12px 16px',
                border: '1px solid #2a3038',
                backgroundColor: '#151a20',
                color: 'white',
                fontSize: '13px'
              }}
            />
            <button style={{
              padding: '12px 24px',
              background: '#d4a65c',
              color: '#0a0e12',
              fontSize: '12px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '1px'
            }}>
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
      
      <div style={{
        borderTop: '1px solid #1f2429',
        paddingTop: '24px',
        textAlign: 'center',
        color: '#6b7280',
        fontSize: '13px'
      }}>
        <p>&copy; 2026 Isoté. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default App;