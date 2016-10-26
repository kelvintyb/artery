var express = require('express');
var app = express();
var layout = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash')
var logger = require('morgan')
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var methodOverride = require('method-override');

mongoose.Promise = global.Promise

dotenv.load({
  path: '.env.' + process.env.NODE_ENV
})
mongoose.connect(process.env.MONGO_URI);

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }))
  // run methodOverride for all requests
  app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))
  //templating setup
app.use(layout)
app.set('view engine', 'ejs')
  //passport SETUP
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
require('./config/passport')(passport);

//middleware to access req.user globally for ajax requests
app.use(function (req, res, next) {
  global.currentUser = req.user;
  next();
});

// serve static files
app.use(express.static(__dirname + '/public'))

//ROUTES
var userRoutes = require('./routes/users')
app.use('/', userRoutes)
//NOTE:to access API for paintings
var apiRoutes = require('./routes/paintings_api')
app.use('/api/paintings',apiRoutes)
var paintingRoutes = require('./routes/paintings')
app.use('/paintings', paintingRoutes)
//listen to port from Heroku or 3000 for local testing
app.listen(process.env.PORT || 3000)
console.log('Server started')
