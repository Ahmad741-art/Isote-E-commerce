import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Package, DollarSign, Users, TrendingUp } from 'lucide-react';
import { productsAPI } from '../../services/api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll({ limit: 100 });
      const list = response.data.products || response.data.data || [];
      setProducts(list);
      setStats({
        totalProducts: list.length,
        totalRevenue: 125840,
        totalOrders: 342,
        totalUsers: 1205
      });
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
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // Resolve image URL whether images are {url, alt} objects or plain strings
  const getImageSrc = (product) => {
    const first = product.images?.[0];
    if (!first) return '/placeholder.png';
    if (typeof first === 'string') return first;
    return first.url || '/placeholder.png';
  };

  const statCards = [
    { icon: Package,     label: 'Total Products', value: stats.totalProducts,                        color: '#3b82f6' },
    { icon: DollarSign,  label: 'Revenue',         value: `$${stats.totalRevenue.toLocaleString()}`, color: '#10b981' },
    { icon: TrendingUp,  label: 'Orders',           value: stats.totalOrders,                         color: '#f59e0b' },
    { icon: Users,       label: 'Customers',        value: stats.totalUsers,                          color: '#8b5cf6' },
  ];

  return (
    <div style={{ padding: '48px 0', backgroundColor: 'var(--bg-secondary)', minHeight: '60vh' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 42px)' }}>
            Admin Dashboard
          </h1>
          <Link to="/admin/products/new" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={20} />
            Add Product
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card" style={{ padding: '24px', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '12px',
                    backgroundColor: `${stat.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Icon size={28} color={stat.color} />
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {stat.label}
                    </p>
                    <p style={{ fontSize: '28px', fontWeight: 700 }}>{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Products Table */}
        <div className="card" style={{ padding: '32px', backgroundColor: 'white' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
            Products Management
          </h2>

          {loading ? (
            <div className="loading"><div className="spinner" /></div>
          ) : products.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
              No products found. <Link to="/admin/products/new" style={{ color: '#3b82f6' }}>Add your first product.</Link>
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    {['Product', 'Category', 'Price', 'Stock', 'Actions'].map((h, i) => (
                      <th key={h} style={{
                        padding: '12px',
                        textAlign: i === 4 ? 'right' : 'left',
                        fontSize: '13px', fontWeight: 600,
                        color: 'var(--text-secondary)',
                        textTransform: 'uppercase', letterSpacing: '0.5px'
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <img
                            src={getImageSrc(product)}
                            alt={product.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#f5f5f5' }}
                            onError={(e) => { e.target.src = '/placeholder.png'; }}
                          />
                          <div>
                            <p style={{ fontWeight: 500, marginBottom: '2px' }}>{product.name}</p>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                              ID: {product._id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', fontSize: '13px', textTransform: 'capitalize' }}>
                        {product.category}
                      </td>
                      <td style={{ padding: '16px', fontWeight: 600 }}>
                        ${product.price}
                      </td>
                      <td style={{ padding: '16px' }}>
                        {/* Support both flat stock and sizes[] stock */}
                        {(() => {
                          const total = product.stock != null
                            ? product.stock
                            : (product.sizes?.reduce((s, sz) => s + (sz.stock || 0), 0) ?? 0);
                          return (
                            <span style={{
                              display: 'inline-flex', alignItems: 'center',
                              padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
                              background: total > 10 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                              color: total > 10 ? '#10b981' : '#ef4444',
                              border: `1px solid ${total > 10 ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
                            }}>
                              {total} in stock
                            </span>
                          );
                        })()}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            title="Edit product"
                            style={{
                              width: '36px', height: '36px', borderRadius: '6px',
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              border: '1px solid #d1d5db', color: '#374151',
                              transition: 'all 0.2s ease', textDecoration: 'none'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#f3f4f6'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            disabled={deletingId === product._id}
                            title="Delete product"
                            style={{
                              width: '36px', height: '36px', borderRadius: '6px',
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              border: '1px solid #fca5a5',
                              background: deletingId === product._id ? '#fee2e2' : 'transparent',
                              color: '#ef4444',
                              cursor: deletingId === product._id ? 'not-allowed' : 'pointer',
                              transition: 'all 0.2s ease',
                              opacity: deletingId === product._id ? 0.6 : 1,
                            }}
                            onMouseEnter={(e) => { if (deletingId !== product._id) e.currentTarget.style.background = '#fee2e2'; }}
                            onMouseLeave={(e) => { if (deletingId !== product._id) e.currentTarget.style.background = 'transparent'; }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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