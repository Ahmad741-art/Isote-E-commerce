import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ordersAPI, authAPI } from '../../services/api';
import { formatPrice, formatDate } from '../../utils/formatPrice';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import './Account.css';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch user orders
      const { data } = await ordersAPI.getAll();
      setOrders(data.orders || []);

      // Set profile data
      if (user) {
        setProfileData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || '',
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load account data');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    try {
      await authAPI.updateProfile(profileData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    try {
      await authAPI.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const getStatusClass = (status) => {
    const statusClasses = {
      pending: 'status-pending',
      processing: 'status-processing',
      shipped: 'status-shipped',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled',
    };
    return statusClasses[status] || '';
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="account-page">
      <div className="container">
        <h1 className="account-title">My Account</h1>

        <div className="account-layout">
          {/* Sidebar */}
          <div className="account-sidebar">
            <div className="account-user">
              <div className="user-avatar">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <div className="user-info">
                <p className="user-name">{user?.firstName} {user?.lastName}</p>
                <p className="user-email">{user?.email}</p>
              </div>
            </div>

            <nav className="account-nav">
              <button
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Profile
              </button>

              <button
                className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
                Orders
              </button>

              <button
                className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Security
              </button>

              <button className="nav-item logout" onClick={handleLogout}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="account-content">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="tab-content">
                <h2>Profile Information</h2>
                <form onSubmit={handleProfileUpdate} className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="tab-content">
                <h2>Order History</h2>
                {orders.length === 0 ? (
                  <div className="empty-state">
                    <p>No orders yet</p>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map((order) => (
                      <div key={order._id} className="order-card">
                        <div className="order-header">
                          <div>
                            <p className="order-number">Order {order.orderNumber}</p>
                            <p className="order-date">{formatDate(order.createdAt)}</p>
                          </div>
                          <span className={`order-status ${getStatusClass(order.status)}`}>
                            {order.status}
                          </span>
                        </div>

                        <div className="order-items">
                          {order.items.map((item) => (
                            <div key={item._id} className="order-item">
                              <div className="order-item-image">
                                <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} />
                              </div>
                              <div className="order-item-info">
                                <p className="order-item-name">{item.name}</p>
                                <p className="order-item-details">
                                  Qty: {item.quantity} • {formatPrice(item.price)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="order-footer">
                          <p className="order-total">
                            Total: <strong>{formatPrice(order.total)}</strong>
                          </p>
                          <button className="btn btn-outline">View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="tab-content">
                <h2>Change Password</h2>
                <form onSubmit={handlePasswordChange} className="security-form">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                    />
                    <small>Must be at least 8 characters</small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn">
                    Update Password
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;