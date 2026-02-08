import React, { useEffect, useState } from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    // Get wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const items = JSON.parse(savedWishlist);
        setWishlist(items);
      } catch (error) {
        console.error('Error loading wishlist:', error);
        setWishlist([]);
      }
    }
    setLoading(false);
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item._id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const clearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      setWishlist([]);
      localStorage.removeItem('wishlist');
    }
  };

  if (loading) {
    return (
      <div className="loading" style={{ minHeight: '60vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #1a2332 0%, #2d3e50 100%)',
        padding: '60px 20px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 107, 90, 0.1) 0%, rgba(90, 141, 142, 0.1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 107, 90, 0.3)'
          }}>
            <Heart size={60} color="var(--accent-coral)" strokeWidth={1.5} />
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 300,
            marginBottom: '16px',
            fontStyle: 'italic',
            letterSpacing: '0.03em',
            color: 'var(--text-primary)'
          }}>
            Your Wishlist is Empty
          </h2>
          
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '17px',
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            lineHeight: 1.7,
            letterSpacing: '0.02em'
          }}>
            Save your favorite items for later
          </p>

          <Link 
            to="/shop"
            className="btn btn-primary"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '15px',
              padding: '16px 48px',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <ShoppingBag size={20} />
            Start Shopping
          </Link>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '60px 0 100px', 
      minHeight: '80vh',
      background: 'linear-gradient(180deg, #1a2332 0%, #2d3e50 100%)'
    }}>
      <div className="container">
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '48px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 300,
              marginBottom: '8px',
              fontStyle: 'italic',
              letterSpacing: '0.03em',
              color: 'var(--text-primary)'
            }}>
              My Wishlist
            </h1>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '16px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em'
            }}>
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '14px',
                color: 'var(--accent-coral)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                letterSpacing: '0.03em'
              }}
            >
              Clear Wishlist
            </button>
          )}
        </div>

        <div className="grid grid-4" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '32px'
        }}>
          {wishlist.map((product) => (
            <div key={product._id} style={{ position: 'relative' }}>
              <ProductCard product={product} />
              
              <button
                onClick={() => removeFromWishlist(product._id)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 107, 90, 0.9)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 107, 90, 1)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 107, 90, 0.9)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                aria-label="Remove from wishlist"
              >
                <Trash2 size={18} color="white" />
              </button>
            </div>
          ))}
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
        `}</style>
      </div>
    </div>
  );
};

export default Wishlist;