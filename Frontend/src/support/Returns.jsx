import React from 'react';
import { RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Returns = () => {
  return (
    <div style={{
      minHeight: '80vh',
      padding: '80px 24px',
      background: 'linear-gradient(135deg, #0f0f1e 0%, #16213e 100%)'
    }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          textAlign: 'center',
          marginBottom: '20px',
          letterSpacing: '3px'
        }}>
          RETURNS &
          <br />
          EXCHANGES
        </h1>

        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          marginBottom: '60px',
          fontSize: '16px',
          maxWidth: '600px',
          margin: '0 auto 60px'
        }}>
          We want you to love your purchase. If you're not completely satisfied, we're here to help.
        </p>

        <div className="card" style={{ padding: '48px', marginBottom: '32px', background: 'var(--gradient-1)' }}>
          <div style={{ textAlign: 'center' }}>
            <RotateCcw size={64} color="var(--text-dark)" style={{ margin: '0 auto 24px' }} />
            <h2 style={{
              fontSize: '32px',
              marginBottom: '16px',
              letterSpacing: '2px',
              color: 'var(--text-dark)'
            }}>
              30-DAY RETURN POLICY
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-dark)',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Return any unworn, unwashed items within 30 days of delivery for a full refund or exchange
            </p>
          </div>
        </div>

        <div className="card" style={{ padding: '48px', marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '28px',
            marginBottom: '32px',
            letterSpacing: '2px'
          }}>
            RETURN CONDITIONS
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <CheckCircle size={24} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: 700 }}>
                  Items must be unworn and unwashed
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  Products should be in the same condition as when you received them
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <CheckCircle size={24} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: 700 }}>
                  Original packaging and tags attached
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  All tags must be attached and items returned in original packaging
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <CheckCircle size={24} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: 700 }}>
                  Returned within 30 days
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  You have 30 days from the delivery date to initiate your return
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '48px', marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '28px',
            marginBottom: '32px',
            letterSpacing: '2px'
          }}>
            HOW TO RETURN
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--gradient-1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--text-dark)',
                flexShrink: 0
              }}>
                1
              </div>
              <div>
                <h4 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 700 }}>
                  Initiate Return
                </h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  Log into your account and go to "My Orders". Select the item you wish to return and click "Return Item".
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--gradient-1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--text-dark)',
                flexShrink: 0
              }}>
                2
              </div>
              <div>
                <h4 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 700 }}>
                  Print Return Label
                </h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  You'll receive a prepaid return shipping label via email. Print it and attach it to your package.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--gradient-1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--text-dark)',
                flexShrink: 0
              }}>
                3
              </div>
              <div>
                <h4 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 700 }}>
                  Ship Your Return
                </h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  Drop off your package at any authorized shipping location. You'll receive a refund within 5-7 business days of us receiving your return.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '48px' }}>
          <h2 style={{
            fontSize: '28px',
            marginBottom: '32px',
            letterSpacing: '2px'
          }}>
            NON-RETURNABLE ITEMS
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <XCircle size={20} color="var(--accent-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ color: 'var(--text-secondary)' }}>Final sale items</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <XCircle size={20} color="var(--accent-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ color: 'var(--text-secondary)' }}>Underwear and intimates (for hygiene reasons)</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <XCircle size={20} color="var(--accent-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ color: 'var(--text-secondary)' }}>Personalized or custom-made items</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <XCircle size={20} color="var(--accent-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ color: 'var(--text-secondary)' }}>Gift cards</p>
            </div>
          </div>
        </div>

        <div className="card" style={{
          marginTop: '32px',
          padding: '32px',
          background: 'rgba(201, 169, 97, 0.1)',
          border: '2px solid var(--accent)'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <AlertCircle size={24} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: 700 }}>
                Need Help?
              </h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                If you have any questions about returns or exchanges, please contact our customer service team at{' '}
                <a href="mailto:support@isote.com" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                  support@isote.com
                </a>
                {' '}or call us at{' '}
                <a href="tel:+1234567890" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                  +1 (234) 567-890
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;