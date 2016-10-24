var mongoose = require('mongoose')

var paintingSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  likes: Number,
  artist: String,
  url: String
})

var Painting = mongoose.model('Painting', paintingSchema)

module.exports = Painting;
