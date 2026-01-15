import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI, cartAPI } from '../services/shopAPI';

function saveLocalCartItem(item) {
  const key = 'local_cart';
  const raw = localStorage.getItem(key);
  const list = raw ? JSON.parse(raw) : [];
  list.push(item);
  localStorage.setItem(key, JSON.stringify(list));
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await productsAPI.getById(id);
        if (!mounted) return;
        setProduct(res.data?.product || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem('token');
    const item = { productId: product._id, quantity: qty };
    try {
      if (token) {
        // attempt server-side add
        await cartAPI.add(item);
        alert('Added to cart (server)');
      } else {
        saveLocalCartItem(item);
        alert('Added to cart (local)');
      }
    } catch (err) {
      console.error('Add to cart failed, saving locally', err);
      saveLocalCartItem(item);
      alert('Added to cart (local)');
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!product) return <div style={{ padding: 20 }}>Product not found</div>;

  const img = (product.images && product.images[0]) || 'https://via.placeholder.com/600x800?text=Product';
  return (
    <div style={{ padding: 20, display: 'flex', gap: 24 }}>
      <div style={{ flex: 1 }}>
        <img src={img} alt={product.name} style={{ width: '100%', maxWidth: 600, objectFit: 'cover', borderRadius: 6 }} />
      </div>
      <div style={{ flex: 1 }}>
        <h2>{product.name}</h2>
        <p style={{ color: '#666' }}>{product.description}</p>
        <div style={{ fontWeight: 700, marginTop: 8 }}>${product.price?.toFixed?.(2) || product.price}</div>

        <div style={{ marginTop: 12 }}>
          <label>Quantity</label>
          <br />
          <input type="number" min="1" value={qty} onChange={(e) => setQty(Number(e.target.value))} style={{ width: 80, marginTop: 6 }} />
        </div>

        <div style={{ marginTop: 16 }}>
          <button onClick={addToCart} style={{ padding: '10px 18px', background: '#111', color: '#fff', border: 'none', borderRadius: 4 }}>Add to Cart</button>
          <button onClick={() => navigate('/cart')} style={{ marginLeft: 10, padding: '10px 18px' }}>Go to Cart</button>
        </div>
      </div>
    </div>
  );
}