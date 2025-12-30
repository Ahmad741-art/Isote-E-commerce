import React from 'react';
import { Link } from 'react-router-dom';
import WishlistButton from '../WishlistButton/WishlistButton';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-image"
          />
        </Link>
        <WishlistButton productId={product._id} className="product-wishlist-btn" />
      </div>

      <div className="product-info">
        <Link to={`/product/${product._id}`} className="product-link">
          <h3 className="product-name">{product.name}</h3>
        </Link>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
                ★
              </span>
            ))}
          </div>
          <span className="review-count">({product.numReviews})</span>
        </div>

        <p className="product-price">${product.price.toFixed(2)}</p>

        {product.stock === 0 && (
          <span className="out-of-stock">Out of Stock</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;