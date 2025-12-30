const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sessionId: {
      type: String,
    },
    items: [cartItemSchema],
    subtotal: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  },
  {
    timestamps: true,
  }
);

// Calculate cart totals before saving
cartSchema.pre('save', function (next) {
  this.subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  this.tax = this.subtotal * 0.1; // 10% tax (adjust as needed)
  this.shipping = this.subtotal > 200 ? 0 : 15; // Free shipping over $200
  this.total = this.subtotal + this.tax + this.shipping;
  next();
});

// Index for cleanup of expired carts
cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Cart', cartSchema);
