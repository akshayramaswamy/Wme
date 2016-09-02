var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = require('../model/person')

/* GET user info by phoneNumber*/
router.get('/userID/:phoneNumber', function(req, res, next) {
  User.find({phoneNumber: req.params.phoneNumber}, function(err, user){
    if(err){
      console.log("User doesn't exist")
      res.send(400)
    } else{
      res.json(user)
    }
  })
});

/* GET user info by name, riskier*/
router.get('/userID/:name', function(req, res, next){
  User.find({name: req.params.name}, function(err, user){
    if(err){
      console.log("User doesn't exist")
      res.send(400)
    } else{
      res.json(user)
    }
  })
})

/* POST user, i.e., create a new user, by phoneNumber*/
router.post('/', function(req,res, next){
  var newUser = new User({
    name: req.body.name
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    dorm: req.body.dorm,
    dorm: req.body.RF,
    friends: req.body.friends
  });
  newUser.save(function(err){
    if(err){
      console.log("User not saved successfully")
      res.send(500)
    }
    console.log("User saved successfully!")
  });
  res.send(200)
})

module.exports = router;
