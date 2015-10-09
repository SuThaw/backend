/*===========================================
=            Passport JS setup            =
===========================================*/

var mongoose = require('mongoose');
var Localstrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

var local = require('./passport/local');

module.exports = function(passport){
	/* Serialize sessions */
	passport.serializeUser(function(user,done){
		done(null,user.id)
	});

	passport.deserializeUser(function(id,done){
		User.load({criteria:{_id:id}},function(err,user){
			done(err,user);
		})


	});

	
	passport.use(local);
	
};


