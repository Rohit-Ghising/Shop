 const mongoose = require('mongoose')
 const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB connect Sucessfully");
    
    
  } catch (err) {
    console.error("MongoBD Connection FAiled",err)
    process.exit(1)
    
  }
 }
 module.exports = connectDB