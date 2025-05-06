const express = require('express')
const Subscriber = require('../models/Subscriber')

const router = express.Router()
//Route Post
// handle newsletter Subscription
//acess public
router.post('/subscribe', async(req,res)=>{

  const {email} = req.body
  if(!email){
    return res.status(400).json({message:"Email is required"})
  }
  try {
    //Check if email is already subscribed
    let subscriber = await Subscriber.findOne({email})
    if (subscriber){
      res.status(400).json({message:"already Subscribed"})
    }
  //create new subsciber
  subscriber = new Subscriber({email})
  await subscriber.save()
  res.status(201).json({message:"Sucessfully subscibed to newsletter"})
    
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error")
    
    
  }
})

module.exports = router
