import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ordersAPI } from '../../services/api';

const Account = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  const tabs = [
    { id: 'profile',   label: 'Profile',   icon: User },
    { id: 'orders',    label: 'Orders',    icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings',  label: 'Settings',  icon: Settings },
  ];

  const s = {
    page:      { padding: '48px 0', background: '#0a0e12', minHeight: '100vh', color: '#e8e8e8' },
    card:      { background: '#151a20', border: '1px solid #2a3038', borderRadius: 8, padding: 32 },
    input:     { width: '100%', padding: '12px 14px', background: '#1f2630', border: '1px solid #2a3038', borderRadius: 4, color: '#e8e8e8', fontSize: 14, fontFamily: 'inherit' },
    label:     { display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#a8adb5', marginBottom: 8 },
    sectionH:  { fontSize: 22, fontWeight: 500, marginBottom: 24, color: '#e8e8e8', fontFamily: "'Cormorant Garamond', serif" },
  };

  return (
    <div style={s.page}>
      <div className="container">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 300, marginBottom: 40, color: '#e8e8e8', fontStyle: 'italic' }}>
          My Account
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32 }}>

          {/* Sidebar */}
          <div style={{ ...s.card, height: 'fit-content' }}>
            <div style={{ textAlign: 'center', paddingBottom: 24, marginBottom: 24, borderBottom: '1px solid #2a3038' }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4a65c, #c9a961)',
                color: '#0a0e12', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 28, fontWeight: 700,
                margin: '0 auto 16px'
              }}>
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: '#e8e8e8' }}>
                {user?.firstName} {user?.lastName}
              </h3>
              <p style={{ fontSize: 13, color: '#6b7280' }}>{user?.email}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {tabs.map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px', borderRadius: 6, border: 'none',
                    background: active ? 'rgba(212,165,92,0.15)' : 'transparent',
                    color: active ? '#d4a65c' : '#a8adb5',
                    fontSize: 14, fontWeight: active ? 600 : 400,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s ease', fontFamily: 'inherit'
                  }}>
                    <Icon size={17} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div>

            {/* Profile */}
            {activeTab === 'profile' && (
              <div style={s.card}>
                <h2 style={s.sectionH}>Personal Information</h2>
                {saved && (
                  <div style={{ padding: '12px 16px', background: 'rgba(90,141,142,0.15)', border: '1px solid rgba(90,141,142,0.3)', borderRadius: 6, color: '#5a8d8e', fontSize: 14, marginBottom: 24 }}>
                    Profile updated successfully!
                  </div>
                )}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div>
                      <label style={s.label}>First Name</label>
                      <input name="firstName" style={s.input} value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div>
                      <label style={s.label}>Last Name</label>
                      <input name="lastName" style={s.input} value={formData.lastName} onChange={handleChange} />
                    </div>
                  </div>
                  <div>
                    <label style={s.label}>Email</label>
                    <input name="email" type="email" style={s.input} value={formData.email} onChange={handleChange} />
                  </div>
                  <button type="submit" style={{
                    padding: '12px 32px', background: '#d4a65c', color: '#0a0e12',
                    border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 700,
                    letterSpacing: 1, cursor: 'pointer', width: 'fit-content'
                  }}>
                    SAVE CHANGES
                  </button>
                </form>
              </div>
            )}

            {/* Orders */}
            {activeTab === 'orders' && (
              <div style={s.card}>
                <h2 style={s.sectionH}>Order History</h2>
                {loading ? (
                  <div className="loading"><div className="spinner" /></div>
                ) : orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280' }}>
                    <Package size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                    <p>No orders yet</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {orders.map(order => (
                      <div key={order._id} style={{ padding: 20, border: '1px solid #2a3038', borderRadius: 6, background: '#1f2630' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                          <div>
                            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: '#e8e8e8' }}>
                              Order #{order._id?.slice(-8)}
                            </p>
                            <p style={{ fontSize: 13, color: '#6b7280' }}>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: 'rgba(90,141,142,0.15)', color: '#5a8d8e', border: '1px solid rgba(90,141,142,0.3)' }}>
                              {order.status}
                            </span>
                            <p style={{ fontSize: 16, fontWeight: 700, marginTop: 8, color: '#d4a65c' }}>
                              ${order.pricing?.total?.toFixed(2) || order.total?.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <p style={{ fontSize: 13, color: '#6b7280' }}>
                          {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses */}
            {activeTab === 'addresses' && (
              <div style={s.card}>
                <h2 style={s.sectionH}>Saved Addresses</h2>
                <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280' }}>
                  <MapPin size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                  <p>No saved addresses yet</p>
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div style={s.card}>
                <h2 style={s.sectionH}>Account Settings</h2>
                <p style={{ color: '#6b7280', fontSize: 14 }}>Manage your account preferences and settings.</p>
              </div>
            )}

          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            div[style*="grid-template-columns: 260px"] {
              grid-template-columns: 1fr !important;
            }
          }
          input:focus { outline: none; border-color: #d4a65c !important; }
        `}</style>
      </div>
    </div>
  );
};

export default Account;