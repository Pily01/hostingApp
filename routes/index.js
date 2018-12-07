var express = require('express');
var router = express.Router();
const Paquete = require('../models/Paquete');
const Item    = require('../models/Item');

/* GET home page. */

router.get('/', (req, res, next) => {
  res.render('index');
});


////////////////////////////////////////////
////°°-------- A G R E G A R ---------°°////
////°°-------- P A Q U E T E S--------°°////
////°°--------  Y  I T E M S  --------°°////
////°°-------- A L   C A R R O--------°°////
////////////////////////////////////////////

router.get("/agregado/:id", (req, res, next) => {
  const {id} = req.params
  console.log(id)
  req.app.locals.products.push(id)
  res.redirect('/paquetes/lista')
})

router.get("/item/agregado/:id", (req, res, next) => {
  const {id} = req.params
  console.log(id)
  req.app.locals.items.push(id)
  res.redirect('/items/lista')
})



router.get("/carrito",(req, res, next)=>{
 const {products} = req.app.locals
 const {items} = req.app.locals
 console.log(products, items)
 Paquete.find( { "_id":  {$in: products} } )
  .then(r=>{
    Item.find( { "_id": {$in : items} } )
    .then(i => {
      let arr = []
      if (r !== null && i !== null) {
        console.log(typeof r, typeof i)
        arr = r.concat(i)
      } else {
        arr = []
      }
      console.log(arr)
      res.render("paquetes/carrito", {arr})
    })
    .catch(err => console.log(err))
  }).catch(e=>{console.log(e)})
})


module.exports = router;
