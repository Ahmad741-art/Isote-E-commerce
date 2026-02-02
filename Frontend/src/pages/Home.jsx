import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll({ limit: 8 });
      setProducts(response.data.products || response.data.data || response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ========================================
          HERO SECTION - IMAGE 1 (Panther/Snake)
          ======================================== */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `url(/images/efe4.jpg) center/cover no-repeat`,
          filter: 'brightness(0.4)',
          zIndex: 0
        }} />

        {/* Hero Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 20px'
        }}>
          {/* Fancy Isoté Logo */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(48px, 8vw, 72px)',
            fontWeight: 300,
            color: '#d4a65c',
            letterSpacing: '6px',
            fontStyle: 'italic',
            marginBottom: '32px'
          }}>
            Isoté
          </div>
          
          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 600,
            color: '#e8e8e8',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            TIMELESS ELEGANCE
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#a8adb5',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: 1.7
          }}>
            Discover our curated collection inspired by Japanese artistry and modern design
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/shop" className="btn btn-primary">
              EXPLORE COLLECTION
            </Link>
            <Link to="/shop?sort=newest" className="btn btn-outline">
              NEW ARRIVALS
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================
          FEATURED PRODUCTS GRID
          ======================================== */}
      <section style={{ padding: '100px 0', background: '#0a0e12' }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#e8e8e8'
            }}>
              FEATURED PIECES
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#a8adb5'
            }}>
              Hand-selected items for the discerning
            </p>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner" />
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-4">
                {products.slice(0, 8).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <Link to="/shop" className="btn btn-outline">
                  VIEW ALL PRODUCTS
                </Link>
              </div>
            </>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#a8adb5'
            }}>
              <p style={{ fontSize: '16px', marginBottom: '20px' }}>
                No products available yet
              </p>
              <Link to="/shop" className="btn btn-outline">
                Browse Shop
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ========================================
          CATEGORY CARDS - IMAGES 1 & 2
          ======================================== */}
      <section style={{ padding: '100px 0', background: '#151a20' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}>
            
            {/* Card 1 - New Arrivals (Image 2 - Fuji) */}
            <Link to="/shop?sort=newest" style={{
              position: 'relative',
              height: '500px',
              overflow: 'hidden',
              display: 'block',
              background: '#1a1f26'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `url(/images/efe2.jpg) center/cover no-repeat`,
                transition: 'transform 0.6s ease',
                filter: 'brightness(0.7)'
              }}
              className="hover-scale"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '40px'
              }}>
                <div>
                  <p style={{
                    fontSize: '12px',
                    letterSpacing: '2px',
                    color: '#d4a65c',
                    marginBottom: '8px',
                    fontWeight: 600
                  }}>
                    NEW ARRIVALS
                  </p>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: 600,
                    color: '#e8e8e8',
                    marginBottom: '12px'
                  }}>
                    Fresh Collection
                  </h3>
                  <p style={{
                    color: '#a8adb5',
                    fontSize: '14px',
                    marginBottom: '16px'
                  }}>
                    Discover the latest pieces
                  </p>
                  <span style={{
                    color: '#d4a65c',
                    fontSize: '14px',
                    letterSpacing: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    SHOP NOW <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 2 - Best Sellers (Image 1 - Panther) */}
            <Link to="/shop?sort=popular" style={{
              position: 'relative',
              height: '500px',
              overflow: 'hidden',
              display: 'block',
              background: '#1a1f26'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `url(/images/efe1.jpg) center/cover no-repeat`,
                transition: 'transform 0.6s ease',
                filter: 'brightness(0.7)'
              }}
              className="hover-scale"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '40px'
              }}>
                <div>
                  <p style={{
                    fontSize: '12px',
                    letterSpacing: '2px',
                    color: '#d4a65c',
                    marginBottom: '8px',
                    fontWeight: 600
                  }}>
                    BEST SELLERS
                  </p>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: 600,
                    color: '#e8e8e8',
                    marginBottom: '12px'
                  }}>
                    Most Loved
                  </h3>
                  <p style={{
                    color: '#a8adb5',
                    fontSize: '14px',
                    marginBottom: '16px'
                  }}>
                    Customer favorites
                  </p>
                  <span style={{
                    color: '#d4a65c',
                    fontSize: '14px',
                    letterSpacing: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    SHOP NOW <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================
          LARGE BANNER - IMAGE 2 (Mt. Fuji)
          ======================================== */}
      <section style={{
        position: 'relative',
        padding: '140px 0',
        background: '#1a1f26'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `url(/images/efe2.jpg) center/cover no-repeat`,
          filter: 'brightness(0.5)',
          backgroundAttachment: 'fixed' // Parallax effect
        }} />
        
        <div className="container" style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            background: 'rgba(10, 14, 18, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: '60px 40px',
            border: '1px solid rgba(212, 166, 92, 0.2)'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 600,
              marginBottom: '20px',
              color: '#e8e8e8'
            }}>
              ARTISAN CRAFTED
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#a8adb5',
              marginBottom: '40px',
              lineHeight: 1.7
            }}>
              Each piece tells a story of tradition, excellence, and timeless beauty. 
              Discover collections inspired by centuries of craftsmanship.
            </p>
            <Link to="/shop?featured=true" className="btn btn-primary">
              VIEW COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================
          NEWSLETTER - WITH FANCY ISOTÉ BRANDING
          ======================================== */}
      <section style={{
        position: 'relative',
        padding: '100px 0',
        background: '#0a0e12'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `url(/images/efe3.jpg) center/cover no-repeat`,
          opacity: 0.1
        }} />
        
        <div className="container" style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {/* Fancy Isoté Logo */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '40px',
            fontWeight: 300,
            color: '#d4a65c',
            letterSpacing: '5px',
            fontStyle: 'italic',
            marginBottom: '24px'
          }}>
            Isoté
          </div>
          
          <Sparkles size={32} color="#d4a65c" style={{ margin: '0 auto 24px' }} />
          <h2 style={{
            fontSize: '36px',
            fontWeight: 600,
            marginBottom: '16px',
            color: '#e8e8e8'
          }}>
            JOIN OUR COMMUNITY
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#a8adb5',
            marginBottom: '40px'
          }}>
            Subscribe for exclusive offers, new arrivals, and style inspiration
          </p>
          <form style={{
            display: 'flex',
            gap: '12px',
            maxWidth: '500px',
            margin: '0 auto',
            flexWrap: 'wrap'
          }}
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thank you for subscribing!');
          }}
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              style={{
                flex: 1,
                minWidth: '250px',
                padding: '16px 20px',
                background: '#151a20',
                border: '1px solid #2a3038',
                color: '#e8e8e8',
                fontSize: '14px'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{
              padding: '16px 32px'
            }}>
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Home;