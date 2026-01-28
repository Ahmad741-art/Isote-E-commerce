import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)'
      }}>
        <div className="spinner" style={{ width: '48px', height: '48px' }} />
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but not admin, show access denied
  if (!isAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        padding: '40px'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '500px'
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
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-coral)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '32px',
            fontWeight: 400,
            marginBottom: '16px',
            fontStyle: 'italic',
            color: 'var(--text-primary)'
          }}>
            Access Denied
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '16px',
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            lineHeight: 1.7
          }}>
            This area is restricted to administrators only.
          </p>
          <a 
            href="/"
            className="btn btn-primary"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '15px',
              padding: '14px 40px',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  // User is admin, render the protected component
  return children;
};

export default AdminRoute;