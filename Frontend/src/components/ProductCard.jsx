import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { productsAPI } from '../services/api';

const getImageSrc = (images) => {
  if (!images || images.length === 0) return '/placeholder.png';
  const first = images[0];
  if (typeof first === 'string') return first;
  if (first?.url) return first.url;
  return '/placeholder.png';
};

const ProductCard = ({ product, onDeleted }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.some(item => item._id === product._id));
  }, [product._id]);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isWishlisted) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist.filter(i => i._id !== product._id)));
      setIsWishlisted(false);
    } else {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(true);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`Delete "${product.name}"?`)) return;
    try {
      await productsAPI.delete(product._id);
      onDeleted?.(product._id);
    } catch {
      alert('Failed to delete product');
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/admin/products/edit/${product._id}`);
  };

  const discountedPrice = product.price * (1 - (product.discount || 0) / 100);
  const imageSrc = getImageSrc(product.images);

  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', position: 'relative' }}>
      <div className="card hover-lift" style={{ overflow: 'hidden', background: 'var(--bg-card)', borderRadius: 8, position: 'relative' }}>

        {/* Admin buttons */}
        {isAdmin && (
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 20 }}>
            <button onClick={handleEdit} style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(212,165,92,0.95)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }} title="Edit product">
              <Edit size={16} color="#0a0e12" />
            </button>
            <button onClick={handleDelete} style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,107,90,0.95)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }} title="Delete product">
              <Trash2 size={16} color="white" />
            </button>
          </div>
        )}

        {/* Wishlist */}
        <button onClick={toggleWishlist} style={{
          position: 'absolute', top: 12, right: 12,
          width: 40, height: 40, borderRadius: '50%',
          background: isWishlisted ? 'rgba(255,107,90,0.95)' : 'rgba(255,255,255,0.95)',
          border: isWishlisted ? 'none' : '1px solid rgba(255,107,90,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          <Heart size={20} fill={isWishlisted ? 'white' : 'none'} color={isWishlisted ? 'white' : '#ff6b5a'} strokeWidth={2} />
        </button>

        {/* Badges */}
        <div style={{ position: 'absolute', top: 12, left: isAdmin ? 60 : 12, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 5 }}>
          {product.isNew && (
            <span style={{ background: 'linear-gradient(135deg, #5a8d8e 0%, #4a7d7e 100%)', color: 'white', padding: '6px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>
              New
            </span>
          )}
          {product.discount > 0 && (
            <span style={{ background: 'linear-gradient(135deg, #ff6b5a 0%, #ff8a7a 100%)', color: 'white', padding: '6px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Image */}
        <div style={{ paddingBottom: '133%', position: 'relative', backgroundColor: '#1a1f26', overflow: 'hidden' }}>
          <img
            src={imageSrc}
            alt={product.name}
            style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
            className="hover-scale"
            onError={e => { e.target.src = '/placeholder.png'; }}
          />
        </div>

        {/* Info */}
        <div style={{ padding: 16 }}>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6, fontWeight: 600 }}>
            {product.category}
          </p>
          <h3 style={{ fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 600, marginBottom: 10, color: 'var(--text-primary)', lineHeight: 1.3, minHeight: 40 }}>
            {product.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 700, color: product.discount > 0 ? 'var(--accent-coral)' : 'var(--text-primary)' }}>
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          {product.stock <= 5 && product.stock > 0 && (
            <p style={{ fontSize: 12, color: 'var(--accent-coral)', fontWeight: 600 }}>Only {product.stock} left!</p>
          )}
          {product.stock === 0 && (
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>Out of stock</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;