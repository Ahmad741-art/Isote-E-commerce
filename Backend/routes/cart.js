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

router.get('/', optionalAuth, getCart);
router.post('/add', optionalAuth, addToCart);
router.put('/item/:itemId', optionalAuth, updateCartItem);
router.delete('/item/:itemId', optionalAuth, removeFromCart);
router.delete('/clear', optionalAuth, clearCart);

module.exports = router;
