// const mongoose = require('mongoose');

// const cartItemSchema = new mongoose.Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   },
//   name:{
//     type:String,
//     image:String,
//     price:String,
//     size:String,
//     color:String,
    
  
//   quantity: {
//     type: Number,
   
//     default: 1
//   }},

// },  {_id:false})

// const cartSchema = new mongoose.Schema({
//   user:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"User"
//   },
//   guestId:{
//     type:String
//   },
//   products:[cartItemSchema],
//   totalPrice:{
//     type:Number,
//     required:true,
//     default:0
//   }
// },{
//   timestamps:true
// })

// module.exports =mongoose.model("Cart",cartSchema)

const mongoose = require('mongoose');

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  images: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  size: {
    type: String
  },
  color: {
    type: String
  },
  quantity: {
    type: Number,
    default: 1
  }
}, { _id: false });

// Main Cart Schema
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  guestId: {
    type: String
  },
  products: [cartItemSchema],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Cart", cartSchema);

  
