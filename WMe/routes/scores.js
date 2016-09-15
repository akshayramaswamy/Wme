/* All routes in this file pertain to CRUD operations for scores */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/person');

/* Get score for given user
    @TODO -- use date object to actually compute scores. When I return user.score, that's a placeholder. Figure out how to use date objects
 */
router.get('/:phoneNumber', function(req, res, next){
  User.find({phoneNumber: req.params.phoneNumber}, function(err, user){
    if(err){
      console.log("user not found");
      res.send(400);
    } else{
      console.log("user found, sending score");
      res.json(user.scores);
    }
  });
});

/* Post score for user, where user's phone number is given in the body of POST request
  @TODO This will help for above route, but figure out how to use Date objects in node
*/
router.post('/', function(req, res, next){
  newScore = req.body.score;
  date = req.body.date;
  User.find({phoneNumber: req.body.phoneNumber}, function(err, user){
    if(err){
      console.log("user not found");
      res.send(400);
    } else{
      console.log("user found, setting score");
      // Add newScore to 'scores' object map
      user.scores[date] = newScore;
      user.save(function(err){
        if(err){
          console.log("user not saved");
          res.send(500);
        } else{
          console.log("user saved with updated score!");
          res.send(200);
        }
      });
    }
  });
});

module.exports = router;
