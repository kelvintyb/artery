var LocalStrategy = require('passport-local').Strategy
module.exports = function(passport) {

  var User = require('../models/user');
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  })
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'user[local][email]',
    passwordField: 'user[local][password]',
    passReqToCallback: true
  }, function(req, email, password, next) {
    //authentication flow on local auth routes
    User.findOne({
      'local.email': email
    }, function(err, foundUser) {
      if (err) return next(err);

      if (foundUser) {
        return next(null, false, req.flash('signupMessage', 'Email has been taken'))
      } else {
        // var newUser = new User({
        //   local: {
        //     email: email,
        //     password: password
        //   }
        // });
        // newUser.save(function(err, newUser) {
        //   if (err) throw err;
        //   return next(null, newUser);
        // NOTE added create below, uncomment above if needed
        User.create(req.body.user, function(err, savedUser) {
          if (err) return next(err);
          return next(null, savedUser);
        })
      }
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'user[local][email]',
    passwordField: 'user[local][password]',
    passReqToCallback: true
  }, function(req, email, password, next) {
    User.findOne({
      'local.email': email
    }, function(err, foundUser) {
      if (err) return next(err);
      if (!foundUser) {
        return next(null, false, req.flash('loginMessage', 'No such user found'))
      } else {
        foundUser.authenticate(password, function(err, authenticated) {
          if (err) return next(err);
          if (authenticated) {
            return next(null, foundUser);
          } else {
            return next(null, false, req.flash('loginMessage', 'Password doesn\'t match'))
          }
        })
      }

    })
  }))
}
