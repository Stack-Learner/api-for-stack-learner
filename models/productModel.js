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
      type: String,
    },
    subcategory: {
      type: String,
    },
    brand: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    shippingdetails: {
      type: String,
    },
    manufacturesdetails: {
      type: String,
    },
    selectedsize: {
      type: Array,
      default: [],
    },
    feature: Boolean,
    trend: Boolean,
  },
  { timestamps: true }
);

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
