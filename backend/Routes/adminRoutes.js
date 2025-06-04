//  const express = require('express')
//  const User = require('../models/user')
//  const{protect,admin} = require('../Middlewares/authMiddleware')

//  const router = express.Router()

//  //get rew url /api/admin/users
//  //get all users(Admin only)
//  //acess private admin
//  router.get("/users",protect,admin,async(req,res)=>{
//   try {
//     const users = await User.find({})
//     res.json(users)
    
//   } catch (error) {
//     console.error(error)
//     res.status(500).json("Server Error")
    
//   }


//  })
//  //post /api/admin/users
//  //add only user admin
//  // access pricate admon

//  router.post('/users',protect,admin,async(req,res)=>{
//   const {name, email ,password,role} = req.body
//   try {
//     let user = await User.findOne({email})
//     if(user){
//       res.status(400).json({message:"Admin already exists"})
//     }
//     user = new User({
//       name,email,password,
//       role:role ||"customer",
//     })
//     await user.save()
//     res.status(201).json({message:"user creqted sucessfully"})
    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({message:"Server Error"})
    
    
//   }
//  })
//  //toute to edit 
//  // Uodate user info(admin only)
//  //access private admin
//  router.put('/users/:id',protect,admin,async(req,res)=>{
//   try {
//     const  user = await User.findById(req.params.id)
//     if(user){
//       user.name =req.body.name || user.name
//       user.email =req.body.email || user.email
//       user.role =req.body.role || user.role
      
//     }
//     const updatedUser =await user.save()
//     res.json({message:"user Update sucessful",user:updatedUser})
    
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({message:"Server error"})

    
    
//   }
//  })

//  //delete route
//  //delete by id
//  //acces private admin
//  router.delete('/users/:id',protect,admin,async(req,res)=>{
//   try {
//     const user = await User.findById(req.params.id)
//     if(user){
//       await user.deleteOne()
//       res.json({message:"delete sucessfully"})
//     } else {
//       res.status(404).json({message:"User not found"})
//     }
 
    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({message:"Server Error"})
    
    
//   }
//  })


//  module.exports = 
const express = require('express');
const User = require('../models/user');
const { protect, admin } = require('../Middlewares/authMiddleware');

const router = express.Router();

// GET /api/admin/users - Get all users (admin only)
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/admin/users - Create user (admin only)
router.post('/users', protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({
      name,
      email,
      password,
      role: role || 'customer',
    });
    await user.save();
    res.status(201).json(user); // Return created user
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /api/admin/users/:id - Update user (admin only)
router.put('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      const updatedUser = await user.save();
      res.json(updatedUser); // Return updated user
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE /api/admin/users/:id - Delete user (admin only)
router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ id: req.params.id }); // Return deleted user id
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
