 const express = require("express")
const Order = require('../models/order')
const {protect,admin} = require('../Middlewares/authMiddleware')
 const router = express.Router()

 // get requst
 //get all orders(Ad,in only )
 // access Prvate
 router.get("/",protect,async(req,res)=>{
  try {
    const orders =  await  Order.find({}).populate("user","name email",)
    res.json(orders)
    
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server Error'})
    

    
  }
 })

 module.exports = router
