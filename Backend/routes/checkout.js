const express = require('express');
const router = express.Router();
const {
  createPaymentIntent,
  confirmPayment,
} = require('../controllers/checkoutController');
const { optionalAuth } = require('../middleware/auth');

router.post('/create-payment-intent', optionalAuth, createPaymentIntent);
router.post('/confirm-payment', optionalAuth, confirmPayment);

module.exports = router;
