
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  const submit = (e) => { e.preventDefault(); onSearch(q); };
  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
      <input placeholder="Search products..." value={q} onChange={e=>setQ(e.target.value)} />
      <button className="btn">Search</button>
    </form>
  );
}

