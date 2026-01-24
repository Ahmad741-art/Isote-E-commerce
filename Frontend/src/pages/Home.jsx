import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sword, Shield, Flame, Award, Truck, Star } from 'lucide-react';
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
    <div style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Floating Battle Elements */}
      {[...Array(15)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          fontSize: `${15 + Math.random() * 25}px`,
          animation: `battleFloat ${8 + Math.random() * 12}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: 0.15,
          pointerEvents: 'none',
          zIndex: 0
        }}>
          {['⚔️', '🛡️', '👑', '🔥', '⚡'][Math.floor(Math.random() * 5)]}
        </div>
      ))}

      {/* Hero Section - Epic Battle */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0f0f1e 0%, #16213e 50%, #1a1a2e 100%)',
        paddingTop: '40px'
      }}>
        {/* Forge Fire Effects */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(139, 0, 0, 0.4) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'dragonBreath 4s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(201, 169, 97, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(70px)',
          animation: 'dragonBreath 6s ease-in-out infinite reverse'
        }} />

        {/* Grid Pattern Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201, 169, 97, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 169, 97, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.3
        }} />

        <div className="container" style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center'
        }}>
          {/* Battle Badge */}
          <div className="steel-border" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            padding: '18px 40px',
            background: 'rgba(22, 33, 62, 0.8)',
            borderRadius: '6px',
            marginBottom: '48px',
            animation: 'fadeIn 1s ease, battleFloat 4s ease-in-out infinite',
            boxShadow: 'var(--shadow-md), 0 0 30px rgba(201, 169, 97, 0.2)'
          }}>
            <Flame size={24} color="var(--accent-red)" style={{ animation: 'forge 2s infinite' }} />
            <span style={{
              fontSize: '14px',
              fontWeight: 900,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              background: 'var(--gradient-1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ⚔️ EXCLUSIVE COLLECTION 2024 ⚔️
            </span>
            <Shield size={24} color="var(--accent)" />
          </div>

          {/* Epic Title */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 14vw, 140px)',
            fontWeight: 900,
            letterSpacing: '6px',
            marginBottom: '40px',
            lineHeight: 0.95,
            color: 'var(--text-primary)',
            textShadow: '4px 4px 12px rgba(0, 0, 0, 0.9), 0 0 40px rgba(201, 169, 97, 0.3)',
            animation: 'fadeIn 1.2s ease 0.2s backwards',
            position: 'relative'
          }}>
            FORGE YOUR
            <br />
            <span style={{
              background: 'var(--gradient-epic)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative'
            }}>
              STYLE
            </span>
            <Sword size={80} style={{
              position: 'absolute',
              top: '-40px',
              right: '5%',
              color: 'var(--accent)',
              transform: 'rotate(-45deg)',
              opacity: 0.7,
              animation: 'battleFloat 6s ease-in-out infinite'
            }} />
          </h1>

          <p style={{
            fontSize: 'clamp(18px, 3.5vw, 28px)',
            color: 'var(--text-secondary)',
            marginBottom: '64px',
            maxWidth: '850px',
            margin: '0 auto 64px',
            lineHeight: 1.7,
            animation: 'fadeIn 1.4s ease 0.4s backwards',
            fontWeight: 500
          }}>
            Gear crafted by master artisans. Premium quality meets bold design. Every piece tells your story.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '28px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeIn 1.6s ease 0.6s backwards'
          }}>
            <Link to="/shop" className="btn btn-accent forge-glow" style={{
              fontSize: '16px',
              padding: '24px 60px',
              boxShadow: 'var(--shadow-fire)'
            }}>
              <Flame size={24} />
              SHOP NOW
              <Sword size={24} />
            </Link>
            <Link to="/shop?category=new" className="btn btn-outline" style={{
              fontSize: '16px',
              padding: '24px 60px'
            }}>
              NEW ARRIVALS
              <ArrowRight size={24} />
            </Link>
          </div>

          {/* Scroll Battle Indicator */}
          <div style={{
            marginTop: '100px',
            animation: 'battleFloat 3s infinite'
          }}>
            <div style={{
              width: '4px',
              height: '60px',
              background: 'var(--gradient-1)',
              margin: '0 auto',
              boxShadow: '0 0 20px rgba(201, 169, 97, 0.6)'
            }} />
          </div>
        </div>
      </section>

      {/* Battle Stats Section */}
      <section style={{
        padding: '140px 0',
        background: 'linear-gradient(180deg, #16213e 0%, #1a1a2e 100%)',
        position: 'relative',
        borderTop: '3px solid var(--accent)',
        borderBottom: '3px solid var(--accent)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '56px'
          }}>
            {[
              { icon: Truck, title: 'GLOBAL DELIVERY', desc: 'Free shipping on orders over $100', emoji: '🚀', color: 'var(--accent)' },
              { icon: Award, title: 'PREMIUM QUALITY', desc: 'Hand-crafted quality worthy of excellence', emoji: '🏆', color: 'var(--accent-red)' },
              { icon: Star, title: 'EXCLUSIVE ACCESS', desc: 'First access to limited edition drops', emoji: '⚡', color: 'var(--accent-blue)' }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="card steel-border battle-ready" style={{
                  padding: '56px 40px',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%)',
                  animationDelay: `${idx * 0.2}s`,
                  borderWidth: '3px'
                }}>
                  <div style={{
                    fontSize: '80px',
                    marginBottom: '32px',
                    animation: 'battleFloat 4s ease-in-out infinite',
                    animationDelay: `${idx * 0.4}s`,
                    filter: 'drop-shadow(0 0 20px rgba(201, 169, 97, 0.4))'
                  }}>
                    {feature.emoji}
                  </div>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 900,
                    marginBottom: '20px',
                    color: feature.color,
                    letterSpacing: '2px',
                    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8
                  }}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kingdoms Section */}
      <section style={{
        padding: '140px 0',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '96px' }}>
            <div style={{ display: 'inline-flex', gap: '20px', marginBottom: '32px' }}>
              <Shield size={42} color="var(--accent)" className="battle-ready" />
              <Sword size={42} color="var(--accent-red)" className="battle-ready" style={{ animationDelay: '0.5s' }} />
              <Flame size={42} color="var(--accent)" className="battle-ready" style={{ animationDelay: '1s' }} />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 8vw, 88px)',
              marginBottom: '24px',
              color: 'var(--text-primary)',
              letterSpacing: '4px',
              textShadow: '3px 3px 10px rgba(0, 0, 0, 0.8)'
            }}>
              CHOOSE YOUR
              <br />
              <span className="epic-text">CATEGORY</span>
            </h2>
            <p style={{
              fontSize: '22px',
              color: 'var(--text-secondary)',
              fontWeight: 600,
              letterSpacing: '1px'
            }}>
              Select your collection
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '48px'
          }}>
            {[
              { title: '👗 WOMEN', emoji: '💎', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800', link: '/shop?category=women', color: 'var(--accent)' },
              { title: '👔 MEN', emoji: '🛡️', image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800', link: '/shop?category=men', color: 'var(--accent-red)' },
              { title: '💎 ACCESSORIES', emoji: '⚡', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800', link: '/shop?category=accessories', color: 'var(--accent-blue)' }
            ].map((category, idx) => (
              <Link
                key={idx}
                to={category.link}
                className="card forge-glow"
                style={{
                  position: 'relative',
                  height: '600px',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  border: `4px solid ${category.color}`,
                  boxShadow: `0 0 40px ${category.color}40`
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
                    transition: 'transform 1s ease',
                    filter: 'brightness(0.6)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.15)';
                    e.target.style.filter = 'brightness(0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.filter = 'brightness(0.6)';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, ${category.color}dd 0%, transparent 70%)`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '56px'
                }}>
                  <div style={{
                    fontSize: '100px',
                    marginBottom: '24px',
                    animation: 'battleFloat 4s ease-in-out infinite',
                    filter: 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.8))'
                  }}>
                    {category.emoji}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '52px',
                    color: 'white',
                    fontWeight: 900,
                    marginBottom: '20px',
                    textShadow: '4px 4px 12px rgba(0,0,0,0.9)',
                    letterSpacing: '3px'
                  }}>
                    {category.title}
                  </h3>
                  <div className="btn btn-outline" style={{
                    width: 'fit-content',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    borderColor: 'white'
                  }}>
                    ENTER NOW
                    <ArrowRight size={22} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Legendary Items */}
      <section style={{
        padding: '140px 0',
        background: 'linear-gradient(180deg, #0f0f1e 0%, #16213e 100%)',
        position: 'relative',
        borderTop: '3px solid var(--accent)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '88px',
            flexWrap: 'wrap',
            gap: '32px'
          }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px, 8vw, 88px)',
                letterSpacing: '4px',
                textShadow: '3px 3px 10px rgba(0, 0, 0, 0.8)'
              }}>
                <span className="epic-text">FEATURED</span>
                <br />
                COLLECTION
              </h2>
              <p style={{
                fontSize: '22px',
                color: 'var(--text-secondary)',
                marginTop: '16px',
                fontWeight: 600
              }}>
                Handpicked for you ⚔️
              </p>
            </div>
            <Link to="/shop" className="btn btn-outline forge-glow">
              VIEW ALL
              <Flame size={22} />
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

      {/* Battle Call Section */}
      <section style={{
        padding: '140px 0',
        background: 'var(--gradient-2)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '4px solid var(--accent-gold)',
        borderBottom: '4px solid var(--accent-gold)'
      }}>
        {/* Battle Effects */}
        {[...Array(20)].map((_, i) => (
          <Sword key={i} size={40} style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            color: 'rgba(255, 255, 255, 0.1)',
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `battleFloat ${10 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }} />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            animation: 'battleFloat 5s ease-in-out infinite'
          }}>
            <Shield size={96} color="var(--accent-gold)" style={{ filter: 'drop-shadow(0 0 40px rgba(201, 169, 97, 1))' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 7vw, 80px)',
            marginBottom: '28px',
            marginTop: '48px',
            color: 'white',
            textShadow: '4px 4px 16px rgba(0, 0, 0, 0.9)',
            fontWeight: 900,
            letterSpacing: '4px'
          }}>
            JOIN OUR COMMUNITY
          </h2>
          <p style={{
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '56px',
            maxWidth: '750px',
            margin: '0 auto 56px',
            lineHeight: 1.8,
            fontWeight: 600
          }}>
            Subscribe for exclusive deals, early access to new collections, and member-only benefits.
          </p>
          <form style={{
            display: 'flex',
            maxWidth: '750px',
            margin: '0 auto',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <input
              type="email"
              placeholder="Enter your email ⚔️"
              className="input"
              style={{
                flex: 1,
                minWidth: '320px',
                background: 'rgba(0, 0, 0, 0.6)',
                border: '3px solid var(--accent)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 600
              }}
            />
            <button className="btn" style={{
              padding: '20px 56px',
              background: 'var(--gradient-1)',
              color: 'var(--text-dark)',
              fontSize: '16px',
              fontWeight: 900,
              border: '3px solid var(--accent)'
            }}>
              <Flame size={22} />
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;