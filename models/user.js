var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  likeList: [{
    type: Schema.Types.ObjectId,
    ref: 'Painting'
  }],
  ownList: [{
    type: Schema.Types.ObjectId,
    ref: 'Painting'
  }],
  categoryScore: Number
})

var User = mongoose.model('User', userSchema)

module.exports = User
