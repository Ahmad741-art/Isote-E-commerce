import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.slug}`} className="product-card">
      <div className="product-image">
        <img
          src={product.images[0]?.url || 'https://via.placeholder.com/400'}
          alt={product.name}
        />
        {product.onSale && (
          <span className="sale-badge">Sale</span>
        )}
        {product.newArrival && !product.onSale && (
          <span className="new-badge">New</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="original-price">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
