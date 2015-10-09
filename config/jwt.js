var jwt = require('jsonwebtoken');

var config = require('config');
var secret = config.JWT_SECRET;


exports.sign = function(userId){
	var token = jwt.sign({
					userId :userId,
				},secret,{expiresInMinute:1440});

	return token;
};

exports.verify = function(token,done){
	jwt.verify(token,secret,function(err,decoded){
		if(err) return done(err);
		return done(null,decoded);
	});
};