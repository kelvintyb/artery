var express = require('express')
var router = express.Router()

var User = require('../models/user')

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

router.put('/edit/:id',function(req,res){
  console.log(req.body.user)
  User.findByIdAndUpdate({id: req.params.id}, function(err,user){

  })
})

module.exports = router
