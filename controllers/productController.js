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
exports.createProduct = Factory.createOne(Product);

exports.getProductByCategory = catchAsync(async (req, res, next) => {
  const category_id = await Category.find({name: req.params.name}); 
  const products = await Product.find({category: category_id}).populate('category','name -_id'); 
  res.status(200).json({
    status: 'success', 
    results: products.length, 
    data: products
  })
});
//get all
exports.getAllProducts = Factory.getAll(Product);

//get one
exports.getProduct = Factory.getOne(Product,{path:'reviews'});

//update
exports.updateProduct = Factory.updateOne(Product);

//delete
exports.deleteProduct = Factory.deleteOne(Product);
