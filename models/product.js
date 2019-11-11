const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  vendor: String,
  order: Number,
  media: Array
});
const productsSchema = new mongoose.Schema({
  products: [productSchema],
  promotion: mongoose.Schema.Types.Mixed
});

const Products = mongoose.model('Products', productsSchema, 'data');
// const Product = mongoose.model('Product', productSchema)

// export const Products;
// export const Product;
module.exports = {
  Products
};
