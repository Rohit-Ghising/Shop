// // const express = require('express')
// // const Product = require('../models/Product')
// // const {protect,admin} = require('../Middlewares/authMiddleware')
// // const { findById } = require('../models/user')

// // const router = express.Router()

// // // desc Create ne product
// // // create product
// // //acess pricate/admin
// // router.post('/',protect,admin,async(req,res)=>{
// //   try {
// //     const {name,description,price,discountPrice, countInStock, category,brand,sizes,colors,collections,material,gender,images,
// //       isFeatured,isPublished,tags,dimensions,weight,sku
// //     }=req.body

// //   const product = new Product({name,description,price,discountPrice, countInStock, category,brand,sizes,colors,collections,material,gender,images,
// //     isFeatured,isPublished,tags,dimensions,weight,sku,
// //   user: req.user._id,})//Refrence to the admin 
// //   const createdProduct= await product.save()
// //   res.status(201).json(createdProduct)
    
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send("Server Error")
    
    
// //   }
// // })

// // // Update Routes
// // //udated by id
// // //aces admin

// // router.put('/:id',protect,admin, async (req,res)=>{
// //   if (!req.body) {
// //     return res.status(400).json({ message: 'Bad Request: No body found' });
// //   }

// //   try {
// //     const {name,description,price,discountPrice, countInStock, category,brand,sizes,colors,collections,material,gender,images,
// //       isFeatured,isPublished,tags,dimensions,weight,sku
// //     }=req.body
// //     //Find Productr by iD
// //     const product =await Product.findById(req.params.id)
// //     if(product){
// //       //Update Product frild
// //       product.name = name || product.name;
// //       product.description = description || product.description;
// //       product.price = price || product.price;
// //       product.discountPrice = discountPrice || product.discountPrice;
// //       product.countInStock = countInStock || product.countInStock;
// //       product.category = category || product.category;
// //       product.brand = brand || product.brand;
// //       product.sizes = sizes || product.sizes;
// //       product.colors = colors || product.colors;
// //       product.collections = collections || product.collections;
// //       product.material = material || product.material;
// //       product.gender = gender || product.gender;
// //       product.images = images || product.images;
// //       product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
// //       product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
// //       product.tags = tags || product.tags;
// //       product.dimensions = dimensions || product.dimensions;
// //       product.weight = weight || product.weight;
// //       product.sku = sku || product.sku;


// //       // Save the updated produt to database
// //       const updatedProduct = await product.save()
// //         res.json(updatedProduct)


// //        }
// //     else {
// //       res.status(404).json({message:"product not found"})
// //     }
    
    
// //   } catch (error) {
// //     console.error(error)
// //     res.status(500).send("Server error")
    
// //   }
// // })
// // // Detelet product by id
// // //access private only admin can dekete 

// // router.delete("/:id",protect,admin, async(req,res)=>{
// //   try {
// //     const product = await Product.findById(req.params.id)
// //     if(product) {
// //       //remove from database
// //       await product.deleteOne()
// //       res.json({message:"product remove"})
// //     }
// //     else{
// //       res.status(404).json({message:"Product Not Found"})
// //     }
    
// //   } catch (error) {
// //     console.error(error)
// //     res.status(500).json({message:"Server Error"})
    
// //   }
// // })

// // //get route
// // //get all products with optional query

// // router.get('/',async(req,res)=>{
// //   try {
// //     const {collection, size,color,gender,minPrice,maxPrice,sortBy,search,category,material,brand,limit} = req.query
// //     let query = {}

// //     //Filter  if ()
// //     if(collection && collection.toLocaleLowerCase()!=="all"){
// //       query.collections = collection
// //     }
// //     // if(category && category.toLocaleLowerCase()!=="all"){
// //     //   query.category = category
// //     // }
// //     if (typeof category === 'string' && category.toLowerCase() !== "all") {
// //   query.category = category;
// // }

