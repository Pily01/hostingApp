const express = require('express');
const router = express.Router();
const passport = require("../helpers/passport")
const User = require("../models/User")
const Partner = require("../models/Partner")


/* GET home page. */

////////////////////////////////////////////
////°°-------- S I G N   U P ---------°°////
////°°------- C U S T O M E R---------°°////
////////////////////////////////////////////

router.get("/signup", (req,res,next)=> {
  res.render("auth/signup")
})

router.post("/signup",(req,res,next) => {
  User.register(req.body,req.body.password)
  .then(user => {
      res.redirect("/auth/login")
      
    }).catch(e => 
    res.redirect("/auth/signup")                                                                                                                                                            
  )
})



////////////////////////////////////////////
////°°-------- L O G I N -------------°°////
////////////////////////////////////////////


router.get("/login", (req,res,next) => {
  res.render("auth/login")
})

router.post("/login", passport.authenticate('local', { failureRedirect: '/auth/login' }), (req, res, next) => {
  const email = req.user.email
  req.app.locals.user = req.user
  res.redirect("/paquetes/lista")
})


module.exports = router;



////////////////////////////////////////////
////°°-------- S I G N   U P ---------°°////
////°°----- R E S T A U R A N T ------°°////
////////////////////////////////////////////

//router.get("/signup/partner", (req,res,next)=> {
//  res.render("auth/signup-partner")
//})
//
//router.post("/signup/partner",(req,res,next) => {
//  Partner.register(req.body,req.body.password)
//  .then(partner => {
//    res.json(partner)
//    //res.send("¡ BIENVENIDO !")
//  }).catch(e =>                                                                                                                                                             
//    res.send(e))
//})



module.exports = router;


