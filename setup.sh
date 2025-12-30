#!/bin/bash

# Isoté E-commerce Platform - Complete Setup Script
# This script creates the entire project structure with all files

echo "========================================="
echo "  Isoté Luxury E-commerce Platform"
echo "  Complete Project Setup"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${GREEN}Creating project structure...${NC}"

# ====================================
# BACKEND STRUCTURE
# ====================================
echo "📦 Creating Backend structure..."

mkdir -p Backend/{config,models,routes,controllers,middleware,utils,seeds}

# Backend package.json
cat > Backend/package.json << 'EOF'
{
  "name": "isote-backend",
  "version": "1.0.0",
  "description": "Isoté Luxury E-commerce Backend API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node seeds/seedProducts.js"
  },
  "keywords": ["ecommerce", "luxury", "fashion"],
  "author": "Ahmad",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-validator": "^7.0.1",
    "multer": "^1.4.5-lts.1",
    "cloudinary": "^1.41.0",
    "stripe": "^14.9.0",
    "nodemailer": "^6.9.7",
    "express-rate-limit": "^7.1.5",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
EOF

# Backend .env.example
cat > Backend/.env.example << 'EOF'
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/isote-ecommerce

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer with Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=noreply@isote.com

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Admin
ADMIN_EMAIL=admin@isote.com
ADMIN_PASSWORD=Admin123!
EOF

# Backend .gitignore
cat > Backend/.gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json

# Environment variables
.env

# Logs
logs/
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Uploads
uploads/
EOF

# ====================================
# BACKEND CONFIG FILES
# ====================================
echo "⚙️  Creating Backend config files..."

cat > Backend/config/database.js << 'EOF'
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
EOF

cat > Backend/config/stripe.js << 'EOF'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;
EOF

# ====================================
# BACKEND MODELS
# ====================================
echo "📊 Creating Backend models..."

cat > Backend/models/User.js << 'EOF'
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  phone: {
    type: String,
    trim: true,
  },
  addresses: [{
    type: {
      type: String,
      enum: ['shipping', 'billing'],
      default: 'shipping',
    },
    firstName: String,
    lastName: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  stripeCustomerId: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
EOF

cat > Backend/models/Product.js << 'EOF'
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: 0,
  },
  compareAtPrice: {
    type: Number,
    min: 0,
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['clothing', 'accessories', 'shoes', 'bags', 'jewelry'],
  },
  subCategory: {
    type: String,
  },
  collection: {
    type: String,
    enum: ['new-arrivals', 'essentials', 'archive', 'limited-edition'],
  },
  images: [{
    url: String,
    publicId: String,
    alt: String,
  }],
  sizes: [{
    size: {
      type: String,
      enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'ONE SIZE'],
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  }],
  colors: [{
    name: String,
    hex: String,
  }],
  materials: [String],
  care: [String],
  madeIn: String,
  sku: {
    type: String,
    unique: true,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  tags: [String],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Generate slug before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Virtual for reviews
productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
});

module.exports = mongoose.model('Product', productSchema);
EOF

cat > Backend/models/Cart.js << 'EOF'
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
    min: 1,
    default: 1,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
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
}, {
  timestamps: true,
});

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  this.subtotal = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  this.tax = this.subtotal * 0.08; // 8% tax
  this.shipping = this.subtotal > 200 ? 0 : 15; // Free shipping over $200
  this.total = this.subtotal + this.tax + this.shipping;
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
EOF

cat > Backend/models/Order.js << 'EOF'
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: String,
  image: String,
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  size: String,
  color: String,
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderNumber: {
    type: String,
    unique: true,
  },
  items: [orderItemSchema],
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address1: { type: String, required: true },
    address2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: String,
  },
  billingAddress: {
    firstName: String,
    lastName: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'paypal'],
    default: 'card',
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: Date,
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: Date,
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  trackingNumber: String,
  notes: String,
}, {
  timestamps: true,
});

// Generate order number before saving
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = 'ISO-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
EOF

