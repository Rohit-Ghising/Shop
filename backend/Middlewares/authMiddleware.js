const jwt = require ('jsonwebtoken')
const User = require ('../models/user')

// middle ware to
const protect = async (req,res, next) =>{
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
  {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.user.id).select("-password")  //Wxclude password
      next()
      
    } catch (error) {
      console.error("Token verufy failed",error)
      res.status(401).json({message:"Not authorized token gailed"})
      
    }
  }
  else{
    res.status(401).json({message:"Not authorized. mo token provided"})
  }

}
// moiddleware to check if admoin
const admin =(req,res,next)=>{
if (req.user  && req.user.role === 'admin' )
{next()}
else {
  res.status(403).json({message:"Not authprized as admin"})
}}
module.exports = {protect,admin}