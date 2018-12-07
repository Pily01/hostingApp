//////////////////////////////////////////////////////
////°°-------- I N D E X   R O U T E S ---------°°////
//////////////////////////////////////////////////////


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


////////////////////////////////////////////
////°°-------- E L I M I N A R ---------°°////
////°°-------- P A Q U E T E S--------°°////
////°°--------  Y  I T E M S  --------°°////
////°°-------- D E L   C A R R O--------°°////
////////////////////////////////////////////

router.get("/eliminar/:id", (req, res, next) => {
  const {id} = req.params
  const index = req.app.locals.items.indexOf(id)
  console.log(id)
  req.app.locals.items.splice(index,1)
  res.redirect('/carrito')
})

//////////////////////////////////////////////
////°°-------- C H E C K O U T ---------°°////
//////////////////////////////////////////////

router.get("/checkout", (req, res, next) => {
  res.render("checkout")
})

//////////////////////////////////////////////
////°°-------- N O S O T R O S ---------°°////
//////////////////////////////////////////////

router.get("/nosotros", (req, res, next) => {
  res.render("nosotros")
})



module.exports = router;
