var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var userSchema = new mongoose.Schema({
  local: {
    name: String,
    email: String,
    password: String,
  },
  likeList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Painting'
  }],
  ownList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Painting'
  }],
  categoryScore: Number
})

//hashing password before save to DB
userSchema.pre('save', function (next) {
  var user = this
  bcrypt.genSalt(function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.local.password, salt, function (err, hash) {
      if (err) return next(err)

      user.local.password = hash
      next()
    })
  })
})
//authentication method used for check against log-ins
userSchema.methods.authenticate = function (givenPassword, callback) {
  var hashedPassword = this.local.password

  bcrypt.compare(givenPassword, hashedPassword, function (err, isMatch) {
    callback(err, isMatch)
  })
}

var User = mongoose.model('User', userSchema)
module.exports = User
