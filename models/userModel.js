const mongoose = require('mongoose'); 
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({ 
  firstName: {
    //fullname contains firstname and lastname merge them in controller 
    type: String,  
    trim: true, 
    minLength: 3, 
    maxLenght: 30
  }, 
  lastName: {
    type:String, 
    trim: true, 
  }, 
  role: { 
    type: String, 
    default: 'user', 
    enum: ['user','moderator','admin','superadmin']
  }, 
  password: {
    type: String, 
    required: 'Minimum 6 character is required for password', 
    minLength: 6,
  },
  passwordConfirm: { 
    type: String, 
    required: 'Please confirm your password', 
    validate: { 
      validator: function(confirmPasswordData) {
        return confirmPasswordData === this.password
      }, 
      message: 'Passwords are not the same.'
    }
  }, 
  email: { 
    type: String, 
    required: 'Please Enter an email', 
    unique: true, 
    validate: [validator.isEmail, 'Please Enter a valid email']
  }, 
  photo: { 
    type: String, 
  }, 

},{
  timestamps: true, //insert createdAt and updatedAt field automatically
}); 
userSchema.pre('save',async function (next) { 
  if(!this.isModified('password')) return next(); 

  this.password = await bcrypt.hash(this.password,10); 
  this.passwordConfirm = undefined, 
  next(); 
} ); 
userSchema.methods.checkPassword = async function(candidatePassword,userPassword)   { 
  return bcrypt.compare(candidatePassword,userPassword); 
}
const User = mongoose.model('User',userSchema); 
module.exports = User; 

