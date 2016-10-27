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


router.get('/all', function(req, res) {
  Painting.find({})
          .exec(function(err, paintings) {
          res.json(paintings)
        })
})

router.get('/userid', function(req,res){
  var query = {'ownedBy': req.user.id};
  Painting.find(query)
          .exec(function(err, paintings){
            res.json(paintings)
          })
})
//NOTE: below is a temp solution to handling multi-category search, ideally shld handle /:id and check :id against a table to determine if it is a painting name, category or artist
router.get('/name/:name', function(req, res) {
  var query = {'name': req.params.name};
  Painting.find(query)
          .populate("ownedBy")
          .exec(function(err, paintings) {
          res.json(paintings)
        })
})
router.get('/category/:category', function(req, res) {
  var query = {'category': req.params.category};
  Painting.find(query)
          .populate("ownedBy")
          .exec(function(err, paintings) {
          res.json(paintings)
        })
})
router.get('/artist/:artist', function(req, res) {
  var query = {'artist': req.params.artist};
  Painting.find(query)
          .populate("ownedBy")
          .exec(function(err, paintings) {
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
router.post('/create',authPass,function(req,res){
  var paintingAttr = req.body.painting;
  var newPainting = new Painting({
    name: paintingAttr.name,
    category: paintingAttr.category,
    artist: paintingAttr.artist,
    imageUrl: paintingAttr.imageUrl,
    price: paintingAttr.price,
    permalink: paintingAttr.permalink,
    likes: 0,
    ownedBy: req.user.id
  });
  newPainting.save(function(err, newPainting) {
    if (err) throw err;
    User.findByIdAndUpdate(req.user.id, {
      $addToSet: {
        "ownList": newPainting.id
      }
    }, function(err, model) {
      if (err) throw new Error(err);
      res.json(model)
    })
  })
})
// router.put
router.put('/:id',authPass,function(req,res){
  res.send(req.params)
})
// router.delete
router.delete('/:id',authPass, function(req,res){
  Painting.findByIdAndRemove(req.params.id,function(err){
    if (err) throw new Error(err);
    res.redirect('/portfolio')
  })
})
module.exports = router;
