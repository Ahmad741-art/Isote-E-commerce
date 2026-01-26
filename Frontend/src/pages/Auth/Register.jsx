import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      background: 'linear-gradient(135deg, #0f0f1e 0%, #16213e 50%, #1a1a2e 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(201, 169, 97, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'battleFloat 10s ease-in-out infinite'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '550px',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="card steel-border" style={{
          padding: '56px 48px',
          background: 'var(--bg-card)',
          position: 'relative'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Shield size={64} color="var(--accent)" style={{ margin: '0 auto 24px' }} />
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '36px',
              marginBottom: '12px',
              letterSpacing: '3px',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
            }}>
              CREATE ACCOUNT
            </h1>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '1px'
            }}>
              Join the Isoté community
            </p>
          </div>

          {error && (
            <div className="error-message" style={{ marginBottom: '28px' }}>
              <strong>⚠️ Error:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }}>
              <div>
                <label htmlFor="firstName" style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 700,
                  marginBottom: '10px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)'
                }}>
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  className="input"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                  style={{ fontWeight: 600 }}
                />
              </div>

              <div>
                <label htmlFor="lastName" style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 700,
                  marginBottom: '10px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)'
                }}>
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  className="input"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                  style={{ fontWeight: 600 }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 700,
                marginBottom: '10px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)'
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="input"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  style={{ paddingLeft: '48px', fontWeight: 600 }}
                />
                <Mail
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--accent)',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 700,
                marginBottom: '10px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  style={{ paddingLeft: '48px', fontWeight: 600 }}
                />
                <Lock
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--accent)',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 700,
                marginBottom: '10px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)'
              }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  className="input"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  style={{ paddingLeft: '48px', fontWeight: 600 }}
                />
                <Lock
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--accent)',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-accent forge-glow"
              disabled={loading}
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '15px',
                marginTop: '12px'
              }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                  Creating Account...
                </>
              ) : (
                <>
                  <User size={20} />
                  CREATE ACCOUNT
                </>
              )}
            </button>
          </form>

          <div className="divider" />

          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: 'var(--accent)',
              fontWeight: 700,
              textDecoration: 'underline',
              position: 'relative',
              zIndex: 1000,
              cursor: 'pointer'
            }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;