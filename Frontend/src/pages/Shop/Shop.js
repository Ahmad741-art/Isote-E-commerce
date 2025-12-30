import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
      // Fallback to mock data if API fails
      setProducts(getMockProducts());
    }
  };

  const getMockProducts = () => {
    return [
      { _id: '1', name: 'Cashmere Sweater', price: 450, category: 'women', images: [] },
      { _id: '2', name: 'Silk Blouse', price: 380, category: 'women', images: [] },
      { _id: '3', name: 'Wool Coat', price: 890, category: 'men', images: [] },
      { _id: '4', name: 'Leather Bag', price: 650, category: 'accessories', images: [] },
      { _id: '5', name: 'Linen Shirt', price: 320, category: 'men', images: [] },
      { _id: '6', name: 'Cashmere Scarf', price: 280, category: 'accessories', images: [] },
    ];
  };

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    return product.category === filter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // newest
  });

  if (loading) {
    return <div className="shop-loading">Loading collection...</div>;
  }

  return (
    <div className="shop">
      <div className="shop-header">
        <h1>All Products</h1>
        <p>{sortedProducts.length} items</p>
      </div>

      <div className="shop-controls">
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'women' ? 'active' : ''} 
            onClick={() => setFilter('women')}
          >
            Women
          </button>
          <button 
            className={filter === 'men' ? 'active' : ''} 
            onClick={() => setFilter('men')}
          >
            Men
          </button>
          <button 
            className={filter === 'accessories' ? 'active' : ''} 
            onClick={() => setFilter('accessories')}
          >
            Accessories
          </button>
        </div>

        <div className="sort-dropdown">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {sortedProducts.map(product => (
          <Link to={`/product/${product._id}`} key={product._id} className="product-card">
            <div className="product-image">
              {product.images && product.images[0] ? (
                <img src={product.images[0]} alt={product.name} />
              ) : (
                <div className="placeholder-image"></div>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;