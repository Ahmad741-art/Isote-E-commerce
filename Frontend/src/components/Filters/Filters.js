import React from 'react';
import './Filters.css';
import { CATEGORIES, GENDERS, SORT_OPTIONS } from '../../utils/constants';

const Filters = ({ filters, onFilterChange, onClearFilters }) => {
  const { category, gender, minPrice, maxPrice, sort } = filters;

  const handleInputChange = (name, value) => {
    onFilterChange({ ...filters, [name]: value });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="filters">
      <div className="filters-header">
        <h3>Filters</h3>
        {activeFiltersCount > 0 && (
          <button onClick={onClearFilters} className="filters-clear">
            Clear All ({activeFiltersCount})
          </button>
        )}
      </div>

      <div className="filter-group">
        <label className="filter-label">Category</label>
        <select
          value={category || ''}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Gender</label>
        <div className="filter-options">
          {GENDERS.map((gen) => (
            <button
              key={gen}
              className={`filter-option ${gender === gen ? 'active' : ''}`}
              onClick={() => handleInputChange('gender', gender === gen ? '' : gen)}
            >
              {gen}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Price Range</label>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={minPrice || ''}
            onChange={(e) => handleInputChange('minPrice', e.target.value)}
            className="price-input"
          />
          <span>—</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice || ''}
            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
            className="price-input"
          />
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Sort By</label>
        <select
          value={sort || ''}
          onChange={(e) => handleInputChange('sort', e.target.value)}
          className="filter-select"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;