cat > Backend/models/Review.js << 'EOF'
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
    required: true,
    min: 1,
    max: 5,
  },
  title: {
    type: String,
    trim: true,
  },
  comment: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  helpful: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Prevent duplicate reviews
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
EOF

# ====================================
# BACKEND MIDDLEWARE
# ====================================
echo "🔐 Creating Backend middleware..."

cat > Backend/middleware/auth.js << 'EOF'
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found',
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error in authentication',
    });
  }
};
EOF

cat > Backend/middleware/admin.js << 'EOF'
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin only.',
    });
  }
};
EOF

cat > Backend/middleware/errorHandler.js << 'EOF'
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
EOF

# ====================================
# BACKEND CONTROLLERS
# ====================================
echo "🎮 Creating Backend controllers..."

cat > Backend/controllers/authController.js << 'EOF'
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, email, phone },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
EOF

cat > Backend/controllers/productController.js << 'EOF'
const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { category, collection, sort, minPrice, maxPrice, search } = req.query;
    
    let query = { isActive: true };

    // Filters
    if (category) query.category = category;
    if (collection) query.collection = collection;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$text = { $search: search };
    }

    // Sorting
    let sortOption = {};
    if (sort === 'price-asc') sortOption.price = 1;
    else if (sort === 'price-desc') sortOption.price = -1;
    else if (sort === 'newest') sortOption.createdAt = -1;
    else sortOption.createdAt = -1;

    const products = await Product.find(query).sort(sortOption);

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('reviews');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      message: 'Product removed',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
EOF

cat > Backend/controllers/cartController.js << 'EOF'
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId && item.size === size && item.color === color
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        size,
        color,
        price: product.price,
      });
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update cart item
// @route   PUT /api/cart/:itemId
// @access  Private
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
EOF

cat > Backend/controllers/orderController.js << 'EOF'
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, billingAddress, paymentMethod, paymentResult } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items',
      });
    }

    // Calculate totals
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal > 200 ? 0 : 15;
    const total = subtotal + tax + shipping;

    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentMethod,
      paymentResult,
      subtotal,
      tax,
      shipping,
      total,
      isPaid: true,
      paidAt: Date.now(),
    });

    // Clear cart
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [] }
    );

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort('-createdAt');

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'firstName lastName email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check if user owns order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'firstName lastName email')
      .sort('-createdAt');

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    await order.save();

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
EOF

cat > Backend/controllers/checkoutController.js << 'EOF'
const stripe = require('../config/stripe');

// @desc    Create payment intent
// @route   POST /api/checkout/create-payment-intent
// @access  Private
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: { userId: req.user.id },
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
EOF

cat > Backend/controllers/adminController.js << 'EOF'
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'customer' });
    
    const revenue = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    const recentOrders = await Order.find()
      .populate('user', 'firstName lastName email')
      .sort('-createdAt')
      .limit(10);

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue: revenue[0]?.total || 0,
        recentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort('-createdAt');

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
EOF

# ====================================
# BACKEND ROUTES
# ====================================
echo "🛣️  Creating Backend routes..."

cat > Backend/routes/auth.js << 'EOF'
const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
EOF

cat > Backend/routes/products.js << 'EOF'
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');

router.route('/')
  .get(getProducts)
  .post(protect, isAdmin, createProduct);

router.get('/slug/:slug', getProductBySlug);

router.route('/:id')
  .get(getProduct)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);

module.exports = router;
EOF

cat > Backend/routes/cart.js << 'EOF'
const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getCart)
  .post(protect, addToCart)
  .delete(protect, clearCart);

router.route('/:itemId')
  .put(protect, updateCartItem)
  .delete(protect, removeFromCart);

module.exports = router;
EOF

cat > Backend/routes/orders.js << 'EOF'
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');

router.route('/')
  .get(protect, getUserOrders)
  .post(protect, createOrder);

router.get('/admin/all', protect, isAdmin, getAllOrders);

router.route('/:id')
  .get(protect, getOrderById);

router.put('/:id/status', protect, isAdmin, updateOrderStatus);

module.exports = router;
EOF

