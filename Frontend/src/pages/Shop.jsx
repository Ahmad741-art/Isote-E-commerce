
import React, { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetch = (params = {}) => {
    API.get("/api/products", { params: { page, limit: 12, ...params } })
      .then(r => {
        setProducts(r.data.data || r.data);
        setTotalPages(r.data.totalPages || 1);
      })
      .catch(e => console.error(e));
  };
  useEffect(() => { fetch(); }, [page]);
  return (
    <div>
      <h2>Shop</h2>
      <SearchBar onSearch={(q) => fetch({ q })} />
      <Filters onFilter={(f) => fetch(f)} />
      <div className="grid">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={(p)=>setPage(p)} />
    </div>
  );
}

