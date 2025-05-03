const express = require("express")
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const {protect} = require('../Middlewares/authMiddleware')

const router = express.Router()
// Helper function  to get cart by userid
const getCart = async(userId,guestId) =>{
  if(userId){
    return await Cart.findOne({user:userId})
  }
  else if(guestId){
    return await Cart.findOne({guest:guestId})

  }
  return null
}

//create cart
//Add a cart for quest or logged in user
//acess public

router.post('/',async(req,res)=>{
  const {productId,quantity,size,color,guestId,userId} = req.body
  try {
    const product = await Product.findById(productId)
    if(!product) 
      return res.status(404).json({message:"Product not found"})
    //
    let cart = await getCart(userId,guestId)
    if(cart){
      const productIndex = cart.products.findIndex((p)=>p.productId.toString()=== productId &&
       p.size ===size && 
       p.color===color)
       if (productIndex>-1){
        //of the products already exists , update the quantiry
        cart.products[productIndex].quantity += quantity
       }
       else{
        //add new produts
        cart.products.push({productId,
          name:product.name,
          image:product.images[0].url,
          price:product.price,
          size,color,quantity
          //recalculate the price
         

        })

       }
       cart.totalPrice = cart.products.reduce((acc,item)=>acc + item.price*item.quantity,0
      
      )
      await cart.save()
      return res.status(200).json(cart)

    }
    else{
      //Create new cart for guest and user
      const newCart = await Cart.create({
        user: userId ?userId :undefined,
        guestId: guestId ? guestId :"guest_" +new Date().getTime(),
        products:[{
          productId,
          name:product.name,
          images:product.images[0].url,
          price:product.price,
          size,color,quantity
        }],
        totalPrice :product.price * quantity
      })
      return res.status(201).json(newCart)
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"Server ERRor"})
    
  }
})

//Route to update cart logged or guest user
//public accdess

router.put('/',async(req,res)=>{
  const {productId, quantity,size,color,guestId,userId} =req.body

  try {
    let cart = await getCart(userId,guestId)
    if(!cart)
      return res.status(404).json({message:"Cart Not Found"})
    const productIndex = cart.products.findIndex((p)=>p.productId.toString() === productId && p.size===size &&p.color ===color)
    if(productIndex > -1){
      //update product
      if (quantity>0){
        cart.products[productIndex].quantity =quantity
      }
      else{
        cart.products.splice(productIndex,1)//remove product if quantity is 0

      }
      cart.totalPrice = cart.products.reduce((acc,item)=> acc + item.price *item.quantity,0)
      await cart.save()
      return res.status(200).json(cart)
    }
    else{
      return res.status(404).json({message:"Product not found in Cart"})
    }
   
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"server errr"})
    
  }
})

//remove product from cart
// access puyblic

router.delete('/',async(req,res)=>{
  const {productId, size,color,guestId,userId} =req.body
console.log(req.body)

  try {
    let cart = await getCart(userId,guestId)
    if(!cart)
      return res.status(404).json({message:"Cart Not Found"})
    const productIndex = cart.products.findIndex((p)=>p.productId.toString() === productId.toString() && p.size===size &&p.color ===color)
    if(productIndex > -1){
      cart.products.splice(productIndex,1)//remove
     
      
      cart.totalPrice = cart.products.reduce((acc,item)=> acc + item.price *item.quantity,0)
      await cart.save()
      return res.status(200).json(cart)
    }
    else{
      return res.status(404).json({message:"Product not found in Cart"})
    }
   
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"server errr"})
    
  }
})

//get logged user or guest cart

//access public
router.get("/",async(req,res)=>{
  let {userId,guestId} =req.query
  try {
    let cart = await getCart(userId,guestId)
    if(cart){
      res.json(cart)}
   
  else{
     res.status(404).json({message:"Cart not found in Cart"})
    }
   
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"server errr"})
    
  }
})

  //merge guest cart into user cart on login
  //access private
  router.post('/merge',protect,async(req,res)=>{
    const {guestId }= req.body
    try {
      const guestCart = await Cart.findOne({guestId})
      const userCart = await Cart.findOne({user: req.user._id})

      if(guestCart){
        if(guestCart.products.length === 0){
          return res.status(404).json({message:'Cart is empty'})
        }
        if(userCart){
          //merge with guest cart
          guestCart.products.forEach((guestItem)=>{
            const productIndex = userCart.products.findIndex((item)=>
              item.productId.toString()===guestItem.productId.toString()&& item.size=== guestItem.size &&item.color ===guestItem.color
            )
            if(productIndex>-1){
              //if the items exists already user cart,update the quantity
              userCart.products[productIndex].quantity += guestItem.quantity

            }else{
              //otherwisw add  the gest item to cart
              userCart.products.push(guestItem)

            }
          })
          userCart.totalPrice = userCart.products.reduce((acc,item)=>acc + item.price * item.quantity,0)
          await userCart.save()
          //Remove guest ACrt after merging
          try {
            await Cart.findOneAndDelete({guestId})
            
          } catch (error) {
            console.error('Error detleting guest cart',error);
            
            
            
          }
          res.status(200).json(userCart)
        }
        else{
          //if the user has no existing cart,assign theguest cart to user
          guestCart.user = req.user._id
          guestCart.guestId = undefined 
          await guestCart.save()
          res.status(200).json(guestCart)
        }
       


        }
        else{
          if(userCart){
            //guest cart has been already merged ,retuen user cart
            return res.status(200).json(userCart)
          }
          res.status(404).json({message:"Guest cart not found"})

      }
    } catch (error) {
      console.error(error);
      res.status(500).json({message:"Server Error"})
      
      
    } 
  })


module.exports = router