const mongoose = require("mongoose"); 

const categorySchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: [true,'Already a category exist with this name .']
  }
}); 

const Category = mongoose.model('Category',categorySchema); 
module.exports = Category; 