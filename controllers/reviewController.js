const Product = require('../models/productModel');
const Review = require('../models/reviewModel'); 
const catchAsync = require('../utils/catchAsync'); 
const Factory = require('./handlerFactory'); 

exports.setUserAndProductId = catchAsync(async (req,res,next) => { 
  if(!req.body.product) req.body.product = req.params.productId; 
  if(!req.body.user) req.body.user = req.user._id; 
  next(); 
})
exports.createReview = Factory.createOne(Review); 
exports.getAllReviews = Factory.getAll(Review); 
exports.getReview = Factory.getOne(Review); 
exports.deleteReview = Factory.deleteOne(Review); 
exports.updateReview = Factory.updateOne(Review); 














// exports.createReview = catchAsync(async (req,res,next) => { 
//   const review = await Review.create({
//     user: req.user._id, 
//     product: req.pamars.productId, 
//     rating: req.body.rating, 
//     review: req.body.review
//   }); 
//   //after creating update product document ... 
//   await Product.findByIdAndUpdate(req.params.productId,{
//     numReviews: this.numReviews+1
//   })
//   //product take find korte hobe and then number of reviews baray dite hobe . 
//   //average rating change korte hobe. 
//   res.status(201).json( {
//     review
//   })
// })