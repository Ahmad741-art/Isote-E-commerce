
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, remove, clear } = useCart();
  const total = cart.reduce((s, i) => s + (i.snapshot?.price || 0) * i.qty, 0);
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty. <Link to="/shop">Shop</Link></p> : (
        <>
          <ul>
            {cart.map(i => (
              <li key={i.key}>
                {i.snapshot?.name} {i.variant ? `(${i.variant})` : ""} x {i.qty} - ${(i.snapshot?.price || 0) * i.qty}
                <button onClick={()=>remove(i.key)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>Total: ${total}</div>
          <Link to="/checkout" className="btn">Checkout</Link>
          <button onClick={clear}>Clear</button>
        </>
      )}
    </div>
  );
}

