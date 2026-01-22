import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        textDecoration: 'none',
        color: 'inherit'
      }}
    >
      {/* Image Container */}
      <div style={{
        position: 'relative',
        paddingBottom: '133%',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-secondary)'
      }}>
        <img
          src={product.images?.[0] || '/placeholder.png'}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />

        {/* Badges */}
        {product.isNew && (
          <span className="badge" style={{
            position: 'absolute',
            top: '12px',
            left: '12px'
          }}>
            New
          </span>
        )}
        {product.discount > 0 && (
          <span className="badge badge-accent" style={{
            position: 'absolute',
            top: '12px',
            right: '12px'
          }}>
            -{product.discount}%
          </span>
        )}

        {/* Action Buttons */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          <button
            onClick={handleWishlist}
            className="btn-icon"
            style={{
              backgroundColor: 'white',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <Heart
              size={18}
              fill={isWishlisted ? 'var(--accent)' : 'none'}
              color={isWishlisted ? 'var(--accent)' : 'var(--text-primary)'}
            />
          </button>
          <button
            onClick={handleAddToCart}
            className="btn-icon"
            style={{
              backgroundColor: 'white',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div style={{ padding: '16px' }}>
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          color: 'var(--text-light)',
          marginBottom: '4px'
        }}>
          {product.category}
        </p>
        <h3 style={{
          fontSize: '15px',
          fontWeight: 500,
          marginBottom: '8px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {product.discount > 0 ? (
            <>
              <span style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--accent)'
              }}>
                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
              <span style={{
                fontSize: '14px',
                color: 'var(--text-light)',
                textDecoration: 'line-through'
              }}>
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span style={{
              fontSize: '16px',
              fontWeight: 600
            }}>
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Color Options */}
        {product.colors && product.colors.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '6px',
            marginTop: '12px'
          }}>
            {product.colors.slice(0, 4).map((color, idx) => (
              <div
                key={idx}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  border: '1px solid var(--border)',
                  cursor: 'pointer'
                }}
              />
            ))}
            {product.colors.length > 4 && (
              <span style={{
                fontSize: '12px',
                color: 'var(--text-light)',
                alignSelf: 'center'
              }}>
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;