// //     if(material){
// //       query.material ={$in:material.split(",")}
// //     }
// //     if(brand){
// //       query.brand ={$in:brand.split(",")}
// //     }
// //     if(size){
// //       query.sizes ={$in:size.split(",")}
// //     }
// //     if(color){
// //       query.colors ={$in:[color]}
// //     }
// //     if(gender){
// //       query.gender =gender
// //     }
// //     if(minPrice || maxPrice){
// //       query.price ={}
// //       if(minPrice) query.price.$gte = Number(minPrice)
// //         if(maxPrice) query.price.$lte = Number(maxPrice)
// //     }
// //   if(search) {
// //     query.$or = [{description:{$regex:search,$options:"i"}},
      

// //     ]
// //   }
// //   //SORTLogic
// //   let sort ={}
// //   if(sortBy){
// //     switch(sortBy){
// //       case"priceAsc":
// //       sort ={price: 1};
// //       break;
// //       case"priceDesc":
// //       sort={price:-1}
// //       break;
// //       case"popularity":
// //       sort ={rating:-1}
// //       break 
// //       default:
// //         break

// //     }
// //   }
// //   //Fetch the products from database
// //   let products = await Product.find(query).sort(sort).limit(Number(limit)|| 0);
// //   res.json(products)



    
// //   } catch (error) {
// //     console.error(error)
// //     res.status(500).send("Server Error");
    
    
// //   }
// // })
// // router.get("/best-seller",async(req,res)=>{
// //   try {
// //   const bestSeller = await Product.findOne().sort({rating:-1})
// //   if(bestSeller){
// //     res.json(bestSeller)
// //   }
// //   else{
// //     res.status(404).json({message:"No best seller found"})
// //   }
    
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send("Server Error")
    
    
// //   }
// // })
// //  //newArrivls
// //  //Retrive on creation Date
// //  //Access publuc
 
// // router.get("/new-arrivals",async(req,res)=>{
// //   try {
// //   const newArrivals = await Product.find().sort({createdAt: -1}).limit(8)
// //   res.json(newArrivals)
  
    
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send("Server Error")
    
    
// //   }
// // })

// // //get route for  single product
// // //get single produtc bt id
// // //Access public

// // router.get('/:id',async(req,res)=>{

// // try {
// //   const product = await Product.findById(req.params.id)
// //   if(product){
// //     res.json(product)}
// //     else{
// //       return res.status(404).json({message:"Product not found"})
// //     }

  
// // } catch (error) {
// //   console.error(error);
// //   res.status(500).send('Server error')
  
  
// // }




// // })

// // //get similar product on the basis of id
// // //Retive similar products on the basis  of current product
// // router.get('/similar/:id', async(req,res)=>{
// //   const {id} = req.params
// // try {
// //   const product = await Product.findById(id)
// //   if(!product){
// //     return res.status(404).json({message:"No Products Found"})
// //   }
// //   const similarProducts = await Product.find({_id:{$ne:id},//Exclude current produ tID
// //     gender:product.gender,
// //     category:product.category,

// //   }).limit(4)
  
// //   res.json(similarProducts)
// // } catch (error) {
// //   console.error(error);
// //   res.status(500).send("Server Error")
  
  
// // }
// // })
// // //Best Seller Rotute
// // //hoghes rating is our best seller
// // //acess public


// // module.exports = router
// const express = require('express')
// const Product = require('../models/Product')
// const { protect, admin } = require('../Middlewares/authMiddleware')

// const router = express.Router()

// // Create product - Admin only
// router.post('/', protect, admin, async (req, res) => {
//   try {
//     const {
//       name, description, price, discountPrice, countInStock, category, brand,
//       sizes, colors, collections, material, gender, images,
//       isFeatured, isPublished, tags, dimensions, weight, sku
//     } = req.body

//     const product = new Product({
//       name, description, price, discountPrice, countInStock, category, brand,
//       sizes, colors, collections, material, gender, images,
//       isFeatured, isPublished, tags, dimensions, weight, sku,
//       user: req.user._id
//     })

//     const createdProduct = await product.save()
//     res.status(201).json(createdProduct)
//   } catch (error) {
//     console.error(error)
//     res.status(500).send("Server Error")
//   }
// })

