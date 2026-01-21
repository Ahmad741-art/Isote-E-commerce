
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const nav = useNavigate();
  return (
    <nav className="nav">
      <Link to="/" className="logo">Isoté</Link>
      <div className="nav-links">
        <Link to="/shop">Shop</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        {user ? (
          <>
            <Link to="/account">Account</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <button onClick={() => { logout(); nav("/"); }} className="link-btn">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

