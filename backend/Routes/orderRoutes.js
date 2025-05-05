const express = require('express');
const router = express.Router();
const Order = require('../models/order')

const {protect} = require('../Middlewares/authMiddleware')
 // adjust the path as 
// needed

// @desc    Get all products
// @route   GET /api/products
// @access  Private
router.get('/my-orders',protect, async (req, res) => {
  try {
    const orders = await Order.find({user:req.user._id}).sort({createdAt:-1});
    res.json(orders);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user","name email");
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' });
  }
});



module.exports = router;
