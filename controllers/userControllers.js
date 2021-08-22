const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Factory = require('./handlerFactory');
exports.createUser = Factory.createOne(User);
exports.getAllUser = Factory.getAll(User);
exports.getSingleUser = Factory.getOne(User);
exports.updateUser = Factory.updateOne(User);
exports.deleteUser = Factory.deleteOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(new AppError('This route is not for password update'));
  }
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });
  user.password = user.createdAt = user.updatedAt = user.__v = undefined;
  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id);
  res.status(204).json({
    status: 'success',
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = req.user;
  user.password = user.__v = undefined;
  res.json({
    status: 'success',
    user,
  });
});
