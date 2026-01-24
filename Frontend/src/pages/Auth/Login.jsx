import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Shield, Sword } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    setLoading(true);

    try {
      console.log('Attempting login with:', formData.email);
      await login(formData.email, formData.password);
      console.log('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
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
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(201, 169, 97, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'battleFloat 10s ease-in-out infinite'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '500px',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="card steel-border" style={{
          padding: '56px 48px',
          background: 'var(--bg-card)',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Shield size={64} color="var(--accent)" style={{ margin: '0 auto 24px' }} />
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '36px',
              marginBottom: '12px',
              letterSpacing: '3px',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
            }}>
              WELCOME BACK
            </h1>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '1px'
            }}>
              Sign in to your account
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
            gap: '24px',
            position: 'relative',
            zIndex: 100
          }}>
            <div style={{ position: 'relative', zIndex: 100 }}>
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
                  style={{
                    paddingLeft: '48px',
                    fontWeight: 600,
                    position: 'relative',
                    zIndex: 100,
                    pointerEvents: 'auto'
                  }}
                />
                <Mail
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--accent)',
                    pointerEvents: 'none',
                    zIndex: 101
                  }}
                />
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 100 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <label htmlFor="password" style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)'
                }}>
                  Password
                </label>
                <a href="#" style={{
                  fontSize: '12px',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}>
                  Forgot?
                </a>
              </div>
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
                  autoComplete="current-password"
                  style={{
                    paddingLeft: '48px',
                    fontWeight: 600,
                    position: 'relative',
                    zIndex: 100,
                    pointerEvents: 'auto'
                  }}
                />
                <Lock
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--accent)',
                    pointerEvents: 'none',
                    zIndex: 101
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
                marginTop: '12px',
                position: 'relative',
                zIndex: 100,
                pointerEvents: 'auto'
              }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                  Signing In...
                </>
              ) : (
                <>
                  <Shield size={20} />
                  SIGN IN
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
            Don't have an account?{' '}
            <Link to="/register" style={{
              color: 'var(--accent)',
              fontWeight: 700,
              textDecoration: 'underline'
            }}>
              Create Account
            </Link>
          </p>

          {/* Debug Info */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: 'rgba(201, 169, 97, 0.1)',
            borderRadius: '8px',
            border: '2px solid var(--border)'
          }}>
            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
              fontWeight: 700
            }}>
              🛡️ DEFAULT CREDENTIALS:
            </p>
            <p style={{
              fontSize: '12px',
              color: 'var(--accent)',
              fontFamily: 'monospace'
            }}>
              Email: admin@isote.com<br />
              Password: Admin123!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;