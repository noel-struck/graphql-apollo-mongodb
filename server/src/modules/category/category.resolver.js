const Category = require('./category.model');
const Response = require('../../base/response');

const resolvers = {
  Query: {
    categoryList: async () => {
      try {
        const data = await Category.find().populate('products');
        return new Response(
          data,
          200,
          true,
          'Eyerything is working'
        );
      } catch (error) {
        return new Response(
          [], 
          400, 
          false, 
          `There was an error: ${error}`);
      }
    },
    categoryDetails: async (obj, { id }) => {
      try {
        const data = await Category.findById(id).populate('products');
        return new Response(
          data,
          200,
          true,
          'Eyerything is working'
        );
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
    createCategory: async (obj, { category }) => {
      try {
        const CategoryInstance = new Category(category);
        const data = await CategoryInstance.save();
        return new Response(
          data,
          201,
          true,
          'New resource has been created'
        );
      } catch (error) {
        return new Response(
          {}, 
          400, 
          false, 
          `There was an error: ${error}`);
      }
    },
    updateCategory: async (obj, { id, category }) => {
      try {
        const data = await Category.findByIdAndUpdate(id, category, {
          new: true
        });
        return new Response(
          data,
          200,
          true,
          `Category updated successfully`
        );
      } catch (error) {
        return new Response(
          {}, 
          400, 
          false, 
          `There was an error: ${error}`);
      }
    },
    deleteCategory: async (obj, { id }) => {
      try {
        const categoryDeleted = await Category.findByIdAndDelete(id);
        const data = await Category.find().populate('products');
        if (!categoryDeleted) {
          return new Response(
            data,
            404,
            false,
            `Category does not exist`
          )
        }
        return new Response(
          data,
          204,
          true,
          'The resource was successfully deleted'
        );
        
      } catch (error) {
        return new Response(
          [], 
          400, 
          false, 
          `There was en error: ${error}`);
      }
    }
  }
};

module.exports = resolvers;
