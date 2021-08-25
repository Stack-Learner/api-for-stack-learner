const Profile = require('../models/profileModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Factory = require('./handlerFactory');

exports.setUserId = (req, res, next) => {
  req.body.user = req.user._id;
  next();
};
exports.createProfile = Factory.createOne(Profile);
exports.getAllProfile = catchAsync(async (req, res, next) => {
  //with populate also .
  const profiles = await Profile.find().populate({
    path: 'user',
    select: '-password',
  });
  res.status(200).json({
    status: 'success',
    results: profiles.length,
    profiles,
  });
});
exports.getUserProfile = catchAsync(async (req, res, next) => {
  const userProfile = await Profile.find({ user: req.body.user }).populate(
    'user',
    '-password'
  );
  res.json(userProfile);
});
exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const userProfile = await Profile.findOneAndUpdate(
    { user: req.user._id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(userProfile);
});
exports.deleteUserProfile = catchAsync(async (req, res, next) => {
  const userProfile = await Profile.findOneAndDelete({ user: req.user._id });
  res.status(204).json({
    status: 'success',
    userProfile,
  });
});
