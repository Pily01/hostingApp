const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose =require("passport-local-mongoose")


const userSchema = new Schema({
  username: {
    unique:true,
    type: String,
  },
  email: String,
  isOwner:{
    type:Boolean,
    default:false
  },
  role:{
    type: String,
    enum: ["Comprador", "Partner"],
    default: "Comprador"
  }
  
},{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
})

userSchema.plugin(passportLocalMongoose, {usernameField: "email"})
module.exports = mongoose.model("User", userSchema)