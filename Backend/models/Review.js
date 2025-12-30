const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide a review comment'],
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    helpful: {
      type: Number,
      default: 0,
    },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate reviews from same user on same product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Update product rating when review is saved
reviewSchema.statics.calculateAverageRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId, status: 'approved' },
    },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model('Product').findByIdAndUpdate(productId, {
      rating: stats.length > 0 ? stats[0].averageRating : 0,
      numReviews: stats.length > 0 ? stats[0].numReviews : 0,
    });
  } catch (error) {
    console.error(error);
  }
};

// Calculate rating after save
reviewSchema.post('save', function () {
  this.constructor.calculateAverageRating(this.product);
});

// Calculate rating after remove
reviewSchema.post('remove', function () {
  this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model('Review', reviewSchema);
