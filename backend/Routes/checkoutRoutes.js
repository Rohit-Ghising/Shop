const express = require('express');
const router = express.Router();
const Checkout = require('../models/Checkout');

// @route   POST /api/checkout
// @desc    Create a new checkout
// @access  Protected (you can add auth middleware later)
router.post('/', async (req, res) => {
  try {
    const {
      user, // should be ObjectId (you can replace with req.user._id if using auth)
      checkoutitems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentDetails,
    } = req.body;

    // Simple validation
    if (!checkoutitems || checkoutitems.length === 0) {
      return res.status(400).json({ message: 'No checkout items provided' });
    }

    const checkout = new Checkout({
      user,
      checkoutitems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentDetails,
    });

    const createdCheckout = await checkout.save();
    res.status(201).json(createdCheckout);
  } catch (error) {
    console.error('Error in checkout creation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
