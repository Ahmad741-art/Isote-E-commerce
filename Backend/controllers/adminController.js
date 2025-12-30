const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { asyncHandler } = require('../utils/helpers');
const { sendShippingConfirmation } = require('../utils/email');

// Get dashboard stats
exports.getDashboardStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalCustomers = await User.countDocuments({ role: 'customer' });
  
  const recentOrders = await Order.find().sort('-createdAt').limit(10).populate('user', 'firstName lastName email');
  
  const revenue = await Order.aggregate([
    { $match: { 'payment.status': 'paid' } },
    { $group: { _id: null, total: { $sum: '$pricing.total' } } }
  ]);
  
  res.status(200).json({
    success: true,
    data: {
      totalOrders,
      totalProducts,
      totalCustomers,
      totalRevenue: revenue[0]?.total || 0,
      recentOrders,
    },
  });
});

// Get all orders (admin)
exports.getAllOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  
  const total = await Order.countDocuments();
  const orders = await Order.find().sort('-createdAt').skip(skip).limit(limit).populate('user', 'firstName lastName email');
  
  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: orders,
  });
});

// Update order status
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, trackingNumber, carrier } = req.body;
  
  const order = await Order.findById(req.params.id).populate('user');
  
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  
  order.status = status;
  
  if (status === 'shipped') {
    order.shipping.shippedAt = Date.now();
    if (trackingNumber) order.shipping.trackingNumber = trackingNumber;
    if (carrier) order.shipping.carrier = carrier;
    await sendShippingConfirmation(order, order.user);
  }
  
  if (status === 'delivered') {
    order.shipping.deliveredAt = Date.now();
  }
  
  await order.save();
  
  res.status(200).json({ success: true, data: order });
});

// Get all customers
exports.getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find({ role: 'customer' }).select('-password').sort('-createdAt');
  
  res.status(200).json({ success: true, count: customers.length, data: customers });
});
