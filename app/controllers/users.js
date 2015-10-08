var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.create = function(req,res){
	var user = new User(req.body);
	user.save(function(err,user){
		if(err) return res.status(500).send({err:err.errors});
		return res.send(user);
	});
};