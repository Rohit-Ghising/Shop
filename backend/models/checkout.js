const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type:String, // optional: store snapshot of product name
  required:true,},
  images:{
    type:String,
    required:true
  },


  

  price: {
    type: Number,
    required: true,
  },
  quantity:{
    type:Number,
    required:true
  }
},{_id:false});

const checkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  checkoutItems: [orderItemSchema],
  shippingAddress: {
    
    address:{ type: String, required:true},
    city:{ type: String, required:true},
     postalCode:{ type: String, required:true},
     country:{ type: String, required:true},
    
  },
  paymentMethod: {
    type: String,
 
    required: true,
  },
  
  totalPrice: {
    type: Number,
    required: true,
  },
  isPaid:{
    type:Boolean,
    default:false,
  },
  placedAt: {
    type: Date,
    default: Date.now,
  },
  paymentStatus:{
    type:String,
    default:"pending"
  },
  paymentDetails:{
    type:mongoose.Schema.Types.Mixed,//store payment related details(transactioid,paypal response)

  },
  isFinalized:{
    type:Boolean,
    default:false
  },
  finalizedAt:{
    type:Date,
  }

},{timestamps:true});

module.exports = mongoose.model('Checkout', checkoutSchema);
