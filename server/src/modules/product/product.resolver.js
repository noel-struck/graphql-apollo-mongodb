const Product = require('./product.model');
const Category = require('../category/category.model');
const Response = require('../../base/response');

const resolvers = {
  Query: {
    productList: async () => {
      try {
        const data = await Product.find().populate('category');
        return new Response(
          data, 
          200, 
          true, 
          'Eyerything is working');
      } catch (error) {
        return new Response(
          [], 
          400, 
          false, 
          `There was an error: ${error}`);
      }
    },
    productDetails: async (obj, { id }) => {
      try {
        let data = await Product.findById(id).populate('category');        
        return new Response(
          data, 
          200, 
          true, 
          'Eyerything is working');
      } catch (error) {
        return new Response(
          {}, 
          400, 
          false, 
          `There was an error: ${error}`);
      }
    }
  },
  Mutation: {
    createProduct: async (obj, { product }) => {
      try {
        const productInstance = new Product(product);
        const data = await productInstance.save();
        let category = await Category.findById(product.category);
        category.products.push(data);
        await category.save();
        return new Response(
          data, 
          201, 
          true, 
          'New resource has been created');
      } catch (error) {
        return new Response(
          {}, 
          400, 
          false, 
          `There was an error: ${error}`);
      }
    },
    updateProduct: async (obj, { id, product }) => {
      try {
        const data = await Product.findByIdAndUpdate(id, product, {
          new: true
        }).populate('category');
        return new Response(
          data, 
          200, 
          true, 
          'Product updated successfully');
      } catch (error) {
        return new Response(
          {}, 
          400, 
          false, 
          `There was an error: ${error}`);
      }
    },
    deleteProduct: async (obj, { id }) => {
      try {
        const productDeleted = await Product.findByIdAndDelete(id);
        const data = await Product.find().populate('category');
        if (!productDeleted) {
          return (
            data,
            404,
            false,
            `The resource does not exist`
          )
        }
        return new Response(
          data, 
          204, 
          true, 
          'The resource was successfully deleted');
      } catch (error) {
        return new Response(
          [], 
          400, 
          false, 
          `There was an error: ${error}`);
      }
    }
  }
};

module.exports = resolvers;
