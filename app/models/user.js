/*==================================
=            User Model            =
==================================*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema 

var UserSchema = new Schema({
  name:{type:String,default:''},
  email:{type:String,default:''},
  password:{type:String,default:''}
});



mongoose.model('User',UserSchema);

