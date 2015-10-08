/*===========================================
=            Module Dependencies            =
===========================================*/

var fs = require('fs');
var join  = require('path').join;
var express = require('express');
var config = require('config');
var mongoose = require('mongoose');
var passport = require('passport');

var app = express();
var port = process.env.PORT || 3000;

// //connect to mongo db
var connect = function(){
	var options = {};
	mongoose.connect(config.db,options);
};

connect();
mongoose.connection.on('error',console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(join(__dirname, 'app/models')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(__dirname, 'app/models', file));
});


// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

app.listen(port);
console.log('Express app started on port ' + port);

/*==============================
=            expose            =
==============================*/

module.exports = app;




