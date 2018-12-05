const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose =require("passport-local-mongoose")


const partnerSchema = new Schema({
  restaurantName: {
    unique:true,
    type: String,
  },
  email: String,
  isOwner:{
    type:Boolean,
    default:true
  },
  role:{
    type:String,
    default: "Partner"
  },
  
},{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
})

partnerSchema.plugin(passportLocalMongoose, {usernameField: "email"})
module.exports = mongoose.model("Partner", partnerSchema)