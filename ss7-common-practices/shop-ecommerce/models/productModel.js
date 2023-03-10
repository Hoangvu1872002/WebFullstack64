const mongoose = require('mongoose');
const schema = mongoose.Schema;
const user = require('../models/userModel');

const reviewSchema = new schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true
  }
  
})

const productSchema = new schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  reviews: [reviewSchema],
  
  rating: {
    type: Number,
    default: 0,
    required: true
  },
  numReviews: {
    type: Number,
    default:0,
    required: true
  },
  price: {
    type: Number,
    default:0,
    required: true
  },
  countInStock: {
    type: Number,
    default:0,
    required: true
  },
});

module.exports = mongoose.model('product', productSchema);