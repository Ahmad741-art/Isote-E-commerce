import React from 'react';
import { Link } from 'react-router-dom';
import './Collections.css';

const Collections = () => {
  const collections = [
    {
      id: 1,
      name: 'Spring Essentials',
      description: 'Timeless pieces for the new season',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      itemCount: 24,
      slug: 'spring-essentials',
    },
    {
      id: 2,
      name: 'Tailored Elegance',
      description: 'Sophisticated suiting and formal wear',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
      itemCount: 18,
      slug: 'tailored-elegance',
    },
    {
      id: 3,
      name: 'Casual Luxe',
      description: 'Elevated everyday essentials',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800',
      itemCount: 32,
      slug: 'casual-luxe',
    },
    {
      id: 4,
      name: 'Evening Collection',
      description: 'Statement pieces for special occasions',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
      itemCount: 15,
      slug: 'evening-collection',
    },
    {
      id: 5,
      name: 'Monochrome',
      description: 'Classic black and white sophistication',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
      itemCount: 27,
      slug: 'monochrome',
    },
    {
      id: 6,
      name: 'Sustainable Choices',
      description: 'Consciously crafted with eco-friendly materials',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c892d?w=800',
      itemCount: 21,
      slug: 'sustainable-choices',
    },
  ];

  return (
    <div className="collections-page">
      <div className="collections-hero">
        <div className="container">
          <h1>Our Collections</h1>
          <p>Curated selections for every occasion and season</p>
        </div>
      </div>

      <div className="container">
        <div className="collections-grid">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/shop?collection=${collection.slug}`}
              className="collection-card"
            >
              <div className="collection-image">
                <img src={collection.image} alt={collection.name} />
                <div className="collection-overlay">
                  <span className="collection-cta">Explore Collection</span>
                </div>
              </div>
              <div className="collection-info">
                <h2>{collection.name}</h2>
                <p className="collection-description">{collection.description}</p>
                <p className="collection-count">{collection.itemCount} Items</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Section */}
        <div className="collections-featured">
          <div className="featured-content">
            <h2>New Arrivals</h2>
            <p>
              Discover our latest pieces, carefully selected to complement your
              wardrobe with timeless elegance and modern sophistication.
            </p>
            <Link to="/shop?sort=newest" className="btn">
              Shop New Arrivals
            </Link>
          </div>
          <div className="featured-image">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
              alt="New Arrivals"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;