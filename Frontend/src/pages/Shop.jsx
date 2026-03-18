import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Plus } from 'lucide-react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { isAdmin } = useAuth();

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
      setProducts(response.data.products || response.data.data || response.data || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductDeleted = (deletedId) => {
    setProducts(prev => prev.filter(p => p._id !== deletedId));
  };

  const updateFilters = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    const newParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => { if (v) newParams.set(k, v); });
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({ category: '', sort: '', search: '', minPrice: '', maxPrice: '' });
    setSearchParams(new URLSearchParams());
  };

  const activeFiltersCount = Object.values(filters).filter(v => v).length;

  const inputStyle = {
    fontFamily: "'Cormorant Garamond', serif", fontSize: 14, width: '100%',
    background: 'rgba(42, 58, 74, 0.4)', color: 'var(--text-primary)',
    border: '1px solid rgba(212, 165, 116, 0.3)', padding: '12px 14px', borderRadius: 4
  };

  return (
    <div style={{ padding: '60px 0 100px', background: 'linear-gradient(180deg, #1a2332 0%, #2d3e50 100%)', minHeight: '100vh' }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, marginBottom: 8, fontStyle: 'italic', letterSpacing: '0.03em', color: 'var(--text-primary)' }}>
              Shop Collection
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: 'var(--text-secondary)' }}>
              {products.length} {products.length === 1 ? 'product' : 'products'} available
            </p>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="btn btn-outline" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={18} />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>
        </div>

        <div style={{ display: 'flex', gap: 40, alignItems: 'start' }}>

          {/* Filters Sidebar */}
          {showFilters && (
            <aside style={{ width: 280, flexShrink: 0 }} className="filters-sidebar">
              <div className="card" style={{ padding: 32, background: 'var(--bg-card)', position: 'sticky', top: 100 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500, color: 'var(--text-primary)' }}>Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button onClick={clearFilters} style={{ fontSize: 13, color: 'var(--accent-coral)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant Garamond', serif", textDecoration: 'underline' }}>
                      Clear All
                    </button>
                  )}
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 500, marginBottom: 12, color: 'var(--text-primary)' }}>Category</label>
                  <select value={filters.category} onChange={e => updateFilters('category', e.target.value)} style={inputStyle}>
                    <option value="" style={{ background: '#1a2332' }}>All Categories</option>
                    <option value="Clothing" style={{ background: '#1a2332' }}>Clothing</option>
                    <option value="Outerwear" style={{ background: '#1a2332' }}>Outerwear</option>
                    <option value="Knitwear" style={{ background: '#1a2332' }}>Knitwear</option>
                    <option value="Tailoring" style={{ background: '#1a2332' }}>Tailoring</option>
                    <option value="Accessories" style={{ background: '#1a2332' }}>Accessories</option>
                    <option value="Footwear" style={{ background: '#1a2332' }}>Footwear</option>
                    <option value="Bags" style={{ background: '#1a2332' }}>Bags</option>
                    <option value="Jewelry" style={{ background: '#1a2332' }}>Jewelry</option>
                    <option value="Home" style={{ background: '#1a2332' }}>Home</option>
                  </select>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 500, marginBottom: 12, color: 'var(--text-primary)' }}>Sort By</label>
                  <select value={filters.sort} onChange={e => updateFilters('sort', e.target.value)} style={inputStyle}>
                    <option value="" style={{ background: '#1a2332' }}>Featured</option>
                    <option value="newest" style={{ background: '#1a2332' }}>Newest First</option>
                    <option value="popular" style={{ background: '#1a2332' }}>Most Popular</option>
                    <option value="price-asc" style={{ background: '#1a2332' }}>Price: Low to High</option>
                    <option value="price-desc" style={{ background: '#1a2332' }}>Price: High to Low</option>
                  </select>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 500, marginBottom: 12, color: 'var(--text-primary)' }}>Price Range</label>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <input type="number" placeholder="Min" value={filters.minPrice} onChange={e => updateFilters('minPrice', e.target.value)} style={{ ...inputStyle, padding: 10 }} />
                    <span style={{ color: 'var(--text-secondary)' }}>-</span>
                    <input type="number" placeholder="Max" value={filters.maxPrice} onChange={e => updateFilters('maxPrice', e.target.value)} style={{ ...inputStyle, padding: 10 }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 500, marginBottom: 12, color: 'var(--text-primary)' }}>Quick Filters</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { label: 'New Arrivals', action: () => updateFilters('sort', 'newest') },
                      { label: 'Best Sellers', action: () => updateFilters('sort', 'popular') },
                      { label: 'Under $100', action: () => updateFilters('maxPrice', '100') },
                      { label: 'Over $500', action: () => updateFilters('minPrice', '500') },
                    ].map((qf, idx) => (
                      <button key={idx} onClick={qf.action} style={{ padding: '10px 16px', background: 'rgba(212,165,116,0.1)', border: '1px solid rgba(212,165,116,0.3)', borderRadius: 4, color: 'var(--accent-gold)', fontSize: 13, fontFamily: "'Cormorant Garamond', serif", cursor: 'pointer', textAlign: 'left' }}>
                        {qf.label}
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
              <div className="loading" style={{ minHeight: 400 }}>
                <div className="spinner" style={{ width: 48, height: 48 }} />
              </div>
            ) : products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 40px', background: 'var(--bg-card)', borderRadius: 8 }}>
                <Filter size={40} color="var(--accent-coral)" style={{ margin: '0 auto 24px' }} />
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, marginBottom: 12, fontStyle: 'italic', color: 'var(--text-primary)' }}>No products found</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: 'var(--text-secondary)', marginBottom: 28 }}>Try adjusting your filters</p>
                <button onClick={clearFilters} className="btn btn-primary" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, padding: '14px 36px' }}>Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 32 }}>
                {products.map(product => (
                  <ProductCard key={product._id} product={product} onDeleted={handleProductDeleted} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Add Product button for admin */}
      {isAdmin && (
        <Link to="/admin/products/new" style={{
          position: 'fixed', bottom: 32, right: 32,
          width: 60, height: 60, borderRadius: '50%',
          background: '#d4a65c', color: '#0a0e12',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(212,165,92,0.5)',
          zIndex: 1000, transition: 'all 0.3s ease',
          textDecoration: 'none'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        title="Add new product"
        >
          <Plus size={28} />
        </Link>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
        @media (max-width: 968px) {
          .filters-sidebar { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.8); z-index: 1000; padding: 20px; overflow-y: auto; }
        }
      `}</style>
    </div>
  );
};

export default Shop;