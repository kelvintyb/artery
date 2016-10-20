var express = require('express');
var app = express();
var layout = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash')
var logger = require('morgan')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var configDB = require('./config/database.js')
var dotenv = require('dotenv');

mongoose.Promise = global.Promise
  //NOTE: process.env.NODE_ENV is your node js env
  //SETUP of db connections & module use for server requests
  // if (process.env.NODE_ENV === 'production') {
  //   mongoose.connect('mongodb://closecl:3360507@ds061076.mlab.com:61076/artery')
  // } else {
  //   mongoose.connect('mongodb://localhost/artery')
  // }
  //replacement of above portion is below:
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

//templating setup
app.use(layout)
app.set('view engine', 'ejs')
  //passport SETUP
app.use(session({
  secret: 'hi this is artery'
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// serve static files
app.use(express.static(__dirname + '/public'))


//ROUTES
//NOTE: routes.js below refers to main route js that consolidates all route js files
// require('./app/routes.js')(app, passport);

//UNCOMMENT LATER
// var userRoutes = require('./routes/users')
// app.use('/users', userRoutes)

//listen to port from Heroku or 3000 for local testing
app.listen(process.env.PORT || 3000)
console.log('Server started')
