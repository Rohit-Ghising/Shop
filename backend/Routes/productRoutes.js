const express = require('express')
const Product = require('../models/Product')
const {protect,admin} = require('../Middlewares/authMiddleware')
const { findById } = require('../models/user')

const router = express.Router()

// desc Create ne product
// create product
//acess pricate/admin
router.post('/',protect,admin,async(req,res)=>{
  try {
    const {name,description,price,discountPrice, countInStock, category,brand,sizes,colors,collections,material,gender,images,
      isFeatured,isPublished,tags,dimensions,weight,sku
    }=req.body

  const product = new Product({name,description,price,discountPrice, countInStock, category,brand,sizes,colors,collections,material,gender,images,
    isFeatured,isPublished,tags,dimensions,weight,sku,
  user: req.user._id,})//Refrence to the admin 
  const createdProduct= await product.save()
  res.status(201).json(createdProduct)
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error")
    
    
  }
})

// Update Routes
//udated by id
//aces admin

router.put('/:id',protect,admin, async (req,res)=>{
  if (!req.body) {
    return res.status(400).json({ message: 'Bad Request: No body found' });
  }

  try {
    const {name,description,price,discountPrice, countInStock, category,brand,sizes,colors,collections,material,gender,images,
      isFeatured,isPublished,tags,dimensions,weight,sku
    }=req.body
    //Find Productr by iD
    const product =await Product.findById(req.params.id)
    if(product){
      //Update Product frild
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;


      // Save the updated produt to database
      const updatedProduct = await product.save()
        res.json(updatedProduct)


       }
    else {
      res.status(404).json({message:"product not found"})
    }
    
    
  } catch (error) {
    console.error(error)
    res.status(500).send("Server error")
    
  }
})
// Detelet product by id
//access private only admin can dekete 

router.delete("/:id",protect,admin, async(req,res)=>{
  try {
    const product = await Product.findById(req.params.id)
    if(product) {
      //remove from database
      await product.deleteOne()
      res.json({message:"product remove"})
    }
    else{
      res.status(404).json({message:"Product Not Found"})
    }
    
  } catch (error) {
    console.error(error)
    res.status(500).json({message:"Server Error"})
    
  }
})


module.exports = router






module.exports = router


