const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Product = require('../models/productModel');
const Factory = require('./handlerFactory');
const Category = require('../models/categoryModel');
//create

exports.setProductImages = (req,res,next) => { 
  const productImages = req.files.map(f=> f.location); 
  req.body.Images = productImages; 
  next(); 
}
exports.categoryAndAdminIdSetter = catchAsync(async (req,res,next) => { 
  
  const category = await Category.findOne({name: req.body.category}); 
  req.body.category = category._id; //setting category id 
  req.body.user = req.user._id; //setting admin id 
  next();
})

exports.createProduct = Factory.createOne(Product);

exports.getProductByCategory = catchAsync(async (req, res, next) => {
  
  const category = await Category.findOne({ name: req.params.name }); 
  const products = await Product.find({category: category._id}).populate('category','name -_id'); 
  res.status(200).json({
    status: 'success', 
    results: products.length, 
    data: products
  })
});
//get all
exports.getAllProducts = Factory.getAll(Product);

//get one
exports.getProduct = catchAsync(async (req,res,next) => { 
  const product = await Product.findById(req.params.id).populate('reviews').populate('category','name -_id');
  res.json({
    status:'success', 
    product
  }); 
})

//update
exports.updateProduct = Factory.updateOne(Product);

//delete
exports.deleteProduct = Factory.deleteOne(Product);
