
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    API.get("/api/admin/dashboard").then(r => setStats(r.data)).catch(()=>{});
    API.get("/api/admin/orders").then(r => setOrders(r.data.data || r.data)).catch(()=>{});
  }, []);
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>Sales: ${stats.totalSales || 0}</div>
      <h3>Recent Orders</h3>
      <ul>
        {orders.map(o => <li key={o._id}>#{o._id} - {o.status}</li>)}
      </ul>
      <Link to="/admin/products/new" className="btn">Create Product</Link>
    </div>
  );
}

