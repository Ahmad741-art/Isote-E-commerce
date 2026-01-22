import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { wishlistAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await wishlistAPI.getWishlist();
      setWishlist(response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setLoading(false);
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
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <Heart size={64} style={{ margin: '0 auto 24px', color: 'var(--text-light)' }} />
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            marginBottom: '16px'
          }}>
            Your Wishlist is Empty
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            fontSize: '16px'
          }}>
            Save your favorite items for later
          </p>
          <Link to="/shop" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '48px 0', backgroundColor: 'var(--bg-secondary)', minHeight: '60vh' }}>
      <div className="container">
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5vw, 42px)',
          marginBottom: '40px'
        }}>
          My Wishlist ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-4">
          {wishlist.map((item) => (
            <ProductCard key={item._id} product={item.product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;