
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminProductForm({ edit=false }) {
  const { id } = useParams();
  const [product, setProduct] = useState({ name:"", description:"", price:0, sizes:[], images:[] });
  const nav = useNavigate();
  useEffect(() => {
    if (edit && id) API.get(`/api/products/${id}`).then(r=>setProduct(r.data.data||r.data));
  }, [edit,id]);
  const submit = async (e) => {
    e.preventDefault();
    try {
      if (edit) await API.put(`/api/products/${id}`, product);
      else await API.post("/api/products", product);
      nav("/admin");
    } catch (err) { alert("Save failed"); }
  };
  return (
    <form onSubmit={submit}>
      <h2>{edit ? "Edit" : "Create"} Product</h2>
      <input placeholder="Name" value={product.name} onChange={e=>setProduct({...product, name:e.target.value})} />
      <textarea placeholder="Description" value={product.description} onChange={e=>setProduct({...product, description:e.target.value})} />
      <input type="number" placeholder="Price" value={product.price} onChange={e=>setProduct({...product, price:parseFloat(e.target.value||0)})} />
      <input placeholder="Sizes (comma separated)" value={product.sizes?.join(",")} onChange={e=>setProduct({...product, sizes:e.target.value.split(",").map(s=>s.trim())})} />
      <button className="btn">{edit ? "Save" : "Create"}</button>
    </form>
  );
}

