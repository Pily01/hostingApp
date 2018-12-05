var express = require('express');
var router = express.Router();
const Paquete = require('../models/Paquete');

/* GET home page. */

router.get('/', (req, res, next) => {
  res.render('index');
});


module.exports = router;
