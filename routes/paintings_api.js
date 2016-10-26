var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../models/user')
var Painting = require('../models/painting')

function authPass(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/login');
  }
}
//NOTE: below is a temp solution to handling multi-category search, ideally shld handle /:id and check :id against a table to determine if it is a painting name, category or artist
router.get('/name/:name', function(req, res) {
  Painting.find({
    'name': req.params.name
  }, function(err, paintings) {
    res.json(paintings)
  })
})
router.get('/category/:category', function(req, res) {
  Painting.find({
    'category': req.params.category
  }, function(err, paintings) {
    res.json(paintings)
  })
})
router.get('/artist/:artist', function(req, res) {
  Painting.find({
    'artist': req.params.artist
  }, function(err, paintings) {
    console.log(paintings)
    res.json(paintings)
  })
})

router.post('/updatelikes', authPass, function(req, res) {
  var currPaintingScore = 0,
    categoryHelper = {
      "Renaissance": 1,
      "Post-Impressionism": 2,
      "Cubism": 3
    };
  Painting.findById(req.body.paintingId, function(err, model) {
    console.log(model);
    if (err) throw new Error(err);
    model.likes += 1;
    currPaintingScore = categoryHelper[model.category]
    model.save();
  })
  User.findById(req.user.id, function(err, model) {
    if (err) throw new Error(err);
    //calculate avg cat score
    model.categoryScore = Math.round((model.categoryScore + currPaintingScore) / (model.likeList.length + 1))
    model.likes += 1;
    model.save();
  })
  User.findByIdAndUpdate(req.user.id, {
    $addToSet: {
      "likeList": req.body.paintingId
    }
  }, function(err, model) {
    if (err) throw new Error(err);
    res.redirect('/curator');
  })
})

module.exports = router;
