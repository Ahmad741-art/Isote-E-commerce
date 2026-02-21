import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const saved = localStorage.getItem('wishlist');
    console.log('Loading wishlist from localStorage:', saved); // Debug log
    
    if (saved) {
      try {
        const items = JSON.parse(saved);
        console.log('Parsed wishlist items:', items); // Debug log
        setWishlist(items);
      } catch (error) {
        console.error('Error parsing wishlist:', error);
        setWishlist([]);
      }
    }
    setLoading(false);
  };

  const removeItem = (productId) => {
    const updated = wishlist.filter(item => item._id !== productId);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const clearAll = () => {
    if (window.confirm('Clear your entire wishlist?')) {
      setWishlist([]);
      localStorage.removeItem('wishlist');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            <Heart size={60} color="#ff6b5a" strokeWidth={1.5} />
          </div>

          <h2 style={{
            fontSize: '36px',
            fontWeight: 300,
            marginBottom: '16px',
            color: 'var(--text-primary)'
          }}>
            Your Wishlist is Empty
          </h2>
          
          <p style={{
            fontSize: '17px',
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            lineHeight: 1.7
          }}>
            Save your favorite items for later
          </p>

          <Link 
            to="/shop"
            className="btn btn-primary"
            style={{
              fontSize: '15px',
              padding: '16px 48px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#d4a65c',
              color: 'white',
              borderRadius: '4px'
            }}
          >
            <ShoppingBag size={20} />
            Start Shopping
          </Link>
        </div>
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
              fontSize: '48px',
              fontWeight: 300,
              marginBottom: '8px',
              color: 'var(--text-primary)'
            }}>
              My Wishlist
            </h1>
            <p style={{
              fontSize: '16px',
              color: 'var(--text-secondary)'
            }}>
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          <button
            onClick={clearAll}
            style={{
              fontSize: '14px',
              color: '#ff6b5a',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Clear Wishlist
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '32px'
        }}>
          {wishlist.map((product) => (
            <div key={product._id} style={{ position: 'relative' }}>
              
              {/* Product Card */}
              <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  background: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{ paddingBottom: '133%', position: 'relative', background: '#f5f5f5' }}>
                    <img
                      src={product.images?.[0] || '/placeholder.png'}
                      alt={product.name}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  
                  <div style={{ padding: '20px' }}>
                    <p style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                      {product.category}
                    </p>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#333' }}>
                      {product.name}
                    </h3>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#ff6b5a' }}>
                      ${product.price?.toFixed(2)}
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Remove Button */}
              <button
                onClick={() => removeItem(product._id)}
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
              >
                <Trash2 size={18} color="white" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;