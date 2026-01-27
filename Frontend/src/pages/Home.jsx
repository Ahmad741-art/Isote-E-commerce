import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Leaf, Heart, Star, Truck, Award } from 'lucide-react';
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
      console.log('Fetching featured products...');
      const response = await productsAPI.getAll({ limit: 8, featured: true });
      console.log('Featured products response:', response.data);
      
      const productsData = response.data.products || response.data.data || response.data || [];
      setFeaturedProducts(productsData);
      
      console.log('Featured products loaded:', productsData.length);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Floating decorative elements */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          fontSize: `${12 + Math.random() * 20}px`,
          animation: `gentleFloat ${10 + Math.random() * 15}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0
        }}>
          {['🌸', '🍃', '✨', '🌿', '🌺'][Math.floor(Math.random() * 5)]}
        </div>
      ))}

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '95vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1a2332 0%, #2d3e50 50%, #2a3a4a 100%)',
        paddingTop: '40px'
      }}>
        {/* Organic gradient effects */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '8%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(ellipse, rgba(255, 107, 90, 0.25) 0%, transparent 65%)',
          borderRadius: '50%',
          filter: 'blur(70px)',
          animation: 'sunsetGlow 5s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '12%',
          width: '500px',
          height: '350px',
          background: 'radial-gradient(ellipse, rgba(90, 141, 142, 0.2) 0%, transparent 65%)',
          borderRadius: '50%',
          filter: 'blur(70px)',
          animation: 'sunsetGlow 7s ease-in-out infinite reverse'
        }} />

        <div className="container" style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center'
        }}>
          {/* Elegant badge */}
          <div className="organic-border" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px 36px',
            background: 'rgba(42, 58, 74, 0.7)',
            borderRadius: '4px',
            marginBottom: '40px',
            animation: 'fadeIn 1s ease, gentleFloat 5s ease-in-out infinite',
            boxShadow: 'var(--shadow-md)'
          }}>
            <Sparkles size={20} color="var(--accent-gold)" style={{ animation: 'gentleFloat 3s infinite' }} />
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              background: 'var(--gradient-3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ✨ CURATED ELEGANCE 2024 ✨
            </span>
            <Leaf size={20} color="var(--accent-sage)" />
          </div>

          {/* Hero title */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 12vw, 120px)',
            fontWeight: 700,
            letterSpacing: '4px',
            marginBottom: '36px',
            lineHeight: 1,
            color: 'var(--text-primary)',
            textShadow: '3px 3px 10px rgba(0, 0, 0, 0.8)',
            animation: 'fadeIn 1.2s ease 0.2s backwards',
            position: 'relative'
          }}>
            TIMELESS
            <br />
            <span style={{
              background: 'var(--gradient-sunset)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative'
            }}>
              ELEGANCE
            </span>
            <Leaf size={70} style={{
              position: 'absolute',
              top: '-30px',
              right: '8%',
              color: 'var(--accent-sage)',
              opacity: 0.6,
              animation: 'gentleFloat 7s ease-in-out infinite'
            }} />
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 3vw, 24px)',
            color: 'var(--text-secondary)',
            marginBottom: '56px',
            maxWidth: '800px',
            margin: '0 auto 56px',
            lineHeight: 1.8,
            animation: 'fadeIn 1.4s ease 0.4s backwards',
            fontWeight: 400
          }}>
            Curated collections inspired by nature's beauty. Each piece crafted with intention and grace.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeIn 1.6s ease 0.6s backwards'
          }}>
            <Link to="/shop" className="btn btn-primary soft-glow" style={{
              fontSize: '14px',
              padding: '20px 52px',
              boxShadow: 'var(--shadow-coral)'
            }}>
              <Sparkles size={20} />
              EXPLORE COLLECTION
            </Link>
            <Link to="/shop?category=new" className="btn btn-outline" style={{
              fontSize: '14px',
              padding: '20px 52px'
            }}>
              NEW ARRIVALS
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Scroll indicator */}
          <div style={{
            marginTop: '90px',
            animation: 'gentleFloat 3s infinite'
          }}>
            <div style={{
              width: '2px',
              height: '50px',
              background: 'var(--gradient-3)',
              margin: '0 auto',
              boxShadow: '0 0 15px rgba(212, 165, 116, 0.5)'
            }} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg, #2d3e50 0%, #2a3a4a 100%)',
        position: 'relative',
        borderTop: '1px solid rgba(212, 165, 116, 0.2)',
        borderBottom: '1px solid rgba(212, 165, 116, 0.2)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px'
          }}>
            {[
              { icon: Truck, title: 'COMPLIMENTARY SHIPPING', desc: 'Free delivery on orders over $100', emoji: '🌸', color: 'var(--accent-coral)' },
              { icon: Award, title: 'ARTISAN QUALITY', desc: 'Each piece carefully crafted with attention to detail', emoji: '✨', color: 'var(--accent-gold)' },
              { icon: Star, title: 'CURATED SELECTIONS', desc: 'Exclusive pieces chosen for their timeless appeal', emoji: '🌿', color: 'var(--accent-teal)' }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="card elegant-float" style={{
                  padding: '48px 36px',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(42, 58, 74, 0.9) 0%, rgba(45, 62, 80, 0.9) 100%)',
                  animationDelay: `${idx * 0.2}s`,
                  borderWidth: '2px'
                }}>
                  <div style={{
                    fontSize: '70px',
                    marginBottom: '28px',
                    animation: 'gentleFloat 5s ease-in-out infinite',
                    animationDelay: `${idx * 0.4}s`,
                    filter: 'drop-shadow(0 0 15px rgba(212, 165, 116, 0.3))'
                  }}>
                    {feature.emoji}
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: '18px',
                    color: feature.color,
                    letterSpacing: '1.5px',
                    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7
                  }}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg, #2a3a4a 0%, #1a2332 100%)',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ display: 'inline-flex', gap: '16px', marginBottom: '28px' }}>
              <Leaf size={36} color="var(--accent-sage)" className="elegant-float" />
              <Sparkles size={36} color="var(--accent-gold)" className="elegant-float" style={{ animationDelay: '0.5s' }} />
              <Heart size={36} color="var(--accent-coral)" className="elegant-float" style={{ animationDelay: '1s' }} />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(38px, 7vw, 76px)',
              marginBottom: '20px',
              color: 'var(--text-primary)',
              letterSpacing: '3px',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'
            }}>
              DISCOVER YOUR
              <br />
              <span className="nature-text">COLLECTION</span>
            </h2>
            <p style={{
              fontSize: '19px',
              color: 'var(--text-secondary)',
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}>
              Curated with intention
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '40px'
          }}>
            {[
              { title: '🌸 WOMEN', emoji: '✨', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800', link: '/shop?category=women', gradient: 'var(--gradient-sunset)' },
              { title: '🍃 MEN', emoji: '🌿', image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800', link: '/shop?category=men', gradient: 'var(--gradient-ocean)' },
              { title: '✨ ACCESSORIES', emoji: '💫', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800', link: '/shop?category=accessories', gradient: 'var(--gradient-3)' }
            ].map((category, idx) => (
              <Link
                key={idx}
                to={category.link}
                className="card soft-glow image-card"
                style={{
                  position: 'relative',
                  height: '520px',
                  overflow: 'hidden',
                  borderRadius: '6px',
                  border: '2px solid rgba(212, 165, 116, 0.3)',
                  boxShadow: '0 0 30px rgba(0, 0, 0, 0.4)'
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
                    objectFit: 'cover',
                    transition: 'transform 1.2s ease',
                    filter: 'brightness(0.7)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                    e.target.style.filter = 'brightness(0.85)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.filter = 'brightness(0.7)';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, ${category.gradient}dd 0%, transparent 65%)`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '48px'
                }}>
                  <div style={{
                    fontSize: '90px',
                    marginBottom: '20px',
                    animation: 'gentleFloat 5s ease-in-out infinite',
                    filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.8))'
                  }}>
                    {category.emoji}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '44px',
                    color: 'white',
                    fontWeight: 700,
                    marginBottom: '18px',
                    textShadow: '3px 3px 10px rgba(0,0,0,0.9)',
                    letterSpacing: '2px'
                  }}>
                    {category.title}
                  </h3>
                  <div className="btn btn-outline" style={{
                    width: 'fit-content',
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    borderColor: 'white'
                  }}>
                    EXPLORE
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg, #1a2332 0%, #2d3e50 100%)',
        position: 'relative',
        borderTop: '1px solid rgba(212, 165, 116, 0.2)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '76px',
            flexWrap: 'wrap',
            gap: '28px'
          }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(38px, 7vw, 76px)',
                letterSpacing: '3px',
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'
              }}>
                <span className="nature-text">FEATURED</span>
                <br />
                COLLECTION
              </h2>
              <p style={{
                fontSize: '19px',
                color: 'var(--text-secondary)',
                marginTop: '14px',
                fontWeight: 500
              }}>
                Handpicked for you 🌸
              </p>
            </div>
            <Link to="/shop" className="btn btn-outline soft-glow">
              VIEW ALL
              <Sparkles size={20} />
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
        padding: '120px 0',
        background: 'var(--gradient-sunset)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '2px solid rgba(255, 255, 255, 0.2)',
        borderBottom: '2px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* Decorative elements */}
        {[...Array(15)].map((_, i) => (
          <Leaf key={i} size={35} style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            color: 'rgba(255, 255, 255, 0.08)',
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `gentleFloat ${12 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }} />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            animation: 'gentleFloat 6s ease-in-out infinite'
          }}>
            <Sparkles size={84} color="white" style={{ filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 68px)',
            marginBottom: '24px',
            marginTop: '40px',
            color: 'white',
            textShadow: '3px 3px 12px rgba(0, 0, 0, 0.8)',
            fontWeight: 700,
            letterSpacing: '3px'
          }}>
            JOIN OUR CIRCLE
          </h2>
          <p style={{
            fontSize: '21px',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '48px',
            maxWidth: '700px',
            margin: '0 auto 48px',
            lineHeight: 1.8,
            fontWeight: 500
          }}>
            Subscribe for exclusive offers, early access to new collections, and curated style inspiration.
          </p>
          <form style={{
            display: 'flex',
            maxWidth: '700px',
            margin: '0 auto',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <input
              type="email"
              placeholder="Enter your email ✨"
              className="input"
              style={{
                flex: 1,
                minWidth: '300px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                fontSize: '15px',
                fontWeight: 500,
                backdropFilter: 'blur(10px)'
              }}
            />
            <button className="btn" style={{
              padding: '18px 48px',
              background: 'white',
              color: 'var(--accent-coral)',
              fontSize: '15px',
              fontWeight: 700,
              border: '2px solid white'
            }}>
              <Leaf size={20} />
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;