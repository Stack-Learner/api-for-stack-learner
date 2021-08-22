const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  let token = signToken(user._id);
  //DESELECTING CERTAIN FIELDS. 
  user.password = user.createdAt = user.updatedAt = user.__v = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: user,
  });
};
//sign up

exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    // passwordConfirm: req.body.passwordConfirm,
    // photo: req.body.photo,
    //role: req.body.role//don't write this line of code . cause it will give anyone power to make themself admin.
  });
  createSendToken(user, 201, res);
});

//login
exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password!'));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.checkPassword(password, user.password)) {
    return next(new AppError('Email or password does not match', 401));
  }
  createSendToken(user, 200, res);
});

//protect routes
exports.protect = catchAsync(async (req, res, next) => {
  //jwt verify korte hobe ekhane
  let token;
  if (
    req.headers.authorization ||
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('User beloning to this token does no longer exists')
    );
  }
  //Grant Access to protected Route.
  req.user = currentUser;
  next();
});

//role based permission ....
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(`This Route is not for ${req.user.role}`, 403));
    }
    next();
  };
