A) UPDATE PAINTING SCHEMA MODELS IN DB => UPDATE LIKES IN THE ROUTES LOGIC

B) ADD /:id logic to url for user routes
1) use mongoose model update to change attributes
do ajax call on the artshow div => find model again and randomise => .remove element in the div and

C) ADD navbar to layouts with links to various user routes

2) infinite scrolling

//TEMPLATE FOR USING METHOD OVERRIDE FOR DELETE
<form method="post" action="/users/1">
  <input type="hidden" name="_method" value="put">
  <div class="form-group">
    <label for="name">Username</label>
    <input type="text" class="form-control" id="name" name="username" placeholder="User Name" value="<%=name%>">
  </div>
  <div class="form-group">
    <label for="year">Password</label>
    <input type="password" class="form-control" id="year" name="userpassword" placeholder="User password" value="<%=password%>">
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>




















var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/hash')

var bcrypt = require('bcrypt')

var userSchema = mongoose.Schema({
  local: {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
})

userSchema.pre('save', function(next) {
  // console.log('before save hash the password')
  // console.log(this)

  var user = this

  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.local.password, salt, function(err, hash) {
      if (err) return next(err)

      user.local.password = hash
        // console.log('after hash')
        // console.log(user)
      next()
    })
  })
})

userSchema.post('save', function() {
  // console.log('after the save, save successful')
})

userSchema.methods.sayName = function() {
  // console.log(this)
  // console.log('hey i can call say name from an instance')
  // console.log('my name is ' + this.local.email)
  // console.log('my password is ' + this.local.password)
}

userSchema.methods.authenticate = function(password, callback) {
  console.log('given password is ' + password)
  console.log('saved password is ' + this.local.password)

  bcrypt.compare(password, this.local.password, function(err, isMatch) {
    callback(err, isMatch)
  })
}

var User = mongoose.model('User', userSchema)

var newUser = new User({
  local: {
    email: 'primaulia@gmail.com',
    password: 'test123'
  }
})

newUser.save(function(err, newUser) {
  if (err) console.log(err.message)
    // console.log('new user saved')
  newUser.authenticate('test123', function(err, authenticated) {
      if (err) console.log('not authenticated')
      console.log('auth is ' + authenticated)
      if (authenticated) console.log('user is authenticated')
    })
    // User.findOne({ local: { email: 'primaulia@gmail.com' } }, function (err, user) {
    //   user.authenticate('test123', function (err, authenticated) {
    //     if (err) console.log('not authenticated')
    //     console.log('auth is ' + authenticated)
    //     if (authenticated) console.log('user is authenticated')
    //   })
    // })
})

// newUser.sayName()
