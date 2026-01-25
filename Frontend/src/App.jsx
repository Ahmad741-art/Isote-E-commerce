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
import Account from './pages/Account/Account';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProductForm from './pages/Admin/AdminProductForm';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<Account />} />
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
    backgroundColor: 'var(--primary)',
    color: 'white',
    padding: '48px 0',
    marginTop: '80px'
  }}>
    <div className="container">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '32px',
        marginBottom: '32px'
      }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>ISOTÉ</h3>
          <p style={{ color: '#999', fontSize: '14px', lineHeight: '1.8' }}>
            Premium fashion for the modern individual. Curated collections that define elegance.
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>SHOP</h4>
          <ul style={{ listStyle: 'none', fontSize: '14px' }}>
            <li style={{ marginBottom: '8px' }}><a href="/shop?category=women" style={{ color: '#999' }}>Women</a></li>
            <li style={{ marginBottom: '8px' }}><a href="/shop?category=men" style={{ color: '#999' }}>Men</a></li>
            <li style={{ marginBottom: '8px' }}><a href="/shop?category=accessories" style={{ color: '#999' }}>Accessories</a></li>
            <li style={{ marginBottom: '8px' }}><a href="/shop" style={{ color: '#999' }}>New Arrivals</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>SUPPORT</h4>
          <ul style={{ listStyle: 'none', fontSize: '14px' }}>
            <li style={{ marginBottom: '8px' }}><Link to="/contact" style={{ color: '#999' }}>Contact Us</Link></li>
            <li style={{ marginBottom: '8px' }}><Link to="/shipping" style={{ color: '#999' }}>Shipping Info</Link></li>
            <li style={{ marginBottom: '8px' }}><Link to="/returns" style={{ color: '#999' }}>Returns</Link></li>
            <li style={{ marginBottom: '8px' }}><Link to="/faq" style={{ color: '#999' }}>FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>NEWSLETTER</h4>
          <p style={{ color: '#999', fontSize: '14px', marginBottom: '12px' }}>
            Subscribe for exclusive offers
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="email"
              placeholder="Your email"
              style={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid #333',
                backgroundColor: 'transparent',
                color: 'white',
                fontSize: '14px'
              }}
            />
            <button style={{
              padding: '10px 20px',
              backgroundColor: 'white',
              color: 'black',
              fontSize: '14px',
              fontWeight: 500
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid #333',
        paddingTop: '24px',
        textAlign: 'center',
        color: '#999',
        fontSize: '13px'
      }}>
        <p>&copy; 2026 Isoté. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default App;