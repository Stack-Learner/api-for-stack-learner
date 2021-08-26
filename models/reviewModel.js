const mongoose = require('mongoose');
const Product = require('./productModel');

const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    max: 5,
    min: 1,
  },
  review: {
    type: String,
  },
});
reviewSchema.pre(/^find/, function (next) {
  //this function will run each time we do a query on reviewSchema
  this.populate({
    path: 'user',
    select: 'role firstName lastName ',
  });
  next();
});

reviewSchema.statics.calcAverageRating = async function (productId) {
  const stat = await this.aggregate([
    {
      $match: { product: productId }, //productId er upor depend kore match korbo
    },
    {
      $group: {
        _id: '$product', //product namer field er upor kore sob gulake ekta group a sajabo .
        nRating: { $sum: 1 }, //jotogula document pabe seigular jonne 1 kore increase korbe
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  if (stat.length) {
    await Product.findByIdAndUpdate(productId, {
      numReviews: stat[0].nRating,
      avgRating: stat[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      numReviews: 0,
      avgRating: 0,
    });
  }
};
reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRating(this.r.product);
});
//so that one user can review one product only once . 
reviewSchema.index({product: 1, user: 1},{unique: true}); //product and users unique combination 

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
