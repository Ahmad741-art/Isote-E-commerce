import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Package, DollarSign, Users, TrendingUp, LogOut } from 'lucide-react';
import { productsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ totalProducts: 0, totalRevenue: 0, totalOrders: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll({ limit: 100 });
      const list = response.data.products || response.data.data || [];
      setProducts(list);
      setStats({ totalProducts: list.length, totalRevenue: 125840, totalOrders: 342, totalUsers: 1205 });
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setDeletingId(id);
    try {
      await productsAPI.delete(id);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch {
      alert('Failed to delete product.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const getImageSrc = (product) => {
    const first = product.images?.[0];
    if (!first) return '/placeholder.png';
    if (typeof first === 'string') return first;
    return first.url || '/placeholder.png';
  };

  const statCards = [
    { icon: Package,    label: 'Total Products', value: stats.totalProducts,                        color: '#5a8d8e' },
    { icon: DollarSign, label: 'Revenue',         value: `$${stats.totalRevenue.toLocaleString()}`, color: '#d4a65c' },
    { icon: TrendingUp, label: 'Orders',           value: stats.totalOrders,                         color: '#a78bfa' },
    { icon: Users,      label: 'Customers',        value: stats.totalUsers,                          color: '#ff6b5a' },
  ];

  const s = {
    page:    { padding: '48px 0', background: '#0a0e12', minHeight: '100vh', color: '#e8e8e8' },
    card:    { background: '#151a20', border: '1px solid #2a3038', borderRadius: 8 },
    th:      { padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '1px solid #2a3038' },
    td:      { padding: '16px', borderBottom: '1px solid #1a1f26', fontSize: 14, color: '#e8e8e8', verticalAlign: 'middle' },
  };

  return (
    <div style={s.page}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 300, color: '#e8e8e8', fontStyle: 'italic' }}>
              Admin Dashboard
            </h1>
            <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>Manage your Isoté store</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/admin/products/new" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', background: '#d4a65c', color: '#0a0e12',
              borderRadius: 4, fontSize: 13, fontWeight: 700, letterSpacing: 1,
              textDecoration: 'none', transition: 'all 0.2s ease'
            }}>
              <Plus size={18} />
              ADD PRODUCT
            </Link>
            <button onClick={handleLogout} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 20px', background: 'transparent',
              border: '1px solid rgba(255,107,90,0.4)', borderRadius: 4,
              color: '#ff6b5a', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: 'inherit'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,107,90,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <LogOut size={16} />
              SIGN OUT
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
          {statCards.map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} style={{ ...s.card, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, background: `${stat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${stat.color}40` }}>
                    <Icon size={24} color={stat.color} />
                  </div>
                  <div>
                    <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>{stat.label}</p>
                    <p style={{ fontSize: 26, fontWeight: 700, color: '#e8e8e8' }}>{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Products Table */}
        <div style={{ ...s.card, overflow: 'hidden' }}>
          <div style={{ padding: '24px 32px', borderBottom: '1px solid #2a3038', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#e8e8e8' }}>Products</h2>
            <span style={{ fontSize: 13, color: '#6b7280' }}>{products.length} total</span>
          </div>

          {loading ? (
            <div className="loading" style={{ padding: 60 }}><div className="spinner" /></div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 40px', color: '#6b7280' }}>
              <Package size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p style={{ marginBottom: 20 }}>No products yet.</p>
              <Link to="/admin/products/new" style={{ color: '#d4a65c' }}>Add your first product →</Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#1a1f26' }}>
                    <th style={s.th}>Product</th>
                    <th style={s.th}>Category</th>
                    <th style={s.th}>Price</th>
                    <th style={s.th}>Stock</th>
                    <th style={s.th}>Status</th>
                    <th style={{ ...s.th, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => {
                    const totalStock = product.stock != null
                      ? product.stock
                      : (product.sizes?.reduce((s, sz) => s + (sz.stock || 0), 0) ?? 0);
                    const inStock = totalStock > 0;
                    return (
                      <tr key={product._id} style={{ transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#1a1f26'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={s.td}>
                          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                            <img
                              src={getImageSrc(product)} alt={product.name}
                              style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 6, background: '#1f2630', border: '1px solid #2a3038' }}
                              onError={e => { e.target.src = '/placeholder.png'; }}
                            />
                            <div>
                              <p style={{ fontWeight: 600, marginBottom: 2, color: '#e8e8e8', fontSize: 14 }}>{product.name}</p>
                              <p style={{ fontSize: 12, color: '#6b7280' }}>#{product._id?.slice(-8)}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ ...s.td, color: '#a8adb5' }}>{product.category}</td>
                        <td style={{ ...s.td, fontWeight: 700, color: '#d4a65c' }}>${product.price}</td>
                        <td style={s.td}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', padding: '4px 10px',
                            borderRadius: 20, fontSize: 12, fontWeight: 600,
                            background: inStock ? 'rgba(90,141,142,0.15)' : 'rgba(255,107,90,0.15)',
                            color: inStock ? '#5a8d8e' : '#ff6b5a',
                            border: `1px solid ${inStock ? 'rgba(90,141,142,0.3)' : 'rgba(255,107,90,0.3)'}`
                          }}>
                            {totalStock} in stock
                          </span>
                        </td>
                        <td style={s.td}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', padding: '4px 10px',
                            borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5,
                            background: product.status === 'active' ? 'rgba(212,165,92,0.15)' : 'rgba(107,114,128,0.15)',
                            color: product.status === 'active' ? '#d4a65c' : '#6b7280',
                            border: `1px solid ${product.status === 'active' ? 'rgba(212,165,92,0.3)' : 'rgba(107,114,128,0.3)'}`
                          }}>
                            {product.status || 'active'}
                          </span>
                        </td>
                        <td style={{ ...s.td, textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <Link to={`/admin/products/edit/${product._id}`} style={{
                              width: 36, height: 36, borderRadius: 6, display: 'inline-flex',
                              alignItems: 'center', justifyContent: 'center',
                              border: '1px solid #2a3038', color: '#a8adb5',
                              background: 'transparent', textDecoration: 'none', transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4a65c'; e.currentTarget.style.color = '#d4a65c'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a3038'; e.currentTarget.style.color = '#a8adb5'; }}
                            title="Edit product"
                            >
                              <Edit size={15} />
                            </Link>
                            <button
                              onClick={() => handleDelete(product._id)}
                              disabled={deletingId === product._id}
                              style={{
                                width: 36, height: 36, borderRadius: 6, display: 'inline-flex',
                                alignItems: 'center', justifyContent: 'center',
                                border: '1px solid rgba(255,107,90,0.3)', color: '#ff6b5a',
                                background: 'transparent', cursor: deletingId === product._id ? 'not-allowed' : 'pointer',
                                opacity: deletingId === product._id ? 0.5 : 1, transition: 'all 0.2s ease', fontFamily: 'inherit'
                              }}
                              onMouseEnter={e => { if (deletingId !== product._id) e.currentTarget.style.background = 'rgba(255,107,90,0.1)'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                              title="Delete product"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;