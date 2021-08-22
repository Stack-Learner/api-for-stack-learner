const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    Images: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      maxlength: 50,
    },
    skunumber: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    weaight: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: true,
    },
    subcategory: {
      type: String,
    },
    brand: {
      type: String,
    },
    haveDiscount: {
      type: Boolean,
    },
    discount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    // shippingdetails: {
    //   type: String,
    // },
    manufacture: {
      type: String,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
      min: 1, 
      max: 5, 
      set: (val) => Math.round(val*10)/10
    },
    // selectedsize: {
    //   type: Array,
    //   default: [],
    // },
    featured: Boolean,
    trend: Boolean,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//this finds out how many reviews are there in a certain tour .
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

productSchema.index(
  {
    title: 'text',
    description: 'text',
  },
  {
    weights: {
      title: 5,
      description: 1,
    },
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
