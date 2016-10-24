var mongoose = require('mongoose')

var paintingSchema = new mongoose.Schema({
  name: String,
  category: String,
  artist: String,
  imageUrl: String,
  price: Number,
  permalink: String,
  likes: Number,
  owned: {
    type: Boolean,
    default: false
  },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

var Painting = mongoose.model('Painting', paintingSchema)

module.exports = Painting;
