import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Int,
  available: Boolean,
  category: productCategorySchema
});

const productCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['CLOTHES', 'SHOES', 'DEVICES']
  },
  products: [productSchema]
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;