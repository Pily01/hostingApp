////////////////////////////////////////////////////
////°°-------- A U T H   R O U T E S ---------°°////
////////////////////////////////////////////////////


const express = require('express');
const router = express.Router();
const passport = require("../helpers/passport")
const User = require("../models/User")
const Partner = require("../models/Partner")





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


