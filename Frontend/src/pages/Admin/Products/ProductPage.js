import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams(); // id may be a Mongo ObjectId OR a slug
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const base = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        // treat param as ObjectId if it matches 24-hex chars, otherwise as slug
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
        const endpoint = isObjectId ? `${base}/products/${id}` : `${base}/products/slug/${id}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        // controllers in this repo return different shapes in places:
        // possible payloads: { success: true, data: product }  or { success: true, product }
        const productData = data && (data.data || data.product || data);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
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
      quantity,
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

  // handle image formats: product.images may be array of strings or objects with .url
  const firstImage =
    product.images?.[0]?.url || product.images?.[0] || '/placeholder-image.jpg';

  const price = typeof product.price === 'number' ? product.price : Number(product.price || 0);

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-images">
          <div className="main-image">
            <img src={firstImage} alt={product.name} />
          </div>
          <div className="thumbnail-images">
            {Array.isArray(product.images)
              ? product.images.slice(1, 4).map((img, index) => {
                  const src = img?.url || img;
                  return <img key={index} src={src} alt={`${product.name} ${index + 2}`} />;
                })
              : null}
          </div>
        </div>

        <div className="product-details">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">${price.toFixed ? price.toFixed(2) : price}</p>

          <div className="product-description">
            <p>{product.description}</p>
          </div>

          <div className="product-options">
            <div className="size-selector">
              <label>Size</label>
              <div className="size-buttons">
                {(product.sizes || []).map((s) => {
                  const sizeLabel = s.size || s;
                  return (
                    <button
                      key={sizeLabel}
                      className={`size-btn ${selectedSize === sizeLabel ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(sizeLabel)}
                    >
                      {sizeLabel}
                    </button>
                  );
                })}
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
              <p>{product.details || product.material || 'Premium quality materials and craftsmanship.'}</p>
            </details>
            <details>
              <summary>Care Instructions</summary>
              <p>{product.care || 'Follow care label instructions.'}</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;