const Product = require('./models/product.model');

const resolvers = {
  Query: {
    productList: () => {
      
    }
  },
  Mutation: {
    createProduct: async (_, { product }, ) => {
      const productInstance = new Product({ product });
      await productInstance.save();
      console.log(productInstance);
      return productInstance;
    }
  }
}

module.exports = resolvers;