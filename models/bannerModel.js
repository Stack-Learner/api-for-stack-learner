const mongoose = require('mongoose'); 

const bannerSchema = mongoose.Schema({
  name: {
    type: String,
    
  }, 
  image: {
    type: String, 
    required: true,
  },
  alt: {
    type: String, 
  }
},{
  timestamps: true, 
}); 
const Banner = mongoose.model('Banner',bannerSchema); 
module.exports = Banner; 