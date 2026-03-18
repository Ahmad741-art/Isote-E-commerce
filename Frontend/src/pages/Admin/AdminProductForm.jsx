import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { productsAPI } from '../../services/api';

const CATEGORIES = [
  'Clothing', 'Outerwear', 'Knitwear', 'Tailoring',
  'Accessories', 'Footwear', 'Bags', 'Jewelry', 'Home',
];

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size',
  '36', '37', '38', '39', '40', '41'];

const defaultForm = {
  name: '',
  description: '',
  price: '',
  compareAtPrice: '',
  category: 'Clothing',
  gender: 'Women',
  material: '',
  care: '',
  madeIn: '',
  featured: false,
  newArrival: false,
  bestseller: false,
  status: 'active',
  tags: '',
  // images: array of { url, alt }
  images: [{ url: '', alt: '' }],
  // sizes: array of { size, stock }
  sizes: [{ size: 'S', stock: 0 }],
  // colors: array of { name, code }
  colors: [{ name: '', code: '#000000' }],
};

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    productsAPI.getById(id)
      .then(res => {
        const p = res.data.data || res.data;
        setForm({
          name: p.name || '',
          description: p.description || '',
          price: p.price || '',
          compareAtPrice: p.compareAtPrice || '',
          category: p.category || 'Clothing',
          gender: p.gender || 'Women',
          material: p.material || '',
          care: p.care || '',
          madeIn: p.madeIn || '',
          featured: p.featured || false,
          newArrival: p.newArrival || false,
          bestseller: p.bestseller || false,
          status: p.status || 'active',
          tags: (p.tags || []).join(', '),
          images: p.images?.length ? p.images : [{ url: '', alt: '' }],
          sizes: p.sizes?.length ? p.sizes : [{ size: 'S', stock: 0 }],
          colors: p.colors?.length ? p.colors : [{ name: '', code: '#000000' }],
        });
      })
      .catch(() => alert('Failed to load product'))
      .finally(() => setFetchingProduct(false));
  }, [id]);

  // ── field helpers ──────────────────────────────────────────────

  const setField = (key, value) => setForm(f => ({ ...f, [key]: value }));

  // images
  const setImage = (i, key, val) =>
    setForm(f => { const imgs = [...f.images]; imgs[i] = { ...imgs[i], [key]: val }; return { ...f, images: imgs }; });
  const addImage = () => setForm(f => ({ ...f, images: [...f.images, { url: '', alt: '' }] }));
  const removeImage = i => setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));

  // sizes
  const setSize = (i, key, val) =>
    setForm(f => { const sizes = [...f.sizes]; sizes[i] = { ...sizes[i], [key]: val }; return { ...f, sizes }; });
  const addSize = () => setForm(f => ({ ...f, sizes: [...f.sizes, { size: 'S', stock: 0 }] }));
  const removeSize = i => setForm(f => ({ ...f, sizes: f.sizes.filter((_, idx) => idx !== i) }));

  // colors
  const setColor = (i, key, val) =>
    setForm(f => { const colors = [...f.colors]; colors[i] = { ...colors[i], [key]: val }; return { ...f, colors }; });
  const addColor = () => setForm(f => ({ ...f, colors: [...f.colors, { name: '', code: '#000000' }] }));
  const removeColor = i => setForm(f => ({ ...f, colors: f.colors.filter((_, idx) => idx !== i) }));

  // ── submit ─────────────────────────────────────────────────────

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        compareAtPrice: form.compareAtPrice ? parseFloat(form.compareAtPrice) : undefined,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        images: form.images.filter(img => img.url.trim()),
        sizes: form.sizes
          .filter(s => s.size)
          .map(s => ({ size: s.size, stock: parseInt(s.stock) || 0 })),
        colors: form.colors.filter(c => c.name.trim()),
      };

      if (isEdit) {
        await productsAPI.update(id, payload);
        alert('Product updated!');
      } else {
        await productsAPI.create(payload);
        alert('Product created!');
      }
      navigate('/admin');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  // ── styles ─────────────────────────────────────────────────────

  const s = {
    page: { padding: '40px 24px', minHeight: '100vh', background: '#0a0e12', color: '#e8e8e8' },
    card: { background: '#151a20', border: '1px solid #2a3038', borderRadius: 8, padding: 32, marginBottom: 24 },
    label: { display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#a8adb5', marginBottom: 6 },
    input: { width: '100%', padding: '10px 14px', background: '#1f2630', border: '1px solid #2a3038', borderRadius: 4, color: '#e8e8e8', fontSize: 14 },
    row: { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 },
    btn: { padding: '8px 16px', borderRadius: 4, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 },
    addBtn: { background: 'transparent', border: '1px dashed #2a3038', color: '#a8adb5', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontSize: 13, width: '100%', marginTop: 8 },
    removeBtn: { background: 'rgba(255,107,90,0.15)', color: '#ff6b5a', border: '1px solid rgba(255,107,90,0.3)', padding: '6px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 12, whiteSpace: 'nowrap' },
    sectionTitle: { fontSize: 16, fontWeight: 600, marginBottom: 20, color: '#e8e8e8', borderBottom: '1px solid #2a3038', paddingBottom: 12 },
    checkLabel: { display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: '#a8adb5' },
  };

  if (fetchingProduct) return <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  return (
    <div style={s.page}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <button onClick={() => navigate('/admin')} style={{ ...s.btn, background: 'transparent', color: '#a8adb5', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, marginBottom: 32 }}>
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>

        <form onSubmit={handleSubmit}>

          {/* ── Basic Info ── */}
          <div style={s.card}>
            <p style={s.sectionTitle}>Basic Information</p>

            <div style={{ marginBottom: 16 }}>
              <label style={s.label}>Product Name *</label>
              <input style={s.input} value={form.name} onChange={e => setField('name', e.target.value)} required />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={s.label}>Description *</label>
              <textarea style={{ ...s.input, minHeight: 100, resize: 'vertical' }} value={form.description} onChange={e => setField('description', e.target.value)} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={s.label}>Price (USD) *</label>
                <input style={s.input} type="number" min="0" step="0.01" value={form.price} onChange={e => setField('price', e.target.value)} required />
              </div>
              <div>
                <label style={s.label}>Compare At Price</label>
                <input style={s.input} type="number" min="0" step="0.01" value={form.compareAtPrice} onChange={e => setField('compareAtPrice', e.target.value)} placeholder="Optional (for sale badge)" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={s.label}>Category *</label>
                <select style={s.input} value={form.category} onChange={e => setField('category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={s.label}>Gender *</label>
                <select style={s.input} value={form.gender} onChange={e => setField('gender', e.target.value)}>
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={s.label}>Material</label>
                <input style={s.input} value={form.material} onChange={e => setField('material', e.target.value)} placeholder="e.g. 100% Cashmere" />
              </div>
              <div>
                <label style={s.label}>Care Instructions</label>
                <input style={s.input} value={form.care} onChange={e => setField('care', e.target.value)} placeholder="e.g. Dry clean only" />
              </div>
              <div>
                <label style={s.label}>Made In</label>
                <input style={s.input} value={form.madeIn} onChange={e => setField('madeIn', e.target.value)} placeholder="e.g. Italy" />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={s.label}>Tags (comma separated)</label>
              <input style={s.input} value={form.tags} onChange={e => setField('tags', e.target.value)} placeholder="luxury, knitwear, essentials" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={s.label}>Status</label>
                <select style={s.input} value={form.status} onChange={e => setField('status', e.target.value)}>
                  <option value="active">Active (visible in shop)</option>
                  <option value="draft">Draft (hidden)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 10, paddingBottom: 2 }}>
                {[['featured', 'Featured'], ['newArrival', 'New Arrival'], ['bestseller', 'Bestseller']].map(([key, label]) => (
                  <label key={key} style={s.checkLabel}>
                    <input type="checkbox" checked={form[key]} onChange={e => setField(key, e.target.checked)} />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ── Images ── */}
          <div style={s.card}>
            <p style={s.sectionTitle}>Product Images</p>
            {form.images.map((img, i) => (
              <div key={i} style={{ ...s.row, marginBottom: 12 }}>
                <div style={{ flex: 2 }}>
                  <input style={s.input} placeholder="Image URL" value={img.url} onChange={e => setImage(i, 'url', e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                  <input style={s.input} placeholder="Alt text" value={img.alt} onChange={e => setImage(i, 'alt', e.target.value)} />
                </div>
                {img.url && <img src={img.url} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4 }} onError={e => e.target.style.display='none'} />}
                {form.images.length > 1 && <button type="button" style={s.removeBtn} onClick={() => removeImage(i)}>✕</button>}
              </div>
            ))}
            <button type="button" style={s.addBtn} onClick={addImage}>+ Add Image</button>
          </div>

          {/* ── Sizes & Stock ── */}
          <div style={s.card}>
            <p style={s.sectionTitle}>Sizes & Stock</p>
            {form.sizes.map((sz, i) => (
              <div key={i} style={{ ...s.row, marginBottom: 10 }}>
                <select style={{ ...s.input, width: 140 }} value={sz.size} onChange={e => setSize(i, 'size', e.target.value)}>
                  {SIZE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <input style={{ ...s.input, width: 120 }} type="number" min="0" placeholder="Stock qty" value={sz.stock} onChange={e => setSize(i, 'stock', e.target.value)} />
                {form.sizes.length > 1 && <button type="button" style={s.removeBtn} onClick={() => removeSize(i)}>✕</button>}
              </div>
            ))}
            <button type="button" style={s.addBtn} onClick={addSize}>+ Add Size</button>
          </div>

          {/* ── Colors ── */}
          <div style={s.card}>
            <p style={s.sectionTitle}>Colors</p>
            {form.colors.map((cl, i) => (
              <div key={i} style={{ ...s.row, marginBottom: 10 }}>
                <input style={{ ...s.input, flex: 1 }} placeholder="Color name (e.g. Ivory)" value={cl.name} onChange={e => setColor(i, 'name', e.target.value)} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="color" value={cl.code} onChange={e => setColor(i, 'code', e.target.value)} style={{ width: 48, height: 40, padding: 2, background: '#1f2630', border: '1px solid #2a3038', borderRadius: 4, cursor: 'pointer' }} />
                  <span style={{ fontSize: 12, color: '#a8adb5', fontFamily: 'monospace' }}>{cl.code}</span>
                </div>
                {form.colors.length > 1 && <button type="button" style={s.removeBtn} onClick={() => removeColor(i)}>✕</button>}
              </div>
            ))}
            <button type="button" style={s.addBtn} onClick={addColor}>+ Add Color</button>
          </div>

          {/* ── Submit ── */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => navigate('/admin')} style={{ ...s.btn, background: 'transparent', border: '1px solid #2a3038', color: '#a8adb5' }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{ ...s.btn, background: '#d4a65c', color: '#0a0e12', padding: '12px 32px', fontSize: 14 }}>
              {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}