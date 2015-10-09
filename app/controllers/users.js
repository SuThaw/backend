var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.create = function(req,res){
	var user = new User(req.body);
	user.save(function(err,user){
		if(err) return res.status(400).send({err:err.errors});
		return res.send(user);
	});
};

exports.session = function(req,res){
	return res.send('hello');
};

exports.failLogin = function(req,res){
	return res.status(403).send('Login Fail');
}
