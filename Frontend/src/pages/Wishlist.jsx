
import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    API.get("/api/auth/wishlist").then(r => setItems(r.data.data || r.data)).catch(() => setItems([]));
  }, []);
  return (
    <div>
      <h2>Your Wishlist</h2>
      {items.length === 0 ? <p>No items in wishlist.</p> : (
        <ul>
          {items.map(i => <li key={i._id}><Link to={`/product/${i._id}`}>{i.name}</Link></li>)}
        </ul>
      )}
    </div>
  );
}

