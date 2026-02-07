import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check if product is in wishlist on mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isInWishlist = wishlist.some(item => item._id === product._id);
    setIsWishlisted(isInWishlist);
  }, [product._id]);

  const toggleWishlist = (e) => {
    e.preventDefault(); // Prevent navigation when clicking heart
    e.stopPropagation(); // Prevent event bubbling
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isWishlisted) {
      // Remove from wishlist
      const updated = wishlist.filter(item => item._id !== product._id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      setIsWishlisted(false);
    } else {
      // Add to wishlist
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(true);
    }
  };

  const discountedPrice = product.price * (1 - (product.discount || 0) / 100);

  return (
    <Link 
      to={`/product/${product._id}`}
      style={{ 
        textDecoration: 'none', 
        color: 'inherit',
        display: 'block',
        position: 'relative'
      }}
    >
      <div 
        className="card hover-lift" 
        style={{ 
          overflow: 'hidden',
          background: 'var(--bg-card)',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}
      >
        {/* Heart/Wishlist Button */}
        <button
          onClick={toggleWishlist}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: isWishlisted ? 'rgba(255, 107, 90, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: isWishlisted ? 'none' : '1px solid rgba(255, 107, 90, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart 
            size={20} 
            fill={isWishlisted ? 'white' : 'none'}
            color={isWishlisted ? 'white' : '#ff6b5a'}
            strokeWidth={2}
          />
        </button>

        {/* Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 5
        }}>
          {product.isNew && (
            <span style={{
              background: 'linear-gradient(135deg, #5a8d8e 0%, #4a7d7e 100%)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              New
            </span>
          )}
          {product.discount > 0 && (
            <span style={{
              background: 'linear-gradient(135deg, #ff6b5a 0%, #ff8a7a 100%)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.5px'
            }}>
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Product Image */}
        <div style={{
          paddingBottom: '133%',
          position: 'relative',
          backgroundColor: '#f5f5f5',
          overflow: 'hidden'
        }}>
          <img
            src={product.images?.[0] || '/placeholder.png'}
            alt={product.name}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s ease'
            }}
            className="hover-scale"
            onError={(e) => {
              e.target.src = '/placeholder.png';
            }}
          />
        </div>

        {/* Product Info */}
        <div style={{ padding: '20px' }}>
          {/* Category */}
          <p style={{
            fontSize: '11px',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '8px',
            fontWeight: 600
          }}>
            {product.category}
          </p>

          {/* Product Name */}
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '12px',
            color: 'var(--text-primary)',
            lineHeight: 1.3,
            minHeight: '48px'
          }}>
            {product.name}
          </h3>

          {/* Price */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <span style={{
              fontSize: '22px',
              fontWeight: 700,
              color: product.discount > 0 ? 'var(--accent-coral)' : 'var(--text-primary)'
            }}>
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                textDecoration: 'line-through'
              }}>
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {product.stock <= 5 && product.stock > 0 && (
            <p style={{
              fontSize: '12px',
              color: 'var(--accent-coral)',
              fontWeight: 600
            }}>
              Only {product.stock} left in stock!
            </p>
          )}
          {product.stock === 0 && (
            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              fontWeight: 600
            }}>
              Out of stock
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;