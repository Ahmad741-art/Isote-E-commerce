import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      if (data?.user?.role !== 'admin') {
        setError('Access denied. Admin accounts only.');
        return;
      }
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0e12 0%, #151a20 100%)', padding: '40px 24px'
    }}>
      <div style={{ width: '100%', maxWidth: 440, background: '#151a20', border: '1px solid #2a3038', borderRadius: 12, padding: '48px 40px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(212,165,92,0.15)', border: '2px solid #d4a65c',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'
          }}>
            <Shield size={36} color="#d4a65c" />
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: '#e8e8e8', letterSpacing: 2, marginBottom: 8 }}>
            Admin Portal
          </h1>
          <p style={{ color: '#a8adb5', fontSize: 14 }}>Isoté administration access</p>
        </div>

        {error && (
          <div style={{ padding: '12px 16px', background: 'rgba(255,107,90,0.1)', border: '1px solid rgba(255,107,90,0.3)', borderRadius: 6, color: '#ff6b5a', fontSize: 14, marginBottom: 24 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#a8adb5', marginBottom: 8 }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="admin@isote.com"
                style={{ width: '100%', padding: '12px 14px 12px 44px', background: '#1f2630', border: '1px solid #2a3038', borderRadius: 4, color: '#e8e8e8', fontSize: 14 }}
              />
              <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#a8adb5', pointerEvents: 'none' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#a8adb5', marginBottom: 8 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px 14px 12px 44px', background: '#1f2630', border: '1px solid #2a3038', borderRadius: 4, color: '#e8e8e8', fontSize: 14 }}
              />
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#a8adb5', pointerEvents: 'none' }} />
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            padding: 14, background: '#d4a65c', color: '#0a0e12',
            border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 700,
            letterSpacing: 1, cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, marginTop: 8
          }}>
            {loading ? 'Signing in...' : 'SIGN IN TO ADMIN'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7280', marginTop: 24 }}>
          Not an admin?{' '}
          <a href="/login" style={{ color: '#d4a65c', textDecoration: 'none' }}>Customer login →</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;