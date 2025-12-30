import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${API_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(data.products || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${API_URL}/wishlist/add/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlist(data.products || []);
      return { success: true };
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to add to wishlist' };
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.delete(
        `${API_URL}/wishlist/remove/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlist(data.products || []);
      return { success: true };
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return { success: false };
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.product?._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        fetchWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};