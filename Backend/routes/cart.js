const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { optionalAuth } = require('../middleware/auth');

// Get cart
// GET /api/cart
router.get('/', optionalAuth, getCart);

// Add item to cart
// POST /api/cart
router.post('/', optionalAuth, addToCart);

// Update cart item quantity
// PUT /api/cart/:itemId
router.put('/:itemId', optionalAuth, updateCartItem);

// Remove item from cart
// DELETE /api/cart/:itemId
router.delete('/:itemId', optionalAuth, removeFromCart);

// Clear entire cart (optional - if you want a separate endpoint)
// You can also handle this in the controller by checking if itemId exists
// DELETE /api/cart/clear
router.delete('/clear', optionalAuth, clearCart);

module.exports = router;