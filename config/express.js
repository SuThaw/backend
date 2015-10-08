/*===========================================
=            Module Dependencies            =
===========================================*/

var express = require('express');
var morgan = require('morgan');
var winston = require('winston');
var config = require('config');
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV || 'production';

/*==============================
=            Expose            =
==============================*/



module.exports = function(app,passport){
	// Use winston on production
  var log;
  if (env !== 'development') {
    log = {
      stream: {
        write: function (message, encoding) {
          winston.info(message);
        }
      }
    };
  } else {
    log = 'dev';
  }

  // Don't log during tests
  // Logging middleware
  if (env !== 'test') app.use(morgan(log));

  //body parser usage
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
 
 // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

};

