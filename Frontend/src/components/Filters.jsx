import React from 'react';
import { X } from 'lucide-react';

const Filters = ({ filters, onFilterChange, onClearFilters }) => {
  const categories = ['Women', 'Men', 'Accessories', 'Shoes', 'Bags'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200+', min: 200, max: 10000 },
  ];

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '4px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Filters</h3>
        <button
          onClick={onClearFilters}
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            background: 'none',
            textDecoration: 'underline'
          }}
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: '32px' }}>
        <h4 style={{
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Category
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {categories.map((category) => (
            <label key={category} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              <input
                type="checkbox"
                checked={filters.category === category.toLowerCase()}
                onChange={() =>
                  onFilterChange('category', filters.category === category.toLowerCase() ? '' : category.toLowerCase())
                }
                style={{ cursor: 'pointer' }}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div style={{ marginBottom: '32px' }}>
        <h4 style={{
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Size
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onFilterChange('size', filters.size === size ? '' : size)}
              style={{
                padding: '8px 16px',
                border: `1px solid ${filters.size === size ? 'var(--primary)' : 'var(--border)'}`,
                backgroundColor: filters.size === size ? 'var(--primary)' : 'white',
                color: filters.size === size ? 'white' : 'var(--text-primary)',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '4px'
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h4 style={{
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Price
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {priceRanges.map((range) => (
            <label key={range.label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              <input
                type="radio"
                name="price"
                checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                onChange={() => {
                  onFilterChange('minPrice', range.min);
                  onFilterChange('maxPrice', range.max);
                }}
                style={{ cursor: 'pointer' }}
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;