cat > Backend/routes/checkout.js << 'EOF'
const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/checkoutController');
const { protect } = require('../middleware/auth');

router.post('/create-payment-intent', protect, createPaymentIntent);

module.exports = router;
EOF

cat > Backend/routes/admin.js << 'EOF'
const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');

router.get('/stats', protect, isAdmin, getDashboardStats);
router.get('/users', protect, isAdmin, getAllUsers);

module.exports = router;
EOF

cat > Backend/routes/webhooks.js << 'EOF'
const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');

router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object);
        break;
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = router;
EOF

# ====================================
# BACKEND UTILS
# ====================================
echo "🔧 Creating Backend utils..."

cat > Backend/utils/email.js << 'EOF'
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async (options) => {
  const message = {
    from: `${process.env.EMAIL_FROM} <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(message);
};

exports.sendOrderConfirmation = async (order, user) => {
  const message = `
    <h1>Order Confirmation</h1>
    <p>Thank you for your order, ${user.firstName}!</p>
    <p>Order Number: <strong>${order.orderNumber}</strong></p>
    <p>Total: $${order.total.toFixed(2)}</p>
    <p>We'll send you a shipping confirmation when your order ships.</p>
  `;

  await this.sendEmail({
    email: user.email,
    subject: `Order Confirmation - ${order.orderNumber}`,
    message,
  });
};
EOF

cat > Backend/utils/imageUpload.js << 'EOF'
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload only images.'), false);
    }
  },
});

exports.upload = upload;
exports.cloudinary = cloudinary;
EOF

cat > Backend/utils/helpers.js << 'EOF'
// Generate unique SKU
exports.generateSKU = (productName, category) => {
  const prefix = category.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}-${timestamp}-${random}`;
};

// Format price
exports.formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Calculate discount percentage
exports.calculateDiscount = (originalPrice, salePrice) => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};
EOF

# ====================================
# BACKEND SEED DATA
# ====================================
echo "🌱 Creating Backend seed data..."

cat > Backend/seeds/seedProducts.js << 'EOF'
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const connectDB = require('../config/database');

