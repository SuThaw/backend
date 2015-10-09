/*==============================
=            Local             =
==============================*/

var mongoose  = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var config = require('config');
var User = mongoose.model('User');


/*======================================
=            module exports            =
======================================*/

module.exports = new LocalStrategy(
	{
		usernameField : 'email',
		passwordField : 'password'
	},

	function(email,password,done){
		var options = {
			criteria:{email:email},
			select:'name email password salt'
		};

		User.load(options,function(err,user){
			if(err) return done(err);
			
			if(!user){
				return done(null,false,{message:'Unknown User'});
			}

			if(!user.authenticate(password)){
				
				return done(null,false,{message:'Invalid password'});
			}
				return done(null,user);
		});
	}

)




