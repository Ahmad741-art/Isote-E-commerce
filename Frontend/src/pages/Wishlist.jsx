import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    console.log('🎯 Wishlist component mounted!');
    const saved = localStorage.getItem('wishlist');
    console.log('📦 localStorage data:', saved);
    
    if (saved) {
      try {
        const items = JSON.parse(saved);
        console.log('✅ Parsed items:', items);
        setWishlist(items);
      } catch (e) {
        console.error('❌ Parse error:', e);
      }
    }
  }, []);

  console.log('🔄 Rendering with', wishlist.length, 'items');

  if (wishlist.length === 0) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>
          Your Wishlist is Empty
        </h1>
        <p style={{ marginBottom: '30px', fontSize: '18px', color: '#666' }}>
          Add some products to see them here!
        </p>
        <Link to="/shop" style={{
          padding: '12px 30px',
          background: '#ff6b5a',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', minHeight: '80vh' }}>
      <h1>My Wishlist ({wishlist.length} items)</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        {wishlist.map((product) => (
          <div key={product._id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            background: 'white'
          }}>
            <img 
              src={product.images?.[0] || 'https://via.placeholder.com/300'} 
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '15px' }}
            />
            <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{product.name}</h3>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff6b5a' }}>
              ${product.price?.toFixed(2)}
            </p>
            <Link 
              to={`/product/${product._id}`}
              style={{
                display: 'block',
                marginTop: '15px',
                padding: '10px',
                background: '#333',
                color: 'white',
                textAlign: 'center',
                textDecoration: 'none',
                borderRadius: '5px'
              }}
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;