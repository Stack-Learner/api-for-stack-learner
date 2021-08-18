const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
//create user - sign up
exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    user,
  });
});
exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});
exports.getSingleUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');
  res.status(200).json({
    status: 'success',
    user,
  });
});

//update single user
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(new AppError('This route is not for password update'));
  }
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    user,
  });
});
//delete single user
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id);
  res.status(204).json({
    status: 'success',
  });
});



exports.getMe = catchAsync(async (req,res,next) => { 
  // console.log('working here'); 
  // console.log(req.user); 
  // next(); 
  const user = req.user; 
  user.password = undefined; 
  res.json({
    status: 'success',  
    user
  })
})