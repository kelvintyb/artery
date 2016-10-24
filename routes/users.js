var express = require('express')
var router = express.Router()
var passport = require('passport')

var User = require('../models/user')

function authCheck(req,res,next){
  if(req.isAuthenticated()){
    req.flash('signupMessage', 'You have logged in already la')
    return res.redirect('/profile');
  }
  else{
    return next();
  }
}

router.route('/signup')
      .get(authCheck,function(req, res) {
        User.find({}, function(err, allUsers) {
          res.render('users/index-passport', {
            allUsers: allUsers,
            message: req.flash('signupMessage')
          })
        })
      })
      .post(passport.authenticate('local-signup', {
        successRedirect:'/profile',
        failureRedirect: '/signup',
        failureFlash: true
      }))

//SEPARATE SECTION
router.route('/login')
      .get(function(req, res) {
        res.render('users/login', {
          message: req.flash('loginMessage')
        })
      })
      .post(passport.authenticate('local-login',{
        successRedirect:'/profile',
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

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/signup');
})

module.exports = router















module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index.ejs');
  }).

  app.get('/login', function(req, res) {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    })
  })

  // app.post('/login', passportStuff)

  app.get('/signup', function(res, req) {
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });
  // app.post('/signup',passportStuff)

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user: req.user;
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
  }

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  })
}
