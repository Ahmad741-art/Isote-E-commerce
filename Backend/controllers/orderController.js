const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { asyncHandler } = require('../utils/helpers');
const { sendOrderConfirmation } = require('../utils/email');

// Get user orders
exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort('-createdAt').populate('items.product');
  
  res.status(200).json({ success: true, count: orders.length, data: orders });
});

// Get single order
exports.getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.product');
  
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  
  // Make sure user owns order
  if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized' });
  }
  
  res.status(200).json({ success: true, data: order });
});

// Create order
exports.createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, billingAddress, pricing, payment } = req.body;
  
  // Validate stock
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) {
      return res.status(404).json({ success: false, message: `Product ${item.product} not found` });
    }
    
    const sizeStock = product.sizes.find(s => s.size === item.size);
    if (!sizeStock || sizeStock.stock < item.quantity) {
      return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
    }
  }
  
  const order = await Order.create({
    user: req.user.id,
    items,
    shippingAddress,
    billingAddress,
    pricing,
    payment,
  });
  
  // Update product stock
  for (const item of items) {
    const product = await Product.findById(item.product);
    const sizeStock = product.sizes.find(s => s.size === item.size);
    sizeStock.stock -= item.quantity;
    await product.save();
  }
  
  // Clear cart
  await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });
  
  // Send confirmation email
  await sendOrderConfirmation(order, req.user);
  
  res.status(201).json({ success: true, data: order });
});

// Cancel order
exports.cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  
  if (order.user.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized' });
  }
  
  if (order.status !== 'pending' && order.status !== 'confirmed') {
    return res.status(400).json({ success: false, message: 'Cannot cancel order at this stage' });
  }
  
  order.status = 'cancelled';
  order.cancellationReason = req.body.reason;
  await order.save();
  
  // Restore stock
  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (product) {
      const sizeStock = product.sizes.find(s => s.size === item.size);
      if (sizeStock) {
        sizeStock.stock += item.quantity;
        await product.save();
      }
    }
  }
  
  res.status(200).json({ success: true, data: order });
});
