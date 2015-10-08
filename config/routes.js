var users = require('users');

module.exports = function(app,passport){
	// app.get('/',function(req,res){
	// 	return res.send('hello');
	// });

	app.post('/users',users.create);
}