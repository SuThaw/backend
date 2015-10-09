var jwt = require('jsonwebtoken');

var config = require('config');
var secret = config.JWT_SECRET;
console.log(secret);

exports.sign = function(userId){
	var token = jwt.sign({
					userId :userId,
				},secret,{expiresInMinute:1440});

	return token;
};

exports.verify = function(token){
	jwt.verify(token,secret,function(err,decoded){
		return decoded;
	});
};