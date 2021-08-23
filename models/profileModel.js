const mongoose = require('mongoose'); 

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId, 
    ref: 'User', 
    required: ['A profile must have an existing user']
  }, 
  street: String, 
  city: String, 
  country: String, 
  state: String, 
  zip: Number, 
  phone: String, 
}); 


const Profile = mongoose.model('Profile',profileSchema); 
module.exports = Profile; 