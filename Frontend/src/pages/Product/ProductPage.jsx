import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import { productsAPI } from '../../services/api';
import { useCart } from '../../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getById(id);
      setProduct(response.data);
      if (response.data.sizes?.length > 0) {
        setSelectedSize(response.data.sizes[0]);
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize && product.sizes?.length > 0) {
      alert('Please select a size');
      return;
    }

    try {
      await addToCart(product, quantity, selectedSize);
      alert('Added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="loading" style={{ minHeight: '60vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Product not found</h2>
      </div>
    );
  }

  const discountedPrice = product.price * (1 - (product.discount || 0) / 100);

  return (
    <div style={{ padding: '48px 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          marginBottom: '32px'
        }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
          {' / '}
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/shop')}>Shop</span>
          {' / '}
          <span>{product.name}</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '64px',
          marginBottom: '80px'
        }}>
          {/* Images */}
          <div>
            <div style={{
              marginBottom: '16px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '4px',
              overflow: 'hidden',
              paddingBottom: '133%',
              position: 'relative'
            }}>
              <img
                src={product.images?.[selectedImage] || '/placeholder.png'}
                alt={product.name}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {product.images?.length > 1 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: '12px'
              }}>
                {product.images.map((image, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    style={{
                      paddingBottom: '100%',
                      position: 'relative',
                      cursor: 'pointer',
                      border: selectedImage === idx ? '2px solid var(--primary)' : '2px solid transparent',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-secondary)'
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${idx + 1}`}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <p style={{
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: 'var(--text-light)',
                marginBottom: '8px'
              }}>
                {product.category}
              </p>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 40px)',
                marginBottom: '16px'
              }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < 4 ? 'var(--accent)' : 'none'}
                      color={i < 4 ? 'var(--accent)' : 'var(--text-light)'}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  (128 reviews)
                </span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: product.discount > 0 ? 'var(--accent)' : 'var(--primary)'
                }}>
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <>
                    <span style={{
                      fontSize: '24px',
                      color: 'var(--text-light)',
                      textDecoration: 'line-through'
                    }}>
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="badge badge-accent">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: 'var(--text-secondary)',
              marginBottom: '32px'
            }}>
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '12px'
                }}>
                  Select Size
                </label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '12px 24px',
                        border: `2px solid ${selectedSize === size ? 'var(--primary)' : 'var(--border)'}`,
                        backgroundColor: selectedSize === size ? 'var(--primary)' : 'white',
                        color: selectedSize === size ? 'white' : 'var(--text-primary)',
                        fontWeight: 600,
                        fontSize: '14px',
                        borderRadius: '4px'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px'
              }}>
                Quantity
              </label>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'white',
                    fontSize: '18px',
                    fontWeight: 600
                  }}
                >
                  -
                </button>
                <span style={{
                  width: '60px',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: 600
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'white',
                    fontSize: '18px',
                    fontWeight: 600
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ flex: 1, fontSize: '16px', padding: '16px' }}
              >
                <ShoppingBag size={20} />
                Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="btn-icon"
                style={{
                  width: '56px',
                  height: '56px',
                  border: '2px solid var(--border)',
                  borderRadius: '4px'
                }}
              >
                <Heart
                  size={24}
                  fill={isWishlisted ? 'var(--accent)' : 'none'}
                  color={isWishlisted ? 'var(--accent)' : 'var(--text-primary)'}
                />
              </button>
            </div>

            {/* Features */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '24px',
              borderRadius: '4px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Truck size={20} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: '4px' }}>Free Shipping</p>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      On orders over $100
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <RotateCcw size={20} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: '4px' }}>Easy Returns</p>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      30-day return policy
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Shield size={20} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: '4px' }}>Secure Payment</p>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      100% secure transactions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;