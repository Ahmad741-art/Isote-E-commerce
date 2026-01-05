import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-hero-title">About Isoté</h1>
          <p className="about-hero-subtitle">
            Timeless elegance meets modern sophistication
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content-grid">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"
                alt="Isoté atelier"
              />
            </div>
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded with a vision to redefine luxury fashion, Isoté represents
                the intersection of timeless design and contemporary craftsmanship.
                Each piece in our collection is thoughtfully created to transcend
                fleeting trends, offering you garments that remain relevant for
                years to come.
              </p>
              <p>
                We believe in the power of simplicity—in clean lines, exceptional
                materials, and impeccable construction. Our philosophy centers on
                creating a refined wardrobe of essentials that speak to the modern
                individual who values quality over quantity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Quality Craftsmanship</h3>
              <p>
                Every piece is meticulously crafted using the finest materials
                sourced from renowned mills in Italy and France.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Timeless Design</h3>
              <p>
                We design pieces that defy the seasons, creating a wardrobe that
                evolves with you rather than expiring with the calendar.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeWidth="2"/>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="7.5 19.79 7.5 14.6 3 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="21 12 16.5 14.6 16.5 19.79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="22.08" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Sustainable Practice</h3>
              <p>
                We are committed to responsible production, working with suppliers
                who share our dedication to ethical and sustainable practices.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Personal Service</h3>
              <p>
                From personalized styling to exceptional after-care, we're
                dedicated to providing an unparalleled shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="about-section craftsmanship-section">
        <div className="container">
          <div className="about-content-grid reverse">
            <div className="about-text">
              <h2>Craftsmanship</h2>
              <p>
                Each Isoté garment begins with the selection of exceptional fabrics
                from the world's most prestigious mills. Our design team works
                closely with master artisans to ensure every stitch, every seam,
                and every detail meets our exacting standards.
              </p>
              <p>
                From the initial sketch to the final pressing, each piece undergoes
                rigorous quality control. We believe that true luxury lies not in
                logos or embellishments, but in the invisible details that make a
                garment exceptional.
              </p>
            </div>
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea3c892d?w=800"
                alt="Craftsmanship detail"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section team-section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-photo">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
                  alt="Creative Director"
                />
              </div>
              <h3>Sarah Chen</h3>
              <p className="team-role">Creative Director</p>
            </div>

            <div className="team-member">
              <div className="team-photo">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
                  alt="Head of Design"
                />
              </div>
              <h3>Marcus Sullivan</h3>
              <p className="team-role">Head of Design</p>
            </div>

            <div className="team-member">
              <div className="team-photo">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400"
                  alt="Sustainability Director"
                />
              </div>
              <h3>Emma Laurent</h3>
              <p className="team-role">Sustainability Director</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Discover the Collection</h2>
          <p>
            Explore our carefully curated selection of timeless essentials
          </p>
          <a href="/shop" className="btn">
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;