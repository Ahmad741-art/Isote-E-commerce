
import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.images?.[0]?.url || "/placeholder.png"} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <div className="price">${product.price}</div>
    </div>
  );
}

