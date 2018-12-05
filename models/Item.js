const mongoose = require("mongoose")
const Schema = mongoose.Schema

const itemSchema = new Schema ({
  tipo:{
    type:String,
    enum:["Entrada","Plato Fuerte","Postre", "Bebida"],
    default:"Plato Fuerte"
  },
  name:String,
  price: Number,
  description: String,
  imgName: String,
  imgPath: String,
}, {
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
})

module.exports = mongoose.model("Item", itemSchema)