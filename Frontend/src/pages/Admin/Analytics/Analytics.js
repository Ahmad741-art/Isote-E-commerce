import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import './Analytics.css';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7days');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock data
      const mockStats = {
        revenue: {
          current: 45678.90,
          previous: 38945.20,
          change: 17.3,
        },
        orders: {
          current: 234,
          previous: 198,
          change: 18.2,
        },
        customers: {
          current: 156,
          previous: 142,
          change: 9.9,
        },
        avgOrderValue: {
          current: 195.20,
          previous: 196.70,
          change: -0.8,
        },
        topProducts: [
          { name: 'Cashmere Sweater', sales: 45, revenue: 6750 },
          { name: 'Silk Blouse', sales: 38, revenue: 5320 },
          { name: 'Tailored Trousers', sales: 32, revenue: 4480 },
          { name: 'Wool Coat', sales: 28, revenue: 8400 },
          { name: 'Linen Shirt', sales: 25, revenue: 2875 },
        ],
        topCategories: [
          { name: 'Tops', percentage: 35 },
          { name: 'Bottoms', percentage: 28 },
          { name: 'Outerwear', percentage: 20 },
          { name: 'Accessories', percentage: 12 },
          { name: 'Other', percentage: 5 },
        ],
        recentActivity: [
          { type: 'order', message: 'New order #ORD-234', time: '5 minutes ago' },
          { type: 'customer', message: 'New customer: Sarah Johnson', time: '12 minutes ago' },
          { type: 'order', message: 'Order #ORD-233 shipped', time: '1 hour ago' },
          { type: 'review', message: 'New 5-star review on Cashmere Sweater', time: '2 hours ago' },
          { type: 'order', message: 'New order #ORD-232', time: '3 hours ago' },
        ],
      };
      
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const getChangeIcon = (change) => {
    if (change > 0) {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="trend-up">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="17 6 23 6 23 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else if (change < 0) {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="trend-down">
          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="17 18 23 18 23 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    return null;
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="analytics-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Analytics Dashboard</h1>
            <p>Track your store's performance and insights</p>
          </div>
          
          <div className="time-range-selector">
            <button
              className={`range-btn ${timeRange === '7days' ? 'active' : ''}`}
              onClick={() => setTimeRange('7days')}
            >
              7 Days
            </button>
            <button
              className={`range-btn ${timeRange === '30days' ? 'active' : ''}`}
              onClick={() => setTimeRange('30days')}
            >
              30 Days
            </button>
            <button
              className={`range-btn ${timeRange === '90days' ? 'active' : ''}`}
              onClick={() => setTimeRange('90days')}
            >
              90 Days
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Total Revenue</span>
              <span className={`metric-change ${stats.revenue.change >= 0 ? 'positive' : 'negative'}`}>
                {getChangeIcon(stats.revenue.change)}
                {Math.abs(stats.revenue.change)}%
              </span>
            </div>
            <div className="metric-value">{formatCurrency(stats.revenue.current)}</div>
            <div className="metric-footer">vs {formatCurrency(stats.revenue.previous)} last period</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Orders</span>
              <span className={`metric-change ${stats.orders.change >= 0 ? 'positive' : 'negative'}`}>
                {getChangeIcon(stats.orders.change)}
                {Math.abs(stats.orders.change)}%
              </span>
            </div>
            <div className="metric-value">{stats.orders.current}</div>
            <div className="metric-footer">vs {stats.orders.previous} last period</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">New Customers</span>
              <span className={`metric-change ${stats.customers.change >= 0 ? 'positive' : 'negative'}`}>
                {getChangeIcon(stats.customers.change)}
                {Math.abs(stats.customers.change)}%
              </span>
            </div>
            <div className="metric-value">{stats.customers.current}</div>
            <div className="metric-footer">vs {stats.customers.previous} last period</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Avg Order Value</span>
              <span className={`metric-change ${stats.avgOrderValue.change >= 0 ? 'positive' : 'negative'}`}>
                {getChangeIcon(stats.avgOrderValue.change)}
                {Math.abs(stats.avgOrderValue.change)}%
              </span>
            </div>
            <div className="metric-value">{formatCurrency(stats.avgOrderValue.current)}</div>
            <div className="metric-footer">vs {formatCurrency(stats.avgOrderValue.previous)} last period</div>
          </div>
        </div>

        <div className="analytics-grid">
          {/* Top Products */}
          <div className="analytics-card">
            <h2>Top Products</h2>
            <div className="products-list">
              {stats.topProducts.map((product, index) => (
                <div key={index} className="product-item">
                  <div className="product-rank">{index + 1}</div>
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-stats">
                      {product.sales} sales · {formatCurrency(product.revenue)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="analytics-card">
            <h2>Sales by Category</h2>
            <div className="categories-list">
              {stats.topCategories.map((category, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <span className="category-name">{category.name}</span>
                    <span className="category-percentage">{category.percentage}%</span>
                  </div>
                  <div className="category-bar">
                    <div
                      className="category-fill"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="analytics-card full-width">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  {activity.type === 'order' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeWidth="2"/>
                      <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2"/>
                      <path d="M16 10a4 4 0 0 1-8 0" strokeWidth="2"/>
                    </svg>
                  )}
                  {activity.type === 'customer' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2"/>
                      <circle cx="12" cy="7" r="4" strokeWidth="2"/>
                    </svg>
                  )}
                  {activity.type === 'review' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeWidth="2"/>
                    </svg>
                  )}
                </div>
                <div className="activity-content">
                  <div className="activity-message">{activity.message}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;