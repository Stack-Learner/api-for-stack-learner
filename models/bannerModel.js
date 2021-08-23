const mongoose = require('mongoose'); 

const bannerSchema = mongoose.Schema({
  name: {
    type: String
  }, 
  image: {
    type: String, 
  },
  alt: {
    type: String, 
  }
},{
  Timestamps: true, 
}); 
const Banner = mongoose.model('Banner',bannerSchema); 
module.exports = Banner; 