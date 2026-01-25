import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{
      minHeight: '80vh',
      padding: '80px 24px',
      background: 'linear-gradient(135deg, #0f0f1e 0%, #16213e 100%)'
    }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          textAlign: 'center',
          marginBottom: '60px',
          letterSpacing: '3px'
        }}>
          CONTACT US
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
            <Mail size={48} color="var(--accent)" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>EMAIL</h3>
            <a href="mailto:support@isote.com" style={{ color: 'var(--accent)' }}>
              support@isote.com
            </a>
          </div>

          <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
            <Phone size={48} color="var(--accent)" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>PHONE</h3>
            <a href="tel:+1234567890" style={{ color: 'var(--accent)' }}>
              +1 (234) 567-890
            </a>
          </div>

          <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
            <MapPin size={48} color="var(--accent)" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>ADDRESS</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              123 Fashion Avenue<br />
              New York, NY 10001
            </p>
          </div>
        </div>

        <div className="card" style={{ padding: '60px', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            marginBottom: '32px',
            textAlign: 'center',
            letterSpacing: '2px'
          }}>
            SEND US A MESSAGE
          </h2>

          {submitted && (
            <div className="success-message" style={{ marginBottom: '24px' }}>
              Message sent successfully! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                letterSpacing: '1px',
                fontSize: '13px',
                textTransform: 'uppercase'
              }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                className="input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                letterSpacing: '1px',
                fontSize: '13px',
                textTransform: 'uppercase'
              }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                className="input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                letterSpacing: '1px',
                fontSize: '13px',
                textTransform: 'uppercase'
              }}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                className="input"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                letterSpacing: '1px',
                fontSize: '13px',
                textTransform: 'uppercase'
              }}>
                Message
              </label>
              <textarea
                name="message"
                className="input"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
              />
            </div>

            <button type="submit" className="btn btn-accent" style={{ padding: '18px' }}>
              <Send size={20} />
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;