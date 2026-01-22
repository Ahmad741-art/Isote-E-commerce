import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Award, Truck } from 'lucide-react';
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
      setFeaturedProducts(response.data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-secondary)',
        backgroundImage: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'url(/placeholder.png) center/cover',
          opacity: 0.3
        }} />
        <div className="container" style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 700,
            letterSpacing: '2px',
            marginBottom: '24px',
            lineHeight: 1.1
          }}>
            ELEVATE YOUR STYLE
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Discover timeless pieces crafted for the modern individual. Premium quality meets contemporary design.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-primary" style={{ fontSize: '16px', padding: '18px 48px' }}>
              Shop Now
              <ArrowRight size={20} />
            </Link>
            <Link to="/shop?category=new" className="btn btn-outline" style={{ fontSize: '16px', padding: '18px 48px' }}>
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '48px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '50%'
              }}>
                <Truck size={28} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Free Shipping</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                On all orders over $100
              </p>
            </div>
            <div>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '50%'
              }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Premium Quality</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Carefully curated collections
              </p>
            </div>
            <div>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '50%'
              }}>
                <TrendingUp size={28} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Latest Trends</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                New arrivals every week
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 48px)',
            textAlign: 'center',
            marginBottom: '56px'
          }}>
            Shop By Category
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {[
              { title: 'Women', image: '/placeholder.png', link: '/shop?category=women' },
              { title: 'Men', image: '/placeholder.png', link: '/shop?category=men' },
              { title: 'Accessories', image: '/placeholder.png', link: '/shop?category=accessories' }
            ].map((category) => (
              <Link
                key={category.title}
                to={category.link}
                style={{
                  position: 'relative',
                  paddingBottom: '120%',
                  overflow: 'hidden',
                  borderRadius: '4px',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '32px'
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '32px',
                    color: 'white',
                    fontWeight: 600
                  }}>
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '48px'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 48px)'
            }}>
              Featured Products
            </h2>
            <Link to="/shop" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
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
        backgroundColor: 'var(--primary)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 42px)',
            marginBottom: '16px'
          }}>
            Join Our Community
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#ccc',
            marginBottom: '32px',
            maxWidth: '500px',
            margin: '0 auto 32px'
          }}>
            Subscribe to receive exclusive offers, style tips, and be the first to know about new arrivals.
          </p>
          <form style={{
            display: 'flex',
            maxWidth: '500px',
            margin: '0 auto',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              className="input"
              style={{
                flex: 1,
                minWidth: '250px',
                backgroundColor: 'white'
              }}
            />
            <button className="btn btn-accent" style={{ padding: '14px 40px' }}>
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;