const Category = require('../models/categoryModel'); 
const Factory = require('./handlerFactory'); 


exports.createCategory = Factory.createOne(Category); 
exports.getAllCategory = Factory.getAll(Category); 
exports.getCategoryById = Factory.getOne(Category); 
exports.updateCategory = Factory.updateOne(Category) ;
exports.deleteCategory = Factory.deleteOne(Category); 
