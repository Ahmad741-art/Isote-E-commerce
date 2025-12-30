const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      min: [0, 'Price cannot be negative'],
    },
    compareAtPrice: {
      type: Number,
      min: [0, 'Compare price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Please select product category'],
      enum: [
        'Clothing',
        'Outerwear',
        'Knitwear',
        'Tailoring',
        'Accessories',
        'Footwear',
        'Bags',
        'Jewelry',
        'Home',
      ],
    },
    subcategory: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Women', 'Men', 'Unisex'],
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: String,
        alt: String,
      },
    ],
    colors: [
      {
        name: String,
        code: String,
        images: [String],
      },
    ],
    sizes: [
      {
        size: {
          type: String,
          required: true,
        },
        stock: {
          type: Number,
          required: true,
          min: [0, 'Stock cannot be negative'],
          default: 0,
        },
      },
    ],
    material: {
      type: String,
      trim: true,
    },
    care: {
      type: String,
      trim: true,
    },
    madeIn: {
      type: String,
      trim: true,
    },
    sku: {
      type: String,
      unique: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    newArrival: {
      type: Boolean,
      default: false,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'draft', 'archived'],
      default: 'active',
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: [String],
    seoTitle: String,
    seoDescription: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create slug from name
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Calculate total stock
productSchema.virtual('totalStock').get(function () {
  return this.sizes.reduce((total, size) => total + size.stock, 0);
});

// Check if product is in stock
productSchema.virtual('inStock').get(function () {
  return this.totalStock > 0;
});

// Check if product is on sale
productSchema.virtual('onSale').get(function () {
  return this.compareAtPrice && this.compareAtPrice > this.price;
});

// Calculate discount percentage
productSchema.virtual('discountPercentage').get(function () {
  if (this.onSale) {
    return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
  }
  return 0;
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ featured: 1, status: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model('Product', productSchema);