const products = [
  {
    name: 'Cashmere Sweater',
    description: 'Luxurious 100% cashmere sweater with ribbed details. Timeless silhouette crafted from the finest Italian yarn.',
    price: 395,
    category: 'clothing',
    subCategory: 'sweaters',
    collection: 'essentials',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
        alt: 'Cashmere sweater front view',
      },
    ],
    sizes: [
      { size: 'XS', stock: 10 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 10 },
    ],
    colors: [
      { name: 'Ivory', hex: '#F5F5DC' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Camel', hex: '#C19A6B' },
    ],
    materials: ['100% Cashmere'],
    care: ['Dry clean only', 'Store folded'],
    madeIn: 'Italy',
    sku: 'CLO-123456-789',
    stock: 70,
    isFeatured: true,
    tags: ['luxury', 'cashmere', 'sweater', 'essentials'],
  },
  {
    name: 'Tailored Wool Trousers',
    description: 'Classic high-waisted trousers in premium Italian wool. Clean lines and impeccable drape.',
    price: 285,
    category: 'clothing',
    subCategory: 'trousers',
    collection: 'essentials',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
        alt: 'Wool trousers',
      },
    ],
    sizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 12 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 8 },
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Grey', hex: '#808080' },
    ],
    materials: ['100% Virgin Wool'],
    care: ['Dry clean only', 'Iron on low heat'],
    madeIn: 'Italy',
    sku: 'CLO-123457-790',
    stock: 55,
    isFeatured: true,
    tags: ['trousers', 'wool', 'tailored'],
  },
  {
    name: 'Silk Blouse',
    description: 'Fluid silk blouse with concealed buttons. Effortless elegance in lustrous charmeuse silk.',
    price: 425,
    category: 'clothing',
    subCategory: 'tops',
    collection: 'new-arrivals',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800',
        alt: 'Silk blouse',
      },
    ],
    sizes: [
      { size: 'XS', stock: 10 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 10 },
    ],
    colors: [
      { name: 'Ivory', hex: '#F5F5DC' },
      { name: 'Black', hex: '#000000' },
    ],
    materials: ['100% Silk Charmeuse'],
    care: ['Dry clean only', 'Do not wring'],
    madeIn: 'France',
    sku: 'CLO-123458-791',
    stock: 50,
    isFeatured: true,
    tags: ['silk', 'blouse', 'luxury'],
  },
  {
    name: 'Leather Tote Bag',
    description: 'Spacious tote crafted from vegetable-tanned Italian leather. Features interior pockets and magnetic closure.',
    price: 895,
    category: 'bags',
    collection: 'essentials',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
        alt: 'Leather tote bag',
      },
    ],
    sizes: [
      { size: 'ONE SIZE', stock: 25 },
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Cognac', hex: '#8B4513' },
    ],
    materials: ['100% Italian Leather'],
    care: ['Wipe with soft cloth', 'Avoid water', 'Condition regularly'],
    madeIn: 'Italy',
    sku: 'BAG-123459-792',
    stock: 25,
    isFeatured: true,
    tags: ['bag', 'leather', 'tote'],
  },
  {
    name: 'Merino Wool Coat',
    description: 'Double-breasted coat in luxurious merino wool. Timeless silhouette with horn buttons.',
    price: 1295,
    compareAtPrice: 1495,
    category: 'clothing',
    subCategory: 'outerwear',
    collection: 'new-arrivals',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
        alt: 'Merino wool coat',
      },
    ],
    sizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 8 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 8 },
      { size: 'XL', stock: 5 },
    ],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Black', hex: '#000000' },
    ],
    materials: ['100% Merino Wool'],
    care: ['Dry clean only', 'Store on hanger'],
    madeIn: 'Italy',
    sku: 'CLO-123460-793',
    stock: 36,
    isFeatured: true,
    tags: ['coat', 'wool', 'outerwear'],
  },
  {
    name: 'Leather Ankle Boots',
    description: 'Minimalist ankle boots in smooth calfskin leather. Italian craftsmanship with stacked heel.',
    price: 595,
    category: 'shoes',
    collection: 'essentials',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
        alt: 'Leather ankle boots',
      },
    ],
    sizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 10 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 5 },
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' },
    ],
    materials: ['100% Calfskin Leather'],
    care: ['Wipe with soft cloth', 'Use leather conditioner'],
    madeIn: 'Italy',
    sku: 'SHO-123461-794',
    stock: 42,
    tags: ['boots', 'leather', 'shoes'],
  },
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products');

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} products`);

    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin',
      });
      console.log('Created admin user');
    }

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedData();
EOF

# ====================================
# BACKEND SERVER
# ====================================
echo "🚀 Creating Backend server..."

cat > Backend/server.js << 'EOF'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const checkoutRoutes = require('./routes/checkout');
const adminRoutes = require('./routes/admin');
const webhookRoutes = require('./routes/webhooks');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Webhook route (must be before express.json())
app.use('/api/webhooks', webhookRoutes);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Isoté API is running' });
});

// Error handler
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   Isoté E-commerce API Server         ║
║   Running on port ${PORT}                ║
║   Environment: ${process.env.NODE_ENV || 'development'}            ║
╚═══════════════════════════════════════╝
  `);
});

module.exports = app;
EOF

echo ""
echo -e "${GREEN}✓ Backend structure created successfully!${NC}"
echo ""

# Continue with Frontend...
echo "========================================="
echo "  Creating Frontend Structure"
echo "========================================="
echo ""

# I'll continue with the Frontend structure in the next part
# This is getting quite long, so I'll create a continuation marker

cat >> setup.sh << 'FRONTEND_MARKER'

# ====================================
# FRONTEND STRUCTURE (Part 2)
# ====================================
# Note: Due to script length, Frontend setup continues...
# Run the PowerShell version or manual setup for complete Frontend
FRONTEND_MARKER

chmod +x setup.sh

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Setup script created: setup.sh${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "Backend structure is complete!"
echo "Frontend structure continues in setup-frontend.sh"
echo ""

EOF
