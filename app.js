var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/artery')

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

app.listen(3000)
console.log('Server started')
