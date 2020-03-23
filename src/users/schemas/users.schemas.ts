import  *as  mongoose   from 'mongoose';
import * as  bcrypt     from 'bcrypt';


export const UserSchema  = new mongoose.Schema ({
   
  username: { type: String,  minlength:6 ,  maxlength:50 ,required: [true , "Es necesario un username"]},
  email   : { type: String,  minlength:10 , maxlength:30 ,unique: true, required: [true , "Es necesario un email"]},
  password: { type: String,  required : [true , "Es necesario un password"]},
  roles   : { type: [String],default  :  ['user'], required: true},

  });

//Pre save the data in the database 
//its create the salt use it to hash the password.
UserSchema.pre('save', function(next){


  const user = this;

  // Make sure not to rehash the password if it is already hashed
  if(!user.isModified('password')) return next();

  // Generate a salt and use it to hash the user's password
  bcrypt.genSalt(10, (err, salt) => {

      if(err) return next(err);

      bcrypt.hash(user['password'] , salt, (err, hash) => {

          if(err) return next(err);
          user['password'] = hash;
          next();

      });

  });

}); 

//This method is for checking the password 
UserSchema.methods.checkPassword = function(attempt, callback){

  let user = this;

  bcrypt.compare(attempt, user.password, (err, isMatch) => {
      if(err) return callback(err);
      callback(null, isMatch);
  });

};