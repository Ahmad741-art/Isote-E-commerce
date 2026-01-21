
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (product, qty = 1, variant = null) => {
    setCart((c) => {
      const key = variant ? `${product._id}:${variant}` : product._id;
      const found = c.find((i) => i.key === key);
      if (found) {
        return c.map((i) => i.key === key ? { ...i, qty: i.qty + qty } : i);
      }
      return [...c, { key, product: product._id, qty, variant, snapshot: product }];
    });
  };
  const remove = (key) => setCart(c => c.filter(i => i.key !== key));
  const clear = () => setCart([]);
  return <CartContext.Provider value={{ cart, setCart, addToCart, remove, clear }}>{children}</CartContext.Provider>;
}

export function useCart() { return useContext(CartContext); }

