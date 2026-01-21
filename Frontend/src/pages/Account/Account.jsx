
import React, { useEffect, useState } from "react";
import API from "../../services/api";

export default function Account() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    API.get("/api/orders").then(r => setOrders(r.data.data || r.data)).catch(console.error);
  }, []);
  return (
    <div>
      <h2>Your Account</h2>
      <h3>Orders</h3>
      <ul>
        {orders.map(o => <li key={o._id}>#{o._id} - {o.status} - ${o.total}</li>)}
      </ul>
    </div>
  );
}

