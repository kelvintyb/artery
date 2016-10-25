var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../models/user')
var Painting = require('../models/painting')

function authPass(req,res,next){
  if(req.isAuthenticated()){
    return next();
  } else {
    return res.redirect('/login');
  }
}

router.route('/updatelikes')
      .post(authPass, function(req, res){
//NOTE: uncomment below when new objects are inserted
        // Painting.findOne({id:req.body.paintingId}, function(err, model){
        //   if (err) throw new Error(err);
        //   model.likes += 1;
        //   model.save();
        // })
        User.findByIdAndUpdate(req.user.id,{$addToSet:{"likeList":req.body.paintingId}}, function(err,model){
          if (err) throw new Error(err);
          res.redirect('/curator');
        })
      })


module.exports = router;
