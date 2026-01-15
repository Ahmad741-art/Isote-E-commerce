import React, { useEffect, useState } from 'react';
import { productsAPI } from '../services/shopAPI';
import ProductCard from '../components/ProductCard';

export default function Men() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetch() {
      try {
        const res = await productsAPI.getAll();
        if (!mounted) return;
        // filter client-side by gender field (case-insensitive)
        const list = (res.data?.products || res.data || []).filter(p => (p.gender || '').toLowerCase() === 'men');
        setProducts(list);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
    return () => { mounted = false; };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Men</h2>
      {loading ? <p>Loading products...</p> : null}
      {!loading && products.length === 0 ? <p>No products yet — run the demo seed to populate sample items.</p> : null}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginTop: 12 }}>
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}