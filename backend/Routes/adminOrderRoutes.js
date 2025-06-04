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
 //put 
 // update status
 //access Private Admin

 router.put('/:id',protect,admin,async(req,res)=>{
  try {
    const order = await Order.findById(req.params.id).populate('user','name')
    if (order){
      order.status = req.body.status || order.status
      order.isDelivered = req.body.status==="Delivered" ? true:order.isDelivered
      order.deliveredAt = req.body.status === "Delivered" ? Date.now() :order.deliveredAt
      const updatedOrder =  await order.save()
      res.json(updatedOrder)
    }
    else{res.status(404).json({message:"order not found"})}
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Server Error"})
    
    
  }
 })
 // Delete Roote
 //delete order 
 router.delete('/:id',protect,admin,async(req,res)=>{
  try {
    const order = await Order.findById(req.params.id)
    if (order){
      await order.deleteOne()
      res.json({message:"Order delete SUcessululy"})
     
    }
    else{res.status(404).json({message:"order not found"})}
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Server Error"})
    
    
  }
 })


 module.exports = router
