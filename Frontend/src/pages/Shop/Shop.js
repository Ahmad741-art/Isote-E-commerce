import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import Filters from '../../components/Filters/Filters';
import Loader from '../../components/Loader/Loader';
import './Shop.css';

const Shop = () => {
  const { gender } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    gender: gender || searchParams.get('gender') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'newest',
  });

  useEffect(() => {
    if (gender) {
      setFilters(prev => ({ ...prev, gender }));
    }
  }, [gender]);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.gender) queryParams.append('gender', filters.gender);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.sort) queryParams.append('sort', filters.sort);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/products?${queryParams}`
      );
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      gender: gender || '',
      minPrice: '',
      maxPrice: '',
      sort: 'newest',
    });
  };

  const getPageTitle = () => {
    if (gender === 'Women') return "Women's Collection";
    if (gender === 'Men') return "Men's Collection";
    return 'All Products';
  };

  const getPageDescription = () => {
    if (gender === 'Women') return 'Discover timeless pieces for the modern woman';
    if (gender === 'Men') return 'Elevate your wardrobe with refined essentials';
    return 'Browse our complete collection of luxury fashion';
  };

  return (
    <div className="shop-page">
      <div className="shop-hero">
        <div className="container">
          <h1 className="shop-title">{getPageTitle()}</h1>
          <p className="shop-subtitle">{getPageDescription()}</p>
        </div>
      </div>

      <div className="container">
        <div className="shop-layout">
          <aside className="shop-sidebar">
            <Filters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          <main className="shop-main">
            <div className="shop-toolbar">
              <p className="results-count">
                {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            {loading ? (
              <div className="shop-loading">
                <Loader />
              </div>
            ) : products.length > 0 ? (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                  <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h2>No products found</h2>
                <p>Try adjusting your filters or browse all products</p>
                <Link to="/shop" className="btn btn-outline" onClick={handleClearFilters}>
                  View All Products
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;