// // Update product - Admin only
// router.put('/:id', protect, admin, async (req, res) => {
//   if (!req.body) {
//     return res.status(400).json({ message: 'Bad Request: No body found' });
//   }

//   try {
//     const {
//       name, description, price, discountPrice, countInStock, category, brand,
//       sizes, colors, collections, material, gender, images,
//       isFeatured, isPublished, tags, dimensions, weight, sku
//     } = req.body

//     const product = await Product.findById(req.params.id)
//     if (product) {
//       product.name = name || product.name;
//       product.description = description || product.description;
//       product.price = price || product.price;
//       product.discountPrice = discountPrice || product.discountPrice;
//       product.countInStock = countInStock || product.countInStock;
//       product.category = category || product.category;
//       product.brand = brand || product.brand;
//       product.sizes = sizes || product.sizes;
//       product.colors = colors || product.colors;
//       product.collections = collections || product.collections;
//       product.material = material || product.material;
//       product.gender = gender || product.gender;
//       product.images = images || product.images;
//       product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
//       product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
//       product.tags = tags || product.tags;
//       product.dimensions = dimensions || product.dimensions;
//       product.weight = weight || product.weight;
//       product.sku = sku || product.sku;

//       const updatedProduct = await product.save()
//       res.json(updatedProduct)
//     } else {
//       res.status(404).json({ message: "Product not found" })
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(500).send("Server Error")
//   }
// })

// // Delete product - Admin only
// router.delete("/:id", protect, admin, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//     if (product) {
//       await product.deleteOne()
//       res.json({ message: "Product removed" })
//     } else {
//       res.status(404).json({ message: "Product not found" })
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: "Server Error" })
//   }
// })

// // GET best seller product
// router.get("/best-seller", async (req, res) => {
//   try {
//     const bestSeller = await Product.findOne().sort({ rating: -1 })
//     if (bestSeller) {
//       res.json(bestSeller)
//     } else {
//       res.status(404).json({ message: "No best seller found" })
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(500).send("Server Error")
//   }
// })

// // GET new arrivals
// router.get("/new-arrivals", async (req, res) => {
//   try {
//     const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8)
//     res.json(newArrivals)
//   } catch (error) {
//     console.error(error)
//     res.status(500).send("Server Error")
//   }
// })

// // GET similar products
// router.get('/similar/:id', async (req, res) => {
//   const { id } = req.params
//   try {
//     const product = await Product.findById(id)
//     if (!product) {
//       return res.status(404).json({ message: "No Products Found" })
//     }
//     const similarProducts = await Product.find({
//       _id: { $ne: id },
//       gender: product.gender,
//       category: product.category,
//     }).limit(4)

//     res.json(similarProducts)
//   } catch (error) {
//     console.error(error)
//     res.status(500).send("Server Error")
//   }
// })

// // GET all products with filters
// router.get('/', async (req, res) => {
//   try {
//     const { collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query
//     let query = {}

//     if (collection && collection.toLowerCase() !== "all") {
//       query.collections = collection
//     }
//     if (typeof category === 'string' && category.toLowerCase() !== "all") {
//       query.category = category
//     }
//     if (material) {
//       query.material = { $in: material.split(",") }
//     }
//     if (brand) {
//       query.brand = { $in: brand.split(",") }
//     }
//     if (size) {
//       query.sizes = { $in: size.split(",") }
//     }
//     if (color) {
//       query.colors = { $in: [color] }
//     }
//     if (gender) {
//       query.gender = gender
//     }
//     if (minPrice || maxPrice) {
//       query.price = {}
//       if (minPrice) query.price.$gte = Number(minPrice)
//       if (maxPrice) query.price.$lte = Number(maxPrice)
//     }
//     if (search) {
//       query.$or = [{ description: { $regex: search, $options: "i" } }]
//     }

//     let sort = {}
//     if (sortBy) {
//       switch (sortBy) {
//         case "priceAsc":
//           sort = { price: 1 }
//           break
//         case "priceDesc":
//           sort = { price: -1 }
//           break
//         case "popularity":
//           sort = { rating: -1 }
//           break
//         default:
//           break
//       }
//     }

