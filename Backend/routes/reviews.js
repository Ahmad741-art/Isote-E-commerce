const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a review
router.post('/', protect, async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    // Check if user purchased this product
    const hasPurchased = await Order.findOne({
      user: req.user._id,
      'items.product': productId,
      isPaid: true
    });

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating,
      title,
      comment,
      verified: hasPurchased ? true : false
    });

    // Update product rating
    await updateProductRating(productId);

    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name');

    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark review as helpful/not helpful
router.put('/:id/helpful', protect, async (req, res) => {
  try {
    const { helpful } = req.body; // true or false

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (helpful) {
      review.helpful += 1;
    } else {
      review.notHelpful += 1;
    }

    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Helper function to update product rating
async function updateProductRating(productId) {
  const reviews = await Review.find({ product: productId });
  
  const numReviews = reviews.length;
  const rating = numReviews > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / numReviews
    : 0;

  await Product.findByIdAndUpdate(productId, {
    rating: rating.toFixed(1),
    numReviews
  });
}

module.exports = router;