import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      setCart(response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1, size = null) => {
    try {
      if (isAuthenticated) {
        const response = await cartAPI.addItem({
          productId: product._id,
          quantity,
          size,
        });
        setCart(response.data.items);
      } else {
        const existingItem = cart.find(
          (item) => item.product._id === product._id && item.size === size
        );

        let newCart;
        if (existingItem) {
          newCart = cart.map((item) =>
            item.product._id === product._id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newCart = [...cart, { product, quantity, size, _id: Date.now().toString() }];
        }

        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      if (quantity <= 0) {
        return removeFromCart(itemId);
      }

      if (isAuthenticated) {
        const response = await cartAPI.updateItem(itemId, { quantity });
        setCart(response.data.items);
      } else {
        const newCart = cart.map((item) =>
          item._id === itemId ? { ...item, quantity } : item
        );
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      if (isAuthenticated) {
        const response = await cartAPI.removeItem(itemId);
        setCart(response.data.items);
      } else {
        const newCart = cart.filter((item) => item._id !== itemId);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await cartAPI.clearCart();
      } else {
        localStorage.removeItem('cart');
      }
      setCart([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};