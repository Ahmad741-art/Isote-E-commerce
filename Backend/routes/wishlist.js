const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const { protect } = require('../middleware/auth');

// Get user's wishlist
router.get('/', protect, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate('products.product');
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add product to wishlist
router.post('/add/:productId', protect, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    // Check if product already in wishlist
    const exists = wishlist.products.some(
      item => item.product.toString() === req.params.productId
    );

    if (exists) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    wishlist.products.unshift({ product: req.params.productId });
    await wishlist.save();

    wishlist = await wishlist.populate('products.product');
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove product from wishlist
router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      item => item.product.toString() !== req.params.productId
    );

    await wishlist.save();
    await wishlist.populate('products.product');

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;