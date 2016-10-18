var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
  //NOTE: process.env.NODE_ENV is your node js env
if (process.env.NODE_ENV === 'production') {
  mongoose.connect('mongodb://closecl:3360507@ds061076.mlab.com:61076/artery')
} else {
  mongoose.connect('mongodb://localhost/artery')
}

app.set('view engine', 'ejs')
app.use(layout)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// serve static files
app.use(express.static(__dirname + '/public'))

var userRoutes = require('./routes/users')

app.use('/users', userRoutes)


//listen to port from Heroku or 3000 for local testing
app.listen(process.env.PORT || 3000)
console.log('Server started')
