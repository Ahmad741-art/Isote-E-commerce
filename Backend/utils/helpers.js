// Async handler to wrap async routes
exports.asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Pagination helper
exports.paginate = (model) => async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments(req.queryFilter || {});

  const pagination = {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  };

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  req.pagination = pagination;
  req.startIndex = startIndex;
  req.limit = limit;

  next();
};

// Generate unique SKU
exports.generateSKU = (productName, category) => {
  const prefix = category.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// Format price
exports.formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Calculate discount
exports.calculateDiscount = (originalPrice, salePrice) => {
  if (!salePrice || salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};
