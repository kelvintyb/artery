A) UPDATE PAINTING SCHEMA MODELS IN DB => UPDATE LIKES IN THE ROUTES LOGIC - DONE

B) ADD /:id logic to url for user routes - DONE

C) IMPLEMENT POST AND DELETE FOR PORTFOLIO PAGE*** both for the ajax calls in script.js and the user route ref portfolio.ejs

D) use mongoose model update to change attributes
do ajax call on the artshow div => find model again and randomise => .remove element in the div and

E) Take out ajax login in navbar if needed OR take out login page, and just have a signup

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

//navbar template to be put inside navbar for ajax signin
<form class="navbar-form navbar-right">
  <div class="form-group">
    <input type="text" placeholder="Email" class="form-control">
  </div>
  <div class="form-group">
    <input type="password" placeholder="Password" class="form-control">
  </div>
  <button type="submit" class="btn btn-success">Sign in</button>
</form>

//navbar template for category search
<div class="dropdown">
  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    Dropdown
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a href="#">Separated link</a></li>
  </ul>
</div>

//template for search bar
<div class="row">
  <div class="col-lg-6">
    <div class="input-group">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button">Go!</button>
      </span>
      <input type="text" class="form-control" placeholder="Search for...">
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->
  <div class="col-lg-6">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Search for...">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button">Go!</button>
      </span>
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->
</div><!-- /.row -->
















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