//     const products = await Product.find(query).sort(sort).limit(Number(limit) || 0)
//     res.json(products)
//   } catch (error) {
//     console.error(error)
//     res.status(500).send("Server Error")
//   }
// })

// // GET single product by ID - this must come last
// router.get('/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//     if (product) {
//       res.json(product)
//     } else {
//       res.status(404).json({ message: "Product not found" })
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(500).send("Server Error")
//   }
// })

// module.exports = router







const express = require('express')
const Product = require('../models/Product')
const { protect, admin } = require('../Middlewares/authMiddleware')

const router = express.Router()

// Create product - Admin only
router.post('/', protect, admin, async (req, res) => {
  try {
    const {
      name, description, price, discountPrice, countInStock, category, brand,
      sizes, colors, collections, material, gender, images,
      isFeatured, isPublished, tags, dimensions, weight, sku
    } = req.body

    const product = new Product({
      name, description, price, discountPrice, countInStock, category, brand,
      sizes, colors, collections, material, gender, images,
      isFeatured, isPublished, tags, dimensions, weight, sku,
      user: req.user._id
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
  }
})

// Update product - Admin only
router.put('/:id', protect, admin, async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Bad Request: No body found' });
  }

  try {
    const {
      name, description, price, discountPrice, countInStock, category, brand,
      sizes, colors, collections, material, gender, images,
      isFeatured, isPublished, tags, dimensions, weight, sku
    } = req.body

    const product = await Product.findById(req.params.id)
    if (product) {
      product.name = name || product.name
      product.description = description || product.description
      product.price = price || product.price
      product.discountPrice = discountPrice || product.discountPrice
      product.countInStock = countInStock || product.countInStock
      product.category = category || product.category
      product.brand = brand || product.brand
      product.sizes = sizes || product.sizes
      product.colors = colors || product.colors
      product.collections = collections || product.collections
      product.material = material || product.material
      product.gender = gender || product.gender
      product.images = images || product.images
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured
      product.isPublished = isPublished !== undefined ? isPublished : product.isPublished
      product.tags = tags || product.tags
      product.dimensions = dimensions || product.dimensions
      product.weight = weight || product.weight
      product.sku = sku || product.sku

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
  }
})

// Delete product - Admin only
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      await product.deleteOne()
      res.json({ message: "Product removed" })
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
})

// Get best seller product
router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 })
    if (bestSeller) {
      res.json(bestSeller)
    } else {
      res.status(404).json({ message: "No best seller found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
  }
})

// Get new arrivals
router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8)
    res.json(newArrivals)
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
  }
})

// Get similar products based on id
router.get('/similar/:id', async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: "No Products Found" })
    }
    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4)

    res.json(similarProducts)
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
  }
})

// Get all products with filters and sorting
router.get('/', async (req, res) => {
  try {
    const { collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query
    let query = {}

    if (collection && collection.toLowerCase() !== "all") {
      query.collections = collection
    }
    if (typeof category === 'string' && category.toLowerCase() !== "all") {
      query.category = category
    }
    if (material) {
      query.material = { $in: material.split(",") }
    }
    if (brand) {
      query.brand = { $in: brand.split(",") }
    }
    if (size) {
      query.sizes = { $in: size.split(",") }
    }
    if (color) {
      query.colors = { $in: [color] }
    }
    if (gender) {
      query.gender = gender
    }
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }
    if (search) {
      query.$or = [{ description: { $regex: search, $options: "i" } }]
    }

    let sort = {}
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 }
          break
        case "priceDesc":
          sort = { price: -1 }
          break
        case "popularity":
          sort = { rating: -1 }
          break
        default:
          break
      }
    }

    const products = await Product.find(query).sort(sort).limit(Number(limit) || 0)
    res.json(products)
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
  }
})

// Get single product by ID (must come last to not conflict with other routes)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
  }
})

module.exports = router


