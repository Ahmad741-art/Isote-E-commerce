import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Shield } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // await authAPI.forgotPassword(email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
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
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(139, 0, 0, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'battleFloat 12s ease-in-out infinite reverse'
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
          {/* Back to Login */}
          <Link to="/login" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
            fontSize: '14px',
            color: 'var(--accent)',
            fontWeight: 600,
            textDecoration: 'none'
          }}>
            <ArrowLeft size={18} />
            Back to Login
          </Link>

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
              RESET PASSWORD
            </h1>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '1px'
            }}>
              {sent ? 'Check your email' : 'Enter your email to reset your password'}
            </p>
          </div>

          {!sent ? (
            <>
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail size={20} />
                      SEND RESET LINK
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div className="success-message" style={{ marginBottom: '24px' }}>
                <strong>✅ Email Sent!</strong><br />
                We've sent a password reset link to <strong>{email}</strong>
              </div>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                lineHeight: '1.8',
                marginBottom: '24px'
              }}>
                Please check your email and click the link to reset your password. 
                The link will expire in 1 hour.
              </p>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '13px'
              }}>
                Didn't receive the email?{' '}
                <button
                  onClick={() => setSent(false)}
                  style={{
                    color: 'var(--accent)',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Try again
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;