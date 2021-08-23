const Profile = require('../models/profileModel'); 
const catchAsync = require('../utils/catchAsync'); 
const AppError = require('../utils/AppError'); 
const Factory = require('./handlerFactory'); 

exports.setUserId = (req,res,next) => { 
  req.body.user = req.user._id; 
  req.params.id = req.user._id; 
  next(); 
}
exports.createProfile = Factory.createOne(Profile); 
exports.getAllProfile = catchAsync(async(req,res,next) => { 
  //with populate also . 
  const profiles = await Profile.find().populate({path: 'user',select: '-password'}); 
  res.status(200).json({
    status: 'success', 
    results: profiles.length, 
    profiles
  })
}); 
exports.getUserProfile = Factory.getOne(Profile); 
exports.updateUserProfile = Factory.updateOne(Profile); 
exports.deleteUserProfile = Factory.deleteOne(Profile);