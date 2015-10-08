/*==================================
=            User Model            =
==================================*/

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;


// user schema 

var UserSchema = new Schema({
  name:{type:String,default:''},
  email:{type:String,default:''},
  password:{type:String,default:''},
  salt:{type:String,default:''}
});






/*----------  User Validation Method  ----------*/

UserSchema.path('name').validate(function(name){
  return name.length
},'Please type name');

UserSchema.path('email').validate(function(email){
  return email.length;
},'Please type email');

UserSchema.path('email').validate(function(email,done){
  var User = mongoose.model('User');

  if(this.isNew || this.isModified('email')){
    User
      .find({email:email})
      .exec(function(err,users){
        done(!err && users.length === 0);

      });

  }else{
    done(true);
  }

},'Email already exists');

UserSchema.path('password').validate(function(password){
  return password.length;
},'Please type password');

/*----------  User Schema Method  ----------*/
UserSchema.methods = {
  makeSalt:function(){
   return bcrypt.genSaltSync(SALT_WORK_FACTOR);
  }
};


UserSchema.pre('save',function(next){
  var user = this;
  if (!user.isModified('password')) return next();
  user.salt = this.makeSalt();
  bcrypt.hash(user.password,user.salt,function(err,hash_password){
    if(err) return next(err);
    //console.log(hash_password);
    user.password = hash_password;
    console.log(user);
    next();
  });
  
  
});
mongoose.model('User',UserSchema);

