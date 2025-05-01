const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./Routes/userRoutes')
const productRoutes = require('./Routes/productRoutes')

// -------------------------------------------------------------------
const app = express()
app.use(express.json())
app.use(cors())
// -----------------------------------------------------------

dotenv.config()
// ---------------------------------------------------------


const PORT = process.env.PORT || 3000
// -
connectDB()
app.get('/',(req,res)=>{
  res.send("welcome to backend")
})

// -------------------- api
app.use('/api/users/', userRoutes)
// ///////////////////
app.use('/api/products',productRoutes)



app.listen(PORT,()=>{console.log(`server is runnung`)})