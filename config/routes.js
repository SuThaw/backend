var users = require('users');
var jwtLibrary = require('./jwt')

module.exports = function(app,passport){
	// app.get('/',function(req,res){
	// 	return res.send('hello');
	// });

	app.post('/users',users.create);
	app.get('/users/failLogin',users.failLogin);
	
	app.post('/users/session',function(req,res,next){
   		passport.authenticate('local',function(err,user,info){
				if(err) return res.status(500).send(err);
				if(info) return res.status(400).send(info);
				var token = jwtLibrary.sign(user.id,'Local');
				
				

				return res.json({success:true,message:'Enjoy your token',token:token});
			})(req,res,next);
	});
}