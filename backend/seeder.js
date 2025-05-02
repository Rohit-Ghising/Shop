const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require("./models/Product")
const User = require("./models/user")
const products = require('./data/products')


dotenv.config()

mongoose.connect(process.env.MONGO_URL)

//Function to seed data
const seedData = async ()=>{
  try {
    //clerar existing data
    await Product.deleteMany()
    await User.deleteMany()
    //Create a default admin
    const createdUser = await User.create(
      {
        name:"Admin",
        email:"admin@gmail.com",
        password:"123456",
        role:"admin"
 
     }
    )
   //Assign degault userid to each product
   const userID = createdUser._id
   const sampleProducts =products.map((product)=>{
    return {...product, user:userID}
   })
   //Insert data in DB
  await Product.insertMany(sampleProducts)
  console.log("Product data seeded sucessfully")
  process.exit()

  } catch (error) {
    console.error("Error seeding the data",error);
    process.exit(1)
    
    
  }
}
seedData()