var express = require('express')
var router = express.Router()
var User = require('../models/user')
function authPass(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/login');
  }
}
router.get('/', function(req, res) {
  User.find({}, function(err, usersArr) {
    res.render('users/index', {
      usersArr: usersArr
    })
  })
}).get('/api', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users)
  })
})

router.post('/', function(req, res) {
  User.create(req.body.user, function(err, userData) {
    res.json(userData)
  })
  res.redirect('/');
})

router.put('/edit',function(req,res,next){
  console.log(req.user)
  User.findById(req.user.id, function(err,model){
    if (req.body.user.local.name !== ""){
      model.local.name = req.body.user.local.name;
    }
    if(req.body.user.local.email !== ""){
      model.local.email = req.body.user.local.email;
    }
    model.save(function(err,savedUser){
      res.json(savedUser);
    })
  })
})

module.exports = router
