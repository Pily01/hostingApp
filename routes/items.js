/////////////////////////
/////// I T E M S ///////
/////////////////////////

const express = require('express');
const router = express.Router();
const Item = require("../models/Item")
const uploadCloud = require('../config/cloudinary.js');






////////////////////////////////////////////
////°°-------- C R E A R   U N --------°°////
////°°------------ I T E M ------------°°////
////////////////////////////////////////////

router.get("/nuevo-item", (req,res,next)=> {
  res.render("items/crearItem")
})

router.post("/nuevo-item", uploadCloud.single('photo'), (req,res,next) => {
  const {name, price, tipo, description} = req.body
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newItem = new Item({name, price, tipo, description, imgPath, imgName})
  
  newItem.save()
  .then(item => {
    res.redirect("/items/lista")
  }).catch(e =>                                                                                                                                                             
    res.send(e))
})

////////////////////////////////////////////
////°°-------- M O S T R A R  --------°°////
////°°---------- I T E M S------------°°////
////////////////////////////////////////////

router.get("/lista", (req, res,next) => {
  Item.find()
  .then(items => {
    const esPartner = req.user.role === "Partner"

    console.log(esPartner)
    res.render("items/lista", {items, esPartner})
  }).catch( e => {
    console.log(e)
    res.send(e)
  })
})

////////////////////////////////////////////
////°°------ E D I T A R   U N --------°°////
////°°------------ I T E M ------------°°////
////////////////////////////////////////////

router.get("/editar/:id", (req, res,next) => {
  
  const {id} = req.params
  Item.findById(id)
  .then(item => {
    res.render("items/editar", item)
  }).catch( e => {
    console.log(e)
    res.send(e)
  })
})

router.post("/editar/:id", (req,res,next) => {
  const {id} = req.params
  const {name,price,tipo,description} = req.body

  Item.findByIdAndUpdate(id, {$set : {name,price,tipo, description}})
  .then(item => {
    res.redirect("/items/lista")
  }).catch( e => {
    console.log(e)
    res.send(e)
  })
})

////////////////////////////////////////////
////°°--- E L I M I N I N A R   U N --°°////
////°°------------ I T E M ------------°°////
////////////////////////////////////////////

router.get("/eliminar/:id", (req,res,next)=>{
  const {id} = req.params
  Item.findByIdAndDelete(id)
  .then(item => {
    res.redirect("/items/lista")
  }).catch(e => {
    console.log(e)
    res.send(e)
  })
})

module.exports = router;