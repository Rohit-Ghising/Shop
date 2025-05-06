const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./Routes/userRoutes')
const productRoutes = require('./Routes/productRoutes')
const cartRoutes = require('./Routes/cartRoutes')
const checkoutRoutes = require ('./Routes/checkoutRoutes')
const orderRoutes = require('./Routes/orderRoutes')
const uploadRoutes = require('./Routes/uploadRoutes')
const subscriberRoutes = require('./Routes/subscriberRoutes')

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
app.use('/api/cart',cartRoutes)
app.use('/api/checkout',checkoutRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api',subscriberRoutes)



app.listen(PORT,()=>{console.log(`server is runnung`)})

