import React, { useState } from 'react';
import './Lookbook.css';

const Lookbook = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const collections = [
    {
      title: 'Spring/Summer 2026',
      description: 'Effortless sophistication meets warm-weather ease',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200',
          caption: 'Flowing silhouettes in natural linen',
        },
        {
          url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200',
          caption: 'Timeless wardrobe essentials',
        },
        {
          url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200',
          caption: 'Evening elegance',
        },
        {
          url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200',
          caption: 'Luxe layering pieces',
        },
      ],
    },
    {
      title: 'Monochrome Edit',
      description: 'The art of refined minimalism',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200',
          caption: 'Pure black and white sophistication',
        },
        {
          url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200',
          caption: 'Tailored perfection',
        },
        {
          url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200',
          caption: 'Structured elegance',
        },
      ],
    },
    {
      title: 'Artisan Details',
      description: 'Celebrating exceptional craftsmanship',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1558769132-cb1aea3c892d?w=1200',
          caption: 'Hand-finished details',
        },
        {
          url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200',
          caption: 'Italian leather craftsmanship',
        },
        {
          url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200',
          caption: 'Luxurious textures',
        },
      ],
    },
  ];

  return (
    <div className="lookbook-page">
      <section className="lookbook-hero">
        <div className="container">
          <h1 className="lookbook-hero-title">Lookbook</h1>
          <p className="lookbook-hero-subtitle">
            Explore our seasonal collections and styling inspiration
          </p>
        </div>
      </section>

      <div className="container">
        {collections.map((collection, collectionIndex) => (
          <section key={collectionIndex} className="lookbook-collection">
            <div className="collection-header">
              <h2 className="collection-title">{collection.title}</h2>
              <p className="collection-description">{collection.description}</p>
            </div>

            <div className="collection-gallery">
              {collection.images.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className="gallery-item"
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image.url} alt={image.caption} />
                  <div className="gallery-overlay">
                    <p className="image-caption">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.caption} />
            <p className="lightbox-caption">{selectedImage.caption}</p>
          </div>
        </div>
      )}

      <section className="lookbook-cta">
        <div className="container">
          <h2>Discover the Collection</h2>
          <p>Shop the pieces featured in our lookbook</p>
          <a href="/shop" className="btn">
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Lookbook;