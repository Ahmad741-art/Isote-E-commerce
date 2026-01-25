import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    size: '',
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'newest'
  });

  const currentPage = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    fetchProducts();
  }, [searchParams, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 12,
        search: searchParams.get('search') || '',
        ...filters
      };

      console.log('Fetching products with params:', params);
      const response = await productsAPI.getAll(params);
      console.log('Products response:', response.data);
      
      // Handle both response.data.products and response.data.data
      const productsData = response.data.products || response.data.data || response.data || [];
      const totalPagesData = response.data.totalPages || response.data.pages || 1;
      
      setProducts(productsData);
      setTotalPages(totalPagesData);
      
      console.log('Products loaded:', productsData.length);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setSearchParams({ ...Object.fromEntries(searchParams), page: '1' });
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      size: '',
      minPrice: 0,
      maxPrice: 10000,
      sortBy: 'newest'
    });
    setSearchParams({});
  };

  const handlePageChange = (page) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ padding: '48px 0', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 48px)',
            marginBottom: '12px'
          }}>
            {filters.category
              ? filters.category.charAt(0).toUpperCase() + filters.category.slice(1)
              : 'All Products'}
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
            {products.length} products found
          </p>
        </div>

        {/* Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="input"
            style={{ width: 'auto', minWidth: '200px' }}
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: showFilters ? '280px 1fr' : '1fr', gap: '32px' }}>
          {/* Filters Sidebar */}
          {showFilters && (
            <div style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
              <Filters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          )}

          {/* Products Grid */}
          <div>
            {loading ? (
              <div className="loading">
                <div className="spinner" />
              </div>
            ) : products.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 20px',
                backgroundColor: 'white',
                borderRadius: '4px'
              }}>
                <p style={{
                  fontSize: '18px',
                  color: 'var(--text-secondary)',
                  marginBottom: '24px'
                }}>
                  No products found matching your criteria
                </p>
                <button onClick={handleClearFilters} className="btn btn-primary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-3">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;