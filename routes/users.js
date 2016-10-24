var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../models/user')

function authCheck(req, res, next)
//using passport's isAuthenticated method to check against session cookie
  if (req.isAuthenticated()) {
    req.flash('signupMessage', 'You have logged in already la')
    //NOTE: redirect to /home later when pref/recommendation functionality is done
    return res.redirect('/profile');
  } else {
    return next();
  }
}

//homepage route
// router.get('/', )

//signup routes
//NOTE: logic for setting flash messages are in the passport.js config file
router.route('/signup')
  .get(authCheck, function(req, res) {
    User.find({}, function(err, allUsers) {
      res.render('users/index', {
        allUsers: allUsers,
        message: req.flash('signupMessage')
      })
    })
  })
  //posted from signup.ejs form
  .post(passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }))

//Log-in routes
router.route('/login')
  .get(function(req, res) {
    res.render('users/login', {
      message: req.flash('loginMessage')
    })
  })
  //USE CUSTOM CALLBACKS HERE TO REFACTOR INTO AJAX-FRIENDLY LOGIN
  .post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }))


router.get('/error', function(req, res) {
  res.render('users/error')
})

router.get('/profile', function(req, res) {
  res.render('users/profile', {
    message: req.flash('signupMessage')
  })
})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/signup');
})

module.exports = router
