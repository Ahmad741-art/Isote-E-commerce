import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ordersAPI } from '../../services/api';

const Account = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div style={{ padding: '48px 0', backgroundColor: 'var(--bg-secondary)', minHeight: '60vh' }}>
      <div className="container">
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5vw, 42px)',
          marginBottom: '40px'
        }}>
          My Account
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
          {/* Sidebar */}
          <div className="card" style={{ padding: '24px', backgroundColor: 'white', height: 'fit-content' }}>
            <div style={{
              textAlign: 'center',
              paddingBottom: '24px',
              marginBottom: '24px',
              borderBottom: '1px solid var(--border)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 600,
                margin: '0 auto 16px'
              }}>
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                {user?.firstName} {user?.lastName}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                {user?.email}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      backgroundColor: activeTab === tab.id ? 'var(--bg-secondary)' : 'transparent',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: activeTab === tab.id ? 600 : 500,
                      color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-primary)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div>
            {activeTab === 'profile' && (
              <div className="card" style={{ padding: '32px', backgroundColor: 'white' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
                  Personal Information
                </h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="input"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="input"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="input"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="card" style={{ padding: '32px', backgroundColor: 'white' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
                  Order History
                </h2>
                {loading ? (
                  <div className="loading">
                    <div className="spinner" />
                  </div>
                ) : orders.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 0' }}>
                    No orders yet
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {orders.map((order) => (
                      <div key={order._id} style={{
                        padding: '20px',
                        border: '1px solid var(--border)',
                        borderRadius: '4px'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '16px'
                        }}>
                          <div>
                            <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
                              Order #{order._id.slice(-8)}
                            </p>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span className="badge">
                              {order.status}
                            </span>
                            <p style={{ fontSize: '16px', fontWeight: 600, marginTop: '8px' }}>
                              ${order.total.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="card" style={{ padding: '32px', backgroundColor: 'white' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
                  Saved Addresses
                </h2>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 0' }}>
                  No saved addresses yet
                </p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="card" style={{ padding: '32px', backgroundColor: 'white' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
                  Account Settings
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Manage your account preferences and settings
                </p>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 968px) {
            div[style*="grid-template-columns: 280px 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Account;