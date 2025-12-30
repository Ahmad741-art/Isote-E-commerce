import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    const cartItem = {
      ...product,
      selectedSize,
      quantity
    };
    
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('cart', JSON.stringify([...existingCart, cartItem]));
    alert('Added to cart!');
  };

  if (loading) {
    return <div className="product-page-loading">Loading...</div>;
  }

  if (!product) {
    return <div className="product-page-error">Product not found</div>;
  }

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-images">
          <div className="main-image">
            <img src={product.images?.[0] || '/placeholder-image.jpg'} alt={product.name} />
          </div>
          <div className="thumbnail-images">
            {product.images?.slice(1, 4).map((img, index) => (
              <img key={index} src={img} alt={`${product.name} ${index + 2}`} />
            ))}
          </div>
        </div>

        <div className="product-details">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">${product.price}</p>
          
          <div className="product-description">
            <p>{product.description}</p>
          </div>

          <div className="product-options">
            <div className="size-selector">
              <label>Size</label>
              <div className="size-buttons">
                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <label>Quantity</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <div className="product-info">
            <details>
              <summary>Product Details</summary>
              <p>{product.details || 'Premium quality materials and craftsmanship.'}</p>
            </details>
            <details>
              <summary>Shipping & Returns</summary>
              <p>Free shipping on orders over $200. 30-day return policy.</p>
            </details>
            <details>
              <summary>Care Instructions</summary>
              <p>Dry clean only. Do not bleach.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;