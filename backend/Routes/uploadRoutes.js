const express = require('express');
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const multer = require('multer')


 require('dotenv').config()
 const router =express.Router()
 
 //Cloudniary Configuration
 cloudinary.config({cloud_name :process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
api_secret:process.env.CLOUDINARY_API_SECRET
 })

 //MUlter setup
 const storage = multer.memoryStorage()
 const upload = multer({storage})
 router.post("/",upload.single("image"),async(req,res)=>{
  try {
    if(!req.file){
      return res.status(400).json({message:"No file uploaded"})}

      //Function tonhandle Cloudianry
      const streamUpload =(fileBuffer)=>{
        return new Promise((resolve,reject)=>{
          const stream = cloudinary.uploader.upload_stream((error,result)=>{if (result){
            resolve(result);
          }
        else{
          reject(error)
        }
      });
      //Use streamifierto convert file buffer into sting
      streamifier.createReadStream(fileBuffer).pipe(stream)


        }) 
      }
      //CAll stremUpload function 
      const result  = await streamUpload(req.file.buffer)
      //Respond with uploaded image url
      res.json({imageUrl:result.secure_url})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Server Error"})
    
    
  }
 }) 

 module.exports = router