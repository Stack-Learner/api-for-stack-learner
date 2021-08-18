const catchAsync = require('../utils/catchAsync'); 
const AppError = require('../utils/AppError'); 
const Product = require('../models/productModel'); 
const Factory = require('./handlerFactory')

//create 
exports.createProduct = Factory.createOne(Product); 


//get all 
exports.getAllProducts = Factory.getAll(Product); 


//get one 
exports.getProduct = Factory.getOne(Product); 

//update 
exports.updateProduct = Factory.updateOne(Product); 

//delete 
exports.deleteProduct = Factory.deleteOne(Product); 