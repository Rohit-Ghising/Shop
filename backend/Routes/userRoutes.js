const express = require("express")
const User = require('../models/user')
const jwt = require("jsonwebtoken")
// -----------------------------------
const {protect} = require ('../Middlewares/authMiddleware')
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

    //  Sign and return token along with user data

    jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"50h"},(err,token)=>{
      
        if(err) throw err

        res.status(201).json({
          token,
          user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
          }
          
        })
      }
    )

    
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error")
    
    
  }
})
// Post route

router.post('/login',async(req,res)=>{
  const {email,password} = req.body
  try {
    let user = await User.findOne({email})
    if(!user)
       return res.status(400).json({message:"Invalid Crediantls"})
      const isMatch = await user.matchPassword(password)

      if(!isMatch)
        return res.status(400).json({message:"Invalid Crediantls"})

      const payload = {user:{
        id:user._id,
        role:user.role,
  
       }}
  
      //  Sign and return token along with user data
  
      jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"50h"},(err,token)=>{
        
          if(err) throw err
  
          res.json({
            token,
            user:{
              _id:user._id,
              name:user.name,
              email:user.email,
              role:user.role,
            }
            
          })
        }
      )
  
    
  } catch (error) {
    console.error(error)
    res.status(500).send("server error")
    
  }
})

// User profilr (Protected Rute)
router.get("/profile", protect,async (req,res)=>{
  res.json(req.user)
}

)



module.exports = router
