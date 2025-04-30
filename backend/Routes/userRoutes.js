const express = require("express")
const User = require('../models/user')
const jwt = require("jsonwebtoken")
// -----------------------------------
const router = express.Router()
//  Post route for registractuion

router.post("/register",async (req,res)=>{
  const {name,email,password} = req.body
  try { 
    let user = await User.findOne({email})
    if(user) return res.status(400).json({message:"user Already exists"})
      user = new User({name,email,password})
    await user.save()

    // JWt PAyload
     const payload = {user:{
      id:user._id,
      role:user.role,

     }}
     

    
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error")
    
    
  }
})

module.exports = router
