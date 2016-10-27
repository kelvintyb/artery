var mongoose = require('mongoose')

var paintingSchema = new mongoose.Schema({
  name: String,
  category: String,
  artist: String,
  imageUrl: String,
  price: Number,
  permalink: String,
  likes: {
    type: Number,
    default: 0
  },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

var Painting = mongoose.model('Painting', paintingSchema)

module.exports = Painting;
