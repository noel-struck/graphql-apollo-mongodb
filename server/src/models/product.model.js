const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['CLOTHES', 'SHOES', 'DEVICES']
  },
})

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  available: Boolean,
  category: productCategorySchema
});



const Product = mongoose.model('Product', productSchema);
module.exports = Product;