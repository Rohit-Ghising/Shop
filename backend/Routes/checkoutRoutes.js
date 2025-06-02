const express = require('express');
const Checkout = require('../models/checkout');
const { protect } = require('../Middlewares/authMiddleware');
const Order = require('../models/order')
const Cart = require('../models/Cart')

const router = express.Router();

// @route   POST /api/checkout
// @desc    Create a new checkout
// @access  Protected
router.post('/', protect, async (req, res) => {
  const {
    checkoutItems,        // should match your schema field: 'checkoutitems'
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentDetails        // optional if you're accepting it
  } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: 'No checkout items provided' });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,  // NOTE: matches your schema field exactly
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
      paymentDetails
    });

    console.log(`Checkout created for user: ${req.user._id}`);
    return res.status(201).json(newCheckout);

  } catch (error) {
    console.error('Error in checkout creation:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});
///put request /api/checkout/:id/pay
//Update checkout to mark as paid acter sucessful payment
// private
router.put('/:id/pay', protect, async (req, res) => {
  const {
    
    paymentStatus,
    paymentDetails        // optional if you're accepting it
  } = req.body;

 
  try {
    const checkout = await Checkout.findById(req.params.id)
    if(!checkout){
      return res.status(404).json({message:"Chechout no found"})
    }

    if (paymentStatus==="paid"){
      checkout.isPaid = true
      checkout.paymentStatus = paymentStatus
      checkout.paymentDetails=paymentDetails
      checkout.paidAt = Date.now()
      await checkout.save()
      res.status(200).json(checkout)
    } else{
      res.status(400).json({message:"Invalid payment status"})
    }
    

   
  } catch (error) {
    console.error( error);
    return res.status(500).json({ message: 'Server error' });
  }
});

//post routre /api/checkout/:id/finalize
// Finalize checkout and convert to an order after payment confirm
// access private
router.post('/:id/finalize', protect, async (req, res) => {
  
 
  try {
    const checkout = await Checkout.findById(req.params.id)
    if(!checkout){
      return res.status(404).json({message:"Chechout no found"})
    }

    if(checkout.isPaid && !checkout.isFinalized)
    // {//Create final order on the based checkout  details}
  {
    const finalOrder = await Order.create({
      user:checkout.user,
      orderItems:checkout.orderItems,
      shippingAddress:checkout.shippingAddress,
      paymentMethod:checkout.paymentMethod,
      totalPrice:checkout.totalPrice,
      isPaid:true,
      paidAt:checkout.paidAt,
      isDelivered:false,
      paymentStatus:"paid",
      paymentDetails :checkout.paymentDetails

    })
    //Mark checkout as finalizedd order
    checkout.isFinalized = true,
    checkout.finalizedAt = Date.now()
    await checkout.save()
    ///delete the cart associated with user
    await Cart.findOneAndDelete({user:checkout.user})
    res.status(201).json(finalOrder)
  } else if (checkout.isFinalized){
    res.status(400).json({message:"Checkout already Finilize"})
  }
  else{
    res.status(400).json({message:"Checkout isnot paid"})
  }


    
    

   
  } catch (error) {
    console.error( error);
    return res.status(500).json({ message: 'Server error' });
  }
}
  );



module.exports = router;
