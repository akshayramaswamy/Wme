var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/person');

/* Finds friends for given phone number and sends back list */
router.get('/:phoneNumber', function(req, res, next){
  User.find({phoneNumber: req.params.phoneNumber}, function(err, user){
    if(err){
      console.log("user not found");
      res.send(400);
    } else{
      console.log("user found, obtaining & sending friend info now");
      friends = user.friends;
      res.json(friends);
    }
  });
});

/* Updates friends by adding new friend to list of friends for given phone number */
router.post('/', function(req, res, next){
  User.find({phoneNumber: req.body.phoneNumber}, function(err, user){
    if(err){
      console.log("usernot found");
      res.send(400);
    } else{
      console.log("user found");
      newFriends = req.body.friends;
      friends = user.friends;
      newFriends.forEach(function(newFriend){
        friends.push(newFriend);
      });
      // update friends for user
      user.friends = friends;
      // re save user
      user.save(function(err){
        if(err){
          console.log("error re saving friend after friends set");
          res.send(400);
        } else{
          console.log("user saved successfully");
          res.json(user.friends);
        }
      });
    }
  });
});

/* Gets name of friend with lowest score */
router.get("/low/:phoneNumber", function(req, res, next){
  User.find({phoneNumber: req.params.phoneNumber}, function(err, user){
    if(err){
      console.log("user not found");
      res.send(400);
    } else{
      friends = user.friends;
      User.find({phoneNumber: friends[0]}, function(err, firstFriend){
        lowestScore = firstFriend.scores;
        lowestName = firstFriend.name;
        friends.forEach(function(friendNumber){
          User.find({phoneNumber: friendNumber}, function(err, friend){
            if(friend.scores < lowestScore){
              lowestScore = friend.scores;
              lowestName = friend.name;
            }
          });
        });
        // Should now have lowest friend name
        res.json(lowestName);
      });
    }
  });
});

module.exports = router;
