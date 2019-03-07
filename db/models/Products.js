const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: String,
  name: String,
  category: {
    type: String,
    index: true,
  },
  price: Number,
  reviews: Number,
  stars: Number,
  is_prime: Boolean,
  is_sponsored: Boolean,
  image_url: String,
});

module.exports = mongoose.model('Product', productSchema);
