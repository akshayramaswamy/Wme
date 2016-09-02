var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	phoneNumber: Number,
	email: String,
	dorm: String,
	RF: String,
	scores: {}, //scores for users, associated by day
	friends: Array
});

var Person = mongoose.model('Person', userSchema);

module.exports = Person;
