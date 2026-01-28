import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown } from 'lucide-react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || '',
    search: searchParams.get('search') || '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        category: searchParams.get('category'),
        sort: searchParams.get('sort'),
        search: searchParams.get('search'),
        minPrice: searchParams.get('minPrice'),
        maxPrice: searchParams.get('maxPrice')
      };

      const response = await productsAPI.getAll(params);
      const productsData = response.data.products || response.data.data || response.data || [];
      setProducts(productsData);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update URL params
    const newParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) newParams.set(k, v);
    });
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      sort: '',
      search: '',
      minPrice: '',
      maxPrice: ''
    });
    setSearchParams(new URLSearchParams());
  };

  const activeFiltersCount = Object.values(filters).filter(v => v).length;

  return (
    <div style={{ 
      padding: '60px 0 100px',
      background: 'linear-gradient(180deg, #1a2332 0%, #2d3e50 100%)',
      minHeight: '100vh'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '48px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 300,
              marginBottom: '8px',
              fontStyle: 'italic',
              letterSpacing: '0.03em',
              color: 'var(--text-primary)'
            }}>
              Shop Collection
            </h1>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '16px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em'
            }}>
              {products.length} {products.length === 1 ? 'product' : 'products'} available
            </p>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '14px',
              padding: '12px 28px',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Filter size={18} />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '40px', alignItems: 'start' }}>
          
          {/* Filters Sidebar */}
          {showFilters && (
            <aside style={{
              width: '280px',
              flexShrink: 0
            }}
            className="filters-sidebar"
            >
              <div className="card" style={{
                padding: '32px',
                background: 'var(--bg-card)',
                position: 'sticky',
                top: '100px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '28px'
                }}>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '20px',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    color: 'var(--text-primary)'
                  }}>
                    Filters
                  </h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      style={{
                        fontSize: '13px',
                        color: 'var(--accent-coral)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: "'Cormorant Garamond', serif",
                        textDecoration: 'underline'
                      }}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{
                    display: 'block',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '15px',
                    fontWeight: 500,
                    marginBottom: '12px',
                    color: 'var(--text-primary)',
                    letterSpacing: '0.02em'
                  }}>
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilters('category', e.target.value)}
                    className="input"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '14px',
                      width: '100%',
                      background: 'rgba(42, 58, 74, 0.4)',
                      color: 'var(--text-primary)',
                      border: '1px solid rgba(212, 165, 116, 0.3)',
                      padding: '12px 14px',
                      borderRadius: '4px'
                    }}
                  >
                    <option value="" style={{ background: '#1a2332', color: 'white' }}>All Categories</option>
                    <option value="women" style={{ background: '#1a2332', color: 'white' }}>Women</option>
                    <option value="men" style={{ background: '#1a2332', color: 'white' }}>Men</option>
                    <option value="accessories" style={{ background: '#1a2332', color: 'white' }}>Accessories</option>
                  </select>
                </div>

                {/* Sort Filter */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{
                    display: 'block',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '15px',
                    fontWeight: 500,
                    marginBottom: '12px',
                    color: 'var(--text-primary)',
                    letterSpacing: '0.02em'
                  }}>
                    Sort By
                  </label>
                  <select
                    value={filters.sort}
                    onChange={(e) => updateFilters('sort', e.target.value)}
                    className="input"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '14px',
                      width: '100%',
                      background: 'rgba(42, 58, 74, 0.4)',
                      color: 'var(--text-primary)',
                      border: '1px solid rgba(212, 165, 116, 0.3)',
                      padding: '12px 14px',
                      borderRadius: '4px'
                    }}
                  >
                    <option value="" style={{ background: '#1a2332', color: 'white' }}>Featured</option>
                    <option value="newest" style={{ background: '#1a2332', color: 'white' }}>Newest First</option>
                    <option value="popular" style={{ background: '#1a2332', color: 'white' }}>Most Popular</option>
                    <option value="price-low" style={{ background: '#1a2332', color: 'white' }}>Price: Low to High</option>
                    <option value="price-high" style={{ background: '#1a2332', color: 'white' }}>Price: High to Low</option>
                  </select>
                </div>

                {/* Price Range */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{
                    display: 'block',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '15px',
                    fontWeight: 500,
                    marginBottom: '12px',
                    color: 'var(--text-primary)',
                    letterSpacing: '0.02em'
                  }}>
                    Price Range
                  </label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => updateFilters('minPrice', e.target.value)}
                      className="input"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '14px',
                        flex: 1,
                        background: 'rgba(42, 58, 74, 0.4)',
                        color: 'var(--text-primary)',
                        border: '1px solid rgba(212, 165, 116, 0.3)',
                        padding: '10px',
                        borderRadius: '4px'
                      }}
                    />
                    <span style={{ 
                      color: 'var(--text-secondary)',
                      fontFamily: "'Cormorant Garamond', serif"
                    }}>
                      -
                    </span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilters('maxPrice', e.target.value)}
                      className="input"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '14px',
                        flex: 1,
                        background: 'rgba(42, 58, 74, 0.4)',
                        color: 'var(--text-primary)',
                        border: '1px solid rgba(212, 165, 116, 0.3)',
                        padding: '10px',
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                </div>

                {/* Quick Filters */}
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '15px',
                    fontWeight: 500,
                    marginBottom: '12px',
                    color: 'var(--text-primary)',
                    letterSpacing: '0.02em'
                  }}>
                    Quick Filters
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { label: 'New Arrivals', value: 'newest' },
                      { label: 'Best Sellers', value: 'popular' },
                      { label: 'Under $50', maxPrice: '50' },
                      { label: 'Over $100', minPrice: '100' }
                    ].map((quickFilter, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (quickFilter.value) {
                            updateFilters('sort', quickFilter.value);
                          } else if (quickFilter.maxPrice) {
                            updateFilters('maxPrice', quickFilter.maxPrice);
                          } else if (quickFilter.minPrice) {
                            updateFilters('minPrice', quickFilter.minPrice);
                          }
                        }}
                        style={{
                          padding: '10px 16px',
                          background: 'rgba(212, 165, 116, 0.1)',
                          border: '1px solid rgba(212, 165, 116, 0.3)',
                          borderRadius: '4px',
                          color: 'var(--accent-gold)',
                          fontSize: '13px',
                          fontFamily: "'Cormorant Garamond', serif",
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.3s ease',
                          letterSpacing: '0.02em'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(212, 165, 116, 0.2)';
                          e.currentTarget.style.borderColor = 'var(--accent-gold)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(212, 165, 116, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.3)';
                        }}
                      >
                        {quickFilter.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <div style={{ flex: 1 }}>
            {loading ? (
              <div className="loading" style={{ minHeight: '400px' }}>
                <div className="spinner" style={{ width: '48px', height: '48px' }} />
              </div>
            ) : products.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 40px',
                background: 'var(--bg-card)',
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 107, 90, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--accent-coral)'
                }}>
                  <Filter size={40} color="var(--accent-coral)" />
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '28px',
                  fontWeight: 400,
                  marginBottom: '12px',
                  fontStyle: 'italic',
                  color: 'var(--text-primary)'
                }}>
                  No products found
                </h3>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '16px',
                  color: 'var(--text-secondary)',
                  marginBottom: '28px'
                }}>
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="btn btn-primary"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '15px',
                    padding: '14px 36px',
                    letterSpacing: '0.05em'
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-3" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '32px'
              }}>
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
        
        @media (max-width: 968px) {
          .filters-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            padding: 20px;
            overflow-y: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Shop;