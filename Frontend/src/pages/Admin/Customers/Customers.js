import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import './Customers.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock data
      const mockCustomers = [
        {
          id: 1,
          name: 'John Smith',
          email: 'john@example.com',
          phone: '+1 (555) 123-4567',
          orders: 12,
          totalSpent: 2450.00,
          lastOrder: '2026-01-01',
          joined: '2024-05-15',
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '+1 (555) 234-5678',
          orders: 8,
          totalSpent: 1850.50,
          lastOrder: '2026-01-01',
          joined: '2024-08-22',
        },
        {
          id: 3,
          name: 'Michael Brown',
          email: 'michael@example.com',
          phone: '+1 (555) 345-6789',
          orders: 5,
          totalSpent: 875.00,
          lastOrder: '2025-12-31',
          joined: '2024-11-10',
        },
        {
          id: 4,
          name: 'Emily Davis',
          email: 'emily@example.com',
          phone: '+1 (555) 456-7890',
          orders: 15,
          totalSpent: 3200.00,
          lastOrder: '2025-12-30',
          joined: '2024-03-05',
        },
        {
          id: 5,
          name: 'David Wilson',
          email: 'david@example.com',
          phone: '+1 (555) 567-8901',
          orders: 3,
          totalSpent: 550.99,
          lastOrder: '2025-12-29',
          joined: '2025-01-20',
        },
      ];
      
      setCustomers(mockCustomers);
    } catch (error) {
      toast.error('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedCustomers = customers
    .filter((customer) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.phone.includes(searchTerm)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'orders':
          return b.orders - a.orders;
        case 'spent':
          return b.totalSpent - a.totalSpent;
        case 'recent':
          return new Date(b.lastOrder) - new Date(a.lastOrder);
        default:
          return 0;
      }
    });

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="customers-admin-page">
      <div className="container">
        <div className="page-header">
          <h1>Customer Management</h1>
          <p>View and manage customer information</p>
        </div>

        {/* Controls */}
        <div className="customers-controls">
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="sort-select-wrapper">
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Name</option>
              <option value="orders">Orders</option>
              <option value="spent">Total Spent</option>
              <option value="recent">Recent Activity</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{customers.length}</div>
            <div className="stat-label">Total Customers</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {customers.reduce((sum, c) => sum + c.orders, 0)}
            </div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}
            </div>
            <div className="stat-label">Total Revenue</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              ${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toFixed(2)}
            </div>
            <div className="stat-label">Avg. Order Value</div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="customers-table-container">
          <table className="customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedCustomers.length > 0 ? (
                filteredAndSortedCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar">
                          {getInitials(customer.name)}
                        </div>
                        <div className="customer-name">{customer.name}</div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div>{customer.email}</div>
                        <div className="phone-number">{customer.phone}</div>
                      </div>
                    </td>
                    <td>
                      <span className="orders-count">{customer.orders}</span>
                    </td>
                    <td className="total-spent">
                      ${customer.totalSpent.toFixed(2)}
                    </td>
                    <td>{new Date(customer.lastOrder).toLocaleDateString()}</td>
                    <td>{new Date(customer.joined).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon" title="View profile">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round"/>
                            <circle cx="12" cy="7" r="4" strokeWidth="2"/>
                          </svg>
                        </button>
                        <button className="btn-icon" title="View orders">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeWidth="2"/>
                            <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2"/>
                            <path d="M16 10a4 4 0 0 1-8 0" strokeWidth="2"/>
                          </svg>
                        </button>
                        <button className="btn-icon" title="Send email">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/>
                            <polyline points="22,6 12,13 2,6" strokeWidth="2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-results">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;