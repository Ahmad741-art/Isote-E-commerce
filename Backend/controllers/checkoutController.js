const stripe = require('../config/stripe');
const Cart = require('../models/Cart');
const { asyncHandler } = require('../utils/helpers');

// Create payment intent
exports.createPaymentIntent = asyncHandler(async (req, res) => {
  const query = req.user ? { user: req.user.id } : { sessionId: req.body.sessionId };
  const cart = await Cart.findOne(query);
  
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(cart.total * 100), // Convert to cents
    currency: 'usd',
    metadata: {
      cartId: cart._id.toString(),
      userId: req.user?.id || 'guest',
    },
  });
  
  res.status(200).json({ success: true, clientSecret: paymentIntent.client_secret });
});

// Confirm payment
exports.confirmPayment = asyncHandler(async (req, res) => {
  const { paymentIntentId } = req.body;
  
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  
  if (paymentIntent.status === 'succeeded') {
    res.status(200).json({ success: true, message: 'Payment confirmed' });
  } else {
    res.status(400).json({ success: false, message: 'Payment not completed' });
  }
});
