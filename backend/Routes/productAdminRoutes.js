 const express = require("express")
const Product = require('../models/Product')
const {protect,admin} = require('../Middlewares/authMiddleware')
 const router = express.Router()

 // get requst
 //get all productsam (Ad,in only )
 // access Prvate
 router.get("/",protect,async(req,res)=>{
  try {
    const products =  await  Product.find({})
    res.json(products)
    
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server Error'})
    

    
  }
 })

 module.exports = router
