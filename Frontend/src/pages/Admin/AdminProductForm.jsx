import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { productsAPI } from '../../services/api';

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'women',
    images: [],
    sizes: [],
    colors: [],
    stock: '',
    discount: 0,
    isNew: false,
    featured: false,
  });

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getById(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleArrayChange = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData({ ...formData, [field]: items });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        discount: parseInt(formData.discount) || 0,
      };

      if (isEdit) {
        await productsAPI.update(id, data);
      } else {
        await productsAPI.create(data);
      }

      alert(`Product ${isEdit ? 'updated' : 'created'} successfully!`);
      navigate('/admin');
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '48px 0', backgroundColor: 'var(--bg-secondary)', minHeight: '60vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <button
          onClick={() => navigate('/admin')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            background: 'none',
            marginBottom: '24px'
          }}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5vw, 42px)',
          marginBottom: '40px'
        }}>
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="card" style={{ padding: '40px', backgroundColor: 'white' }}>
            {/* Basic Information */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
                Basic Information
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '8px'
                  }}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '8px'
                  }}>
                    Description *
                  </label>
                  <textarea
                    name="description"
                    className="input"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '8px'
                    }}>
                      Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      className="input"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '8px'
                    }}>
                      Category *
                    </label>
                    <select
                      name="category"
                      className="input"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="women">Women</option>
                      <option value="men">Men</option>
                      <option value="accessories">Accessories</option>
                      <option value="shoes">Shoes</option>
                      <option value="bags">Bags</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '8px'
                    }}>
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      className="input"
                      value={formData.stock}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '8px'
                    }}>
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      className="input"
                      value={formData.discount}
                      onChange={handleChange}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* Product Details */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
                Product Details
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '8px'
                  }}>
                    Image URLs (comma-separated)
                  </label>
                  <textarea
                    className="input"
                    value={formData.images.join(', ')}
                    onChange={(e) => handleArrayChange('images', e.target.value)}
                    rows="3"
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '8px'
                  }}>
                    Available Sizes (comma-separated)
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={formData.sizes.join(', ')}
                    onChange={(e) => handleArrayChange('sizes', e.target.value)}
                    placeholder="XS, S, M, L, XL"
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '8px'
                  }}>
                    Available Colors (comma-separated hex codes)
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={formData.colors.join(', ')}
                    onChange={(e) => handleArrayChange('colors', e.target.value)}
                    placeholder="#000000, #FFFFFF, #FF0000"
                  />
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* Status */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
                Status
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={formData.isNew}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>
                    Mark as New Arrival
                  </span>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>
                    Featured Product
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              paddingTop: '24px',
              borderTop: '1px solid var(--border)'
            }}>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;