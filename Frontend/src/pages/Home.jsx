import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, Truck, Award, Shield } from 'lucide-react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productsAPI.getAll({ limit: 8, featured: true });
      const productsData = response.data.products || response.data.data || response.data || [];
      setFeaturedProducts(productsData);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Hero Section with Mt. Fuji Background */}
      <section style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image - Mt. Fuji Sunset */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'url(https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
          transform: 'scale(1.05)'
        }} />
        
        {/* Elegant Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(26, 35, 50, 0.4) 0%, rgba(26, 35, 50, 0.8) 100%)'
        }} />

        <div className="container" style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center'
        }}>
          {/* Elegant Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 32px',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '2px',
            marginBottom: '40px',
            border: '1px solid rgba(212, 165, 116, 0.3)',
            animation: 'fadeIn 1s ease'
          }}>
            <span style={{ opacity: 0.7 }}>✦</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '13px',
              fontWeight: 400,
              letterSpacing: '0.12em',
              fontStyle: 'italic',
              color: 'var(--accent-gold)'
            }}>
              Curated for the Discerning
            </span>
            <span style={{ opacity: 0.7 }}>✦</span>
          </div>

          {/* Hero Title - Elegant Script */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(56px, 10vw, 110px)',
            fontWeight: 300,
            letterSpacing: '0.05em',
            marginBottom: '28px',
            lineHeight: 1.1,
            color: 'white',
            textShadow: '2px 4px 12px rgba(0, 0, 0, 0.8)',
            animation: 'fadeIn 1.2s ease 0.2s backwards',
            fontStyle: 'italic'
          }}>
            Where Art Meets
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #ff8c75 0%, #d4a574 50%, #8ca89d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 400
            }}>
              Elegance
            </span>
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(18px, 3vw, 26px)',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '48px',
            maxWidth: '700px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
            animation: 'fadeIn 1.4s ease 0.4s backwards',
            fontWeight: 300,
            letterSpacing: '0.03em'
          }}>
            Timeless pieces inspired by nature's beauty,
            <br />
            crafted for those who appreciate the extraordinary
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeIn 1.6s ease 0.6s backwards'
          }}>
            <Link to="/shop" className="btn btn-primary" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '15px',
              padding: '18px 48px',
              letterSpacing: '0.08em',
              fontWeight: 400
            }}>
              Explore Collection
            </Link>
            <Link to="/shop?featured=new" className="btn btn-outline" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '15px',
              padding: '18px 48px',
              letterSpacing: '0.08em',
              fontWeight: 400,
              borderColor: 'rgba(255, 255, 255, 0.4)',
              color: 'white'
            }}>
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section with Artistic Background */}
      <section style={{
        padding: '0',
        position: 'relative'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          minHeight: '70vh'
        }}>
          {/* Image Side - Artistic Pattern */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '500px'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'url(https://images.unsplash.com/photo-1604076947776-794f4f156540?w=1200&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.8s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, transparent 0%, rgba(26, 35, 50, 0.6) 100%)'
            }} />
          </div>

          {/* Content Side */}
          <div style={{
            padding: '80px 60px',
            background: 'linear-gradient(135deg, #2d3e50 0%, #1a2332 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              color: 'var(--accent-gold)',
              marginBottom: '20px',
              fontStyle: 'italic'
            }}>
              ✦ The Philosophy ✦
            </span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 300,
              letterSpacing: '0.03em',
              marginBottom: '28px',
              lineHeight: 1.2,
              fontStyle: 'italic'
            }}>
              Inspired by
              <br />
              <span className="nature-text" style={{ fontWeight: 400 }}>
                Timeless Beauty
              </span>
            </h2>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '17px',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '32px',
              letterSpacing: '0.02em'
            }}>
              Each piece in our collection tells a story of craftsmanship and attention to detail. 
              We curate only the finest designs that blend contemporary elegance with timeless appeal, 
              ensuring every item becomes a cherished part of your wardrobe.
            </p>
            <Link to="/shop" className="btn btn-outline" style={{
              width: 'fit-content',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '14px',
              padding: '14px 40px',
              letterSpacing: '0.08em'
            }}>
              Discover More
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, #1a2332 0%, #2d3e50 100%)',
        borderTop: '1px solid rgba(212, 165, 116, 0.15)',
        borderBottom: '1px solid rgba(212, 165, 116, 0.15)'
      }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            marginBottom: '70px'
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(38px, 6vw, 58px)',
              fontWeight: 300,
              marginBottom: '20px',
              fontStyle: 'italic',
              letterSpacing: '0.03em'
            }}>
              The <span className="nature-text" style={{ fontWeight: 400 }}>Isoté</span> Promise
            </h2>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '17px',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              letterSpacing: '0.02em'
            }}>
              Excellence in every detail
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px'
          }}>
            {[
              { 
                icon: Truck, 
                title: 'Complimentary Delivery', 
                desc: 'Enjoy free shipping on all orders above $100',
                color: 'var(--accent-coral)' 
              },
              { 
                icon: Award, 
                title: 'Artisan Quality', 
                desc: 'Each piece carefully selected for exceptional craftsmanship',
                color: 'var(--accent-gold)' 
              },
              { 
                icon: Shield, 
                title: 'Secure Shopping', 
                desc: 'Your privacy and security are our highest priority',
                color: 'var(--accent-teal)' 
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="card" style={{
                  padding: '48px 36px',
                  textAlign: 'center',
                  background: 'rgba(42, 58, 74, 0.5)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(212, 165, 116, 0.15)',
                  transition: 'all 0.5s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.15)';
                }}
                >
                  <div style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 24px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${feature.color}40`
                  }}>
                    <Icon size={28} color={feature.color} />
                  </div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '20px',
                    fontWeight: 500,
                    marginBottom: '16px',
                    letterSpacing: '0.03em',
                    color: feature.color
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    letterSpacing: '0.01em'
                  }}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, #2d3e50 0%, #1a2332 100%)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '60px',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(38px, 6vw, 58px)',
                fontWeight: 300,
                letterSpacing: '0.03em',
                marginBottom: '12px',
                fontStyle: 'italic'
              }}>
                <span className="nature-text" style={{ fontWeight: 400 }}>Featured</span> Collection
              </h2>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '16px',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em'
              }}>
                Handpicked for you
              </p>
            </div>
            <Link to="/shop" className="btn btn-outline" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '14px',
              padding: '12px 36px',
              letterSpacing: '0.08em'
            }}>
              View All
              <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner" />
            </div>
          ) : (
            <div className="grid grid-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, rgba(255, 107, 90, 0.12) 0%, rgba(90, 141, 142, 0.12) 100%)',
        borderTop: '1px solid rgba(212, 165, 116, 0.2)',
        borderBottom: '1px solid rgba(212, 165, 116, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Sparkles size={48} color="var(--accent-gold)" style={{ 
            margin: '0 auto 24px',
            opacity: 0.8
          }} />
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 300,
            marginBottom: '20px',
            fontStyle: 'italic',
            letterSpacing: '0.03em'
          }}>
            Join Our Community
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '17px',
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
            letterSpacing: '0.02em'
          }}>
            Subscribe for exclusive access to new arrivals, special offers,
            <br />
            and curated style inspiration
          </p>
          <form style={{
            display: 'flex',
            maxWidth: '600px',
            margin: '0 auto',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <input
              type="email"
              placeholder="Your email address"
              className="input"
              style={{
                flex: 1,
                minWidth: '280px',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '15px',
                letterSpacing: '0.02em'
              }}
            />
            <button className="btn btn-primary" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '14px',
              padding: '16px 40px',
              letterSpacing: '0.08em'
            }}>
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
      `}</style>
    </div>
  );
};

export default Home;