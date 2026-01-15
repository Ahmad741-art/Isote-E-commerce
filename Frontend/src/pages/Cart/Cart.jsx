import React, { useEffect, useState } from 'react';
import { cartAPI, checkoutAPI, productsAPI } from '../services/shopAPI';
import { useNavigate } from 'react-router-dom';

function readLocalCart() {
  try {
    return JSON.parse(localStorage.getItem('local_cart') || '[]');
  } catch {
    return [];
  }
}

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        if (token) {
          const res = await cartAPI.get();
          const serverCart = res.data?.cart || res.data || [];
          if (mounted) setItems(serverCart);
        } else {
          const local = readLocalCart();
          // enrich local cart with product data
          const enriched = await Promise.all(local.map(async it => {
            try {
              const p = await productsAPI.getById(it.productId);
              const product = p.data?.product || p.data;
              return { ...it, product };
            } catch {
              return { ...it, product: null };
            }
          }));
          if (mounted) setItems(enriched);
        }
      } catch (err) {
        console.error('Failed to load cart', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const checkout = async () => {
    // create a simple checkout payload; backend should accept items or compute from server cart
    const token = localStorage.getItem('token');
    const payload = {
      items: items.map(it => ({ productId: it.productId || it.product?._id, quantity: it.quantity })),
    };
    try {
      const res = await checkoutAPI.createPaymentIntent(payload);
      alert('Payment intent created. (In demo mode just confirm server response in console.)');
      console.log('Payment intent response:', res.data);
      // Optionally navigate to order confirmation
      navigate('/');
    } catch (err) {
      console.error('Checkout failed', err);
      alert('Checkout failed. See console for details.');
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading cart...</div>;
  if (!items || items.length === 0) return <div style={{ padding: 20 }}>Your cart is empty.</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((it, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'center', border: '1px solid #eee', padding: 12 }}>
            <img src={(it.product?.images && it.product.images[0]) || 'https://via.placeholder.com/120x160?text=Product'} alt={it.product?.name} style={{ width: 80, height: 110, objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{it.product?.name || 'Product'}</div>
              <div style={{ color: '#666' }}>{it.quantity} × ${it.product?.price?.toFixed?.(2) || it.product?.price}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={checkout} style={{ padding: '10px 18px', background: '#111', color: '#fff', border: 'none', borderRadius: 4 }}>Proceed to Checkout</button>
      </div>
    </div>
  );
}