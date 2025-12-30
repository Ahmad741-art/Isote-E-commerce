const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');
const Order = require('../models/Order');

router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    await Order.findOneAndUpdate(
      { 'payment.stripePaymentIntentId': paymentIntent.id },
      { 
        'payment.status': 'paid',
        'payment.paidAt': new Date(),
        status: 'confirmed'
      }
    );
  }
  
  res.json({ received: true });
});

module.exports = router;
