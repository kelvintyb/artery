var express = require('express')
var router = express.Router()
var passport = require('passport')
var Painting = require('../models/painting')

router.route('/')
      .get(function(req, res) {
        Painting.find({}, function(err, allPaintings) {
          res.render('paintings/index', {
            allPaintings: allPaintings,
          })
        })
      })
      .post(function(req,res){
        Painting.create(req.body.painting, function(err, savedPainting) {
          if (err) throw new Error(err);
          res.redirect('/')
        })
      })


module.exports = router
