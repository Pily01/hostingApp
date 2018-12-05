require("dotenv").config()

var createError      = require('http-errors');
var express          = require('express');
var path             = require('path');
var cookieParser     = require('cookie-parser');
var bodyParser       = require("body-parser")
var logger           = require('morgan');
var sassMiddleware   = require('node-sass-middleware');
const hbs            = require("hbs")
const mongoose       = require("mongoose")
const passport       = require("passport")


mongoose
      .connect('mongodb://Pily01:pily01@ds023463.mlab.com:23463/hostingapp', {useNewUrlParser: true})
      .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
      })
      .catch(err => {
        console.error('Error connecting to mongo', err)
      });

var app = express();

//M I D D L E   W A R E   S E T U P
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// V I E W   E N G I N E   S E T U P
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));


app.use(express.static(path.join(__dirname, 'public')));


// 4 0 4   E R R O R
//app.use(function(req, res, next) {
  //next(createError(404));
//});

// P A S P O R T   
app.use(require("express-session")({
  secret: "My name is Joana",
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())


// E R R O R   H A N D L E R
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// D E F A U L T   V A L U E S   R O U T E S

const auth = require("./routes/auth")
app.use("/auth",auth)

const index = require('./routes/index');
app.use('/', index);

const paquetes = require("./routes/paquetes");
app.use("/paquetes", paquetes)

const items = require("./routes/items")
app.use("/items", items)



module.exports = app;
