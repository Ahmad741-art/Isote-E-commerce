import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      const sessionId = getOrCreateSessionId();
      fetchCart(sessionId);
    }
  }, [isAuthenticated]);

  const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  };

  const fetchCart = async (sessionId) => {
    try {
      setLoading(true);
      const { data } = await cartAPI.get();
      setCart(data.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity, size, color) => {
    try {
      const sessionId = getOrCreateSessionId();
      const { data } = await cartAPI.add({
        productId,
        quantity,
        size,
        color,
        sessionId,
      });
      setCart(data.data);
      toast.success('Added to cart');
      setCartOpen(true);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      toast.error(message);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const { data } = await cartAPI.update(itemId, { quantity });
      setCart(data.data);
    } catch (error) {
      toast.error('Failed to update item');
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const { data } = await cartAPI.remove(itemId);
      setCart(data.data);
      toast.success('Removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      const { data } = await cartAPI.clear();
      setCart(data.data);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getCartCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    cartOpen,
    setCartOpen,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
