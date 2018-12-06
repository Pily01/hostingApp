const mongoose = require("mongoose")
const Schema = mongoose.Schema

const paqueteSchema = new Schema({
  name: String,
  price: Number,
  entrada: String,
  platoFuerte: String,
  postre: String,
  bebida: String,
  numPersonas: Number,
  imgName: String,
  imgPath: String,
  enCarrito:{
    type: Boolean,
    default: false,
  }

},{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
})


module.exports = mongoose.model("Paquete", paqueteSchema)