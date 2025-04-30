const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    name: {
      type:String,
      required:true,
      trim:true
    },
    email:{
      type:String,
      required:true,
      unique:true,
      trim:true,
    
    },
    password:{
      type:String,
      required:true,
      minLength:6
    },
    role:{
      type:String,
      enum:["customer","admin"],
      default: "customer"

    }

  },
  {timestamps:true}
)


// Password hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password"))
    return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
  next()
  
})


// Match User pass to hashed PAss
userSchema.methods.match = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
  
}
module.exports = mongoose.model("User", userSchema)