var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../models/user')
var Painting = require('../models/painting')
//using passport's isAuthenticated method to check against session cookie - if authenticated, does not next()
function authCheck(req, res, next){
  if (req.isAuthenticated()) {
    req.flash('signupMessage', 'You have logged in already la')
    //NOTE: redirect to /home later when pref/recommendation functionality is done
    return res.redirect('/profile');
  } else {
    return next();
  }
}
//if authenticated, next()
function authPass(req,res,next){
  if(req.isAuthenticated()){
    return next();
  } else {
    return res.redirect('/login');
  }
}
function randomiser(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
//homepage route
router.get('/',function(req,res){
  res.redirect('/login')
})
//owned route
router.route('/owned')
      .get(authPass, function(req,res){
        res.render('paintings/owned')
      })
//search route
router.route('/search')
      .get(authPass, function(req,res){
        res.render('paintings/search')
      })
//add route
router.route('/add')
      .get(authPass, function(req,res){
        res.render('paintings/add')
      })
// route for Curator page
router.route('/curator')
      .get( authPass, function(req,res){
        Painting.find({}, function(err, allPaintings){
            var painting = randomiser(allPaintings);
            res.render('users/curator',{
                painting: painting
            })
        })
      })
//signup routes
//NOTE: logic for setting flash messages are in the passport.js config file
router.route('/signup')
  .get(authCheck, function(req, res) {
    //NOTE: can use below for index of users in api
    User.find({}, function(err, allUsers) {
      res.render('users/index', {
        allUsers: allUsers,
        message: req.flash('signupMessage')
      })
    })
  })
  //posted from signup.ejs form
  .post(passport.authenticate('local-signup', {
    successRedirect: '/curator',
    failureRedirect: '/signup',
    failureFlash: true
  }))

//Log-in routes
router.route('/login')
  .get(authCheck, function(req, res) {
    res.render('users/login', {
      message: req.flash('loginMessage')
    })
  })
  //USE CUSTOM CALLBACKS HERE TO REFACTOR INTO AJAX-FRIENDLY LOGIN
  .post(passport.authenticate('local-login', {
    //NOTE: redirect to /home later when pref/recommendation functionality is done
    successRedirect: '/curator',
    failureRedirect: '/error',
    failureFlash: true
  }))


router.get('/error', function(req, res) {
  res.render('users/error')
})

router.get('/profile', authPass, function(req, res) {
  res.render('users/profile', {
    message: req.flash('signupMessage')
  })
})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
})

router.get('/testing',function(req,res){
  res.json(req.user)
})
module.exports = router
