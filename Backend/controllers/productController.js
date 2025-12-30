const Product = require('../models/Product');
const { asyncHandler, generateSKU } = require('../utils/helpers');

// @route   GET /api/products
// @desc    Get all products with filters
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const { category, gender, minPrice, maxPrice, sort, search } = req.query;

  // Build query
  let query = { status: 'active' };

  // Filter by category
  if (category) {
    query.category = category;
  }

  // Filter by gender
  if (gender) {
    query.gender = gender;
  }

  // Filter by price range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Search
  if (search) {
    query.$text = { $search: search };
  }

  // Sorting
  let sortOptions = {};
  if (sort === 'price-asc') {
    sortOptions = { price: 1 };
  } else if (sort === 'price-desc') {
    sortOptions = { price: -1 };
  } else if (sort === 'newest') {
    sortOptions = { createdAt: -1 };
  } else if (sort === 'popular') {
    sortOptions = { numReviews: -1, rating: -1 };
  } else {
    sortOptions = { createdAt: -1 };
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const startIndex = (page - 1) * limit;

  const total = await Product.countDocuments(query);
  const products = await Product.find(query).sort(sortOptions).skip(startIndex).limit(limit);

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: products,
  });
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @route   GET /api/products/slug/:slug
// @desc    Get product by slug
// @access  Public
exports.getProductBySlug = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @route   GET /api/products/featured
// @desc    Get featured products
// @access  Public
exports.getFeaturedProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ featured: true, status: 'active' }).limit(8);

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
  // Generate SKU if not provided
  if (!req.body.sku) {
    req.body.sku = generateSKU(req.body.name, req.body.category);
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Product deleted',
  });
});
