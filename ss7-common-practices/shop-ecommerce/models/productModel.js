const mongoose = require('mongoose');
const schema = mongoose.Schema;
const user = require('../models/userModel');

const productSchema = new schema({
  user: {
    type: mongoose.ObjectId,
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
  reviews: {
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
      type: mongoose.ObjectId,
      ref: user,
      required: true
    },
  },
  rating: {
    type: Number,
    required: true
  },
  numReviews: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  countInStock: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('product', productSchema);