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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll({ limit: 100 });
      setProducts(response.data.products || []);
      setStats({
        totalProducts: response.data.products?.length || 0,
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
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productsAPI.delete(id);
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
    }
  };

  const statCards = [
    { icon: Package, label: 'Total Products', value: stats.totalProducts, color: '#3b82f6' },
    { icon: DollarSign, label: 'Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, color: '#10b981' },
    { icon: TrendingUp, label: 'Orders', value: stats.totalOrders, color: '#f59e0b' },
    { icon: Users, label: 'Customers', value: stats.totalUsers, color: '#8b5cf6' }
  ];

  return (
    <div style={{ padding: '48px 0', backgroundColor: 'var(--bg-secondary)', minHeight: '60vh' }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 42px)'
          }}>
            Admin Dashboard
          </h1>
          <Link to="/admin/products/new" className="btn btn-primary">
            <Plus size={20} />
            Add Product
          </Link>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card" style={{
                padding: '24px',
                backgroundColor: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    backgroundColor: `${stat.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={28} color={stat.color} />
                  </div>
                  <div>
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      marginBottom: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {stat.label}
                    </p>
                    <p style={{ fontSize: '28px', fontWeight: 700 }}>
                      {stat.value}
                    </p>
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
            <div className="loading">
              <div className="spinner" />
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Product
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Category
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Price
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Stock
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <img
                            src={product.images?.[0] || '/placeholder.png'}
                            alt={product.name}
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                              backgroundColor: 'var(--bg-secondary)'
                            }}
                          />
                          <div>
                            <p style={{ fontWeight: 500, marginBottom: '2px' }}>{product.name}</p>
                            <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>
                              ID: {product._id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          fontSize: '13px',
                          textTransform: 'capitalize'
                        }}>
                          {product.category}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ fontWeight: 600 }}>${product.price}</span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span className={product.stock > 10 ? 'badge' : 'badge-accent'}>
                          {product.stock || 0} in stock
                        </span>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="btn-icon"
                            style={{ border: '1px solid var(--border)' }}
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="btn-icon"
                            style={{
                              border: '1px solid var(--error)',
                              color: 'var(--error)'
                            }}
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