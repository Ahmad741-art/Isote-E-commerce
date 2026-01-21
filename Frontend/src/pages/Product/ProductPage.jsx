
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [selectedVariant, setSelectedVariant] = useState(null);
  useEffect(() => {
    API.get(`/api/products/${id}`).then(r => setProduct(r.data.data || r.data)).catch(console.error);
  }, [id]);

  if (!product) return <div>Loading...</div>;
  const add = () => addToCart(product, 1, selectedVariant);
  return (
    <div className="product-page">
      <img src={product.images?.[0]?.url || "/placeholder.png"} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="price">${product.price}</div>

        {product.sizes?.length > 0 && (
          <div>
            <label>Size</label>
            <select onChange={(e)=>setSelectedVariant(e.target.value)}>
              <option value="">Select size</option>
              {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}

        <button onClick={add} className="btn">Add to cart</button>

        <hr />
        <h3>Reviews</h3>
        <ul>
          {product.reviews?.map(r => <li key={r._id}><strong>{r.userName}</strong>: {r.comment}</li>)}
        </ul>
        {user && <p>Thanks for being logged in — you can leave a review in the future.</p>}
      </div>
    </div>
  );
}

