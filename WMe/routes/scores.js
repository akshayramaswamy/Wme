/* All routes in this file pertain to CRUD operations for scores */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/person');

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
      
	/* Weekly score logic = total score over past 7 days / number of entries in past 7 days			
	   @TODO - check if this is right way to loop through keys in JS, think of edge cases
		number of milliseconds in a week = 604800000
	*/
	var scoreMap = user.scores;
	var weeklyTotal = 0;
	var entryCounter = 0;
	var todayDate = Date();
	Object.keys(scoreMap).forEach(function(scoreDate) {
		if (todayDate.getTime() - scoreDate.getTime <= 604800000){
			entryCounter++;
			weeklyTotal+= scoreMap[scoreDate];
		}	 	
	});
	var avgWeeklyScore = weeklyTotal/entryCounter; 
	res.json(avgWeeklyScore);
    }
  });
});

/* Post score for user, where user's phone number is given in the body of POST request
  @TODO This will help for above route, but figure out how to use Date objects in node
*/
router.post('/', function(req, res, next){
  newScore = req.body.score;
  var date = new Date();
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
