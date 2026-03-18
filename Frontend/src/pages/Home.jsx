import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Plus } from 'lucide-react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll({ limit: 8 });
      setProducts(response.data.products || response.data.data || response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductDeleted = (deletedId) => {
    setProducts(prev => prev.filter(p => p._id !== deletedId));
  };

  return (
    <div>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `url(/images/efe4.jpg) center/cover no-repeat`, filter: 'brightness(0.4)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 900, padding: '0 20px', width: '100%' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 300, color: '#d4a65c', letterSpacing: 6, fontStyle: 'italic', marginBottom: 32 }}>
            Isoté
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 6vw, 56px)', fontWeight: 600, color: '#e8e8e8', marginBottom: 24, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            TIMELESS ELEGANCE
          </h1>
          <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: '#a8adb5', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7, padding: '0 16px' }}>
            Discover our curated collection inspired by Japanese artistry and modern design
          </p>
          <div className="hero-buttons" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', padding: '0 16px' }}>
            <Link to="/shop" className="btn btn-primary">EXPLORE COLLECTION</Link>
            <Link to="/shop?sort=newest" className="btn btn-outline">NEW ARRIVALS</Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: 'clamp(48px, 8vw, 100px) 0', background: '#0a0e12' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 48px)', fontWeight: 600, marginBottom: 16, color: '#e8e8e8' }}>FEATURED PIECES</h2>
            <p style={{ fontSize: 16, color: '#a8adb5' }}>Hand-selected items for the discerning</p>
          </div>

          {loading ? (
            <div className="loading"><div className="spinner" /></div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-4">
                {products.slice(0, 8).map(product => (
                  <ProductCard key={product._id} product={product} onDeleted={handleProductDeleted} />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 60 }}>
                <Link to="/shop" className="btn btn-outline">VIEW ALL PRODUCTS</Link>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#a8adb5' }}>
              <p style={{ fontSize: 16, marginBottom: 20 }}>No products available yet</p>
              {isAdmin && (
                <Link to="/admin/products/new" className="btn btn-primary">Add First Product</Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section style={{ padding: 'clamp(48px, 8vw, 100px) 0', background: '#151a20' }}>
        <div className="container">
          <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            <Link to="/shop?sort=newest" style={{ position: 'relative', height: 'clamp(300px, 50vw, 500px)', overflow: 'hidden', display: 'block', background: '#1a1f26' }}>
              <div style={{ position: 'absolute', inset: 0, background: `url(/images/efe2.jpg) center/cover no-repeat`, transition: 'transform 0.6s ease', filter: 'brightness(0.7)' }} className="hover-scale" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'flex-end', padding: 'clamp(24px, 4vw, 40px)' }}>
                <div>
                  <p style={{ fontSize: 12, letterSpacing: 2, color: '#d4a65c', marginBottom: 8, fontWeight: 600 }}>NEW ARRIVALS</p>
                  <h3 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 600, color: '#e8e8e8', marginBottom: 12 }}>Fresh Collection</h3>
                  <span style={{ color: '#d4a65c', fontSize: 14, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8 }}>SHOP NOW <ArrowRight size={16} /></span>
                </div>
              </div>
            </Link>

            <Link to="/shop?sort=popular" style={{ position: 'relative', height: 'clamp(300px, 50vw, 500px)', overflow: 'hidden', display: 'block', background: '#1a1f26' }}>
              <div style={{ position: 'absolute', inset: 0, background: `url(/images/efe1.jpg) center/cover no-repeat`, transition: 'transform 0.6s ease', filter: 'brightness(0.7)' }} className="hover-scale" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'flex-end', padding: 'clamp(24px, 4vw, 40px)' }}>
                <div>
                  <p style={{ fontSize: 12, letterSpacing: 2, color: '#d4a65c', marginBottom: 8, fontWeight: 600 }}>BEST SELLERS</p>
                  <h3 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 600, color: '#e8e8e8', marginBottom: 12 }}>Most Loved</h3>
                  <span style={{ color: '#d4a65c', fontSize: 14, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8 }}>SHOP NOW <ArrowRight size={16} /></span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section style={{ position: 'relative', padding: 'clamp(80px, 12vw, 140px) 0', background: '#1a1f26' }}>
        <div style={{ position: 'absolute', inset: 0, background: `url(/images/efe2.jpg) center/cover no-repeat`, filter: 'brightness(0.5)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="banner-content" style={{ maxWidth: 700, margin: '0 auto', background: 'rgba(10,14,18,0.8)', backdropFilter: 'blur(10px)', padding: 'clamp(32px, 5vw, 60px) clamp(20px, 5vw, 40px)', border: '1px solid rgba(212,166,92,0.2)' }}>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 48px)', fontWeight: 600, marginBottom: 20, color: '#e8e8e8' }}>ARTISAN CRAFTED</h2>
            <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#a8adb5', marginBottom: 40, lineHeight: 1.7 }}>
              Each piece tells a story of tradition, excellence, and timeless beauty. Discover collections inspired by centuries of craftsmanship.
            </p>
            <Link to="/shop?featured=true" className="btn btn-primary">VIEW COLLECTION</Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ position: 'relative', padding: 'clamp(48px, 8vw, 100px) 0', background: '#0a0e12' }}>
        <div style={{ position: 'absolute', inset: 0, background: `url(/images/efe3.jpg) center/cover no-repeat`, opacity: 0.1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '0 16px' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 6vw, 40px)', fontWeight: 300, color: '#d4a65c', letterSpacing: 5, fontStyle: 'italic', marginBottom: 24 }}>Isoté</div>
          <Sparkles size={32} color="#d4a65c" style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 600, marginBottom: 16, color: '#e8e8e8' }}>JOIN OUR COMMUNITY</h2>
          <p style={{ fontSize: 16, color: '#a8adb5', marginBottom: 40 }}>Subscribe for exclusive offers, new arrivals, and style inspiration</p>
          <form className="newsletter-form" style={{ display: 'flex', gap: 12, maxWidth: 500, margin: '0 auto', flexWrap: 'wrap' }} onSubmit={e => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
            <input type="email" placeholder="Your email address" required style={{ flex: 1, minWidth: 200, padding: '16px 20px', background: '#151a20', border: '1px solid #2a3038', color: '#e8e8e8', fontSize: 14 }} />
            <button type="submit" className="btn btn-primary" style={{ padding: '16px 32px' }}>SUBSCRIBE</button>
          </form>
        </div>
      </section>

      {/* Floating Add Product button for admin */}
      {isAdmin && (
        <Link to="/admin/products/new" style={{
          position: 'fixed', bottom: 32, right: 32,
          width: 60, height: 60, borderRadius: '50%',
          background: '#d4a65c', color: '#0a0e12',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(212,165,92,0.5)',
          zIndex: 1000, transition: 'all 0.3s ease',
          textDecoration: 'none'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        title="Add new product"
        >
          <Plus size={28} />
        </Link>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
        .hover-scale:hover { transform: scale(1.05); }
      `}</style>
    </div>
  );
};

export default Home;