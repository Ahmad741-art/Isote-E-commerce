const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllCustomers,
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.get('/dashboard', protect, admin, getDashboardStats);
router.get('/orders', protect, admin, getAllOrders);
router.put('/orders/:id', protect, admin, updateOrderStatus);
router.get('/customers', protect, admin, getAllCustomers);

module.exports = router;
