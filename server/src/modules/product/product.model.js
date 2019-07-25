const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  available: Boolean,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
});

module.exports = mongoose.model('Product', productSchema);