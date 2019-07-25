const productResolver = require('./modules/product/product.resolver');
const categoryResolver = require('./modules/category/category.resolver');

const resolvers = {
  Query: {
    ...productResolver.Query,
    ...categoryResolver.Query
  },
  Mutation: {
    ...productResolver.Mutation,
    ...categoryResolver.Mutation
  }
};

module.exports = resolvers;
