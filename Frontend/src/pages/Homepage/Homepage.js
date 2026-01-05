import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import Newsletter from '../../components/Newsletter/Newsletter';
import Loader from '../../components/Loader/Loader';
import './Homepage.css';

const Homepage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/products/featured`);
      const data = await response.json();
      
      if (data.success) {
        setFeaturedProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Timeless
            <br />
            Elegance
          </h1>
          <p className="hero-subtitle">
            Discover our curated collection of luxury essentials
          </p>
          <Link to="/shop" className="btn">
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section section">
        <div className="container">
          <div className="categories-grid">
            <Link to="/shop/Women" className="category-card">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"
                  alt="Women's Collection"
                />
              </div>
              <h3>Women</h3>
            </Link>
            <Link to="/shop/Men" className="category-card">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800"
                  alt="Men's Collection"
                />
              </div>
              <h3>Men</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section section">
        <div className="container">
          <h2 className="section-title">Featured Collection</h2>
          {loading ? (
            <Loader />
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-4">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="no-products">No featured products available at the moment.</p>
          )}
          {featuredProducts.length > 4 && (
            <div className="view-all">
              <Link to="/shop" className="btn btn-outline">
                View All Products
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview section">
        <div className="container">
          <div className="about-content">
            <h2>Our Philosophy</h2>
            <p>
              At Isoté, we believe in the power of timeless design. Each piece
              in our collection is carefully curated to transcend trends,
              offering you garments that will remain relevant for years to come.
            </p>
            <Link to="/about" className="btn btn-outline">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Homepage;