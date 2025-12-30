const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { asyncHandler } = require('../utils/helpers');

// Get cart
exports.getCart = asyncHandler(async (req, res) => {
  const query = req.user ? { user: req.user.id } : { sessionId: req.body.sessionId };
  let cart = await Cart.findOne(query).populate('items.product');
  
  if (!cart) {
    cart = await Cart.create(query);
  }
  
  res.status(200).json({ success: true, data: cart });
});

// Add to cart
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity, size, color, sessionId } = req.body;
  
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  
  const query = req.user ? { user: req.user.id } : { sessionId };
  let cart = await Cart.findOne(query);
  
  if (!cart) {
    cart = await Cart.create(query);
  }
  
  const existingItem = cart.items.find(
    item => item.product.toString() === productId && item.size === size && item.color === color
  );
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity, size, color, price: product.price });
  }
  
  await cart.save();
  await cart.populate('items.product');
  
  res.status(200).json({ success: true, data: cart });
});

// Update cart item
exports.updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const query = req.user ? { user: req.user.id } : { sessionId: req.body.sessionId };
  
  const cart = await Cart.findOne(query);
  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }
  
  const item = cart.items.id(req.params.itemId);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  
  item.quantity = quantity;
  await cart.save();
  await cart.populate('items.product');
  
  res.status(200).json({ success: true, data: cart });
});

// Remove from cart
exports.removeFromCart = asyncHandler(async (req, res) => {
  const query = req.user ? { user: req.user.id } : { sessionId: req.body.sessionId };
  
  const cart = await Cart.findOne(query);
  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }
  
  cart.items.pull(req.params.itemId);
  await cart.save();
  await cart.populate('items.product');
  
  res.status(200).json({ success: true, data: cart });
});

// Clear cart
exports.clearCart = asyncHandler(async (req, res) => {
  const query = req.user ? { user: req.user.id } : { sessionId: req.body.sessionId };
  
  const cart = await Cart.findOne(query);
  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }
  
  cart.items = [];
  await cart.save();
  
  res.status(200).json({ success: true, data: cart });
});
