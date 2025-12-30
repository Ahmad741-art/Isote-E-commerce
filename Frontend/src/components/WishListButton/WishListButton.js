import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishListContext';
import toast from 'react-hot-toast';
import './WishlistButton.css';

const WishlistButton = ({ productId, className = '' }) => {
  const { isAuthenticated } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(false);
  
  const inWishlist = isInWishlist(productId);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      return;
    }

    setLoading(true);

    try {
      if (inWishlist) {
        const result = await removeFromWishlist(productId);
        if (result.success) {
          toast.success('Removed from wishlist');
        }
      } else {
        const result = await addToWishlist(productId);
        if (result.success) {
          toast.success('Added to wishlist');
        } else {
          toast.error(result.message || 'Failed to add to wishlist');
        }
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`wishlist-btn ${inWishlist ? 'in-wishlist' : ''} ${className}`}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={inWishlist ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
};

export default WishlistButton;