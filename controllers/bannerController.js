const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Banner = require('../models/BannerModel');
const Factory = require('./handlerFactory');


//create
exports.createBanner = Factory.createOne(Banner);

//get all
exports.getAllBanners = Factory.getAll(Banner);

//get one
exports.getBanner = Factory.getOne(Banner);

//update
exports.updateBanner = Factory.updateOne(Banner);

//delete
exports.deleteBanner = Factory.deleteOne(Banner);
