const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Int
    available: Boolean
    category: ProductsCategory
  }

  type PrductCategory {
    id: ID!
    name(category: AllowedCategory): String,
    products: [Products]!
  }

  enum AllowedCategory {
    CLOTHES
    SHOES
    DEVICES
  }

  type Query {
    # This will return an array of Products as we defined above
    productList: [Product]!
    # This receive a Product Id as parameter and  will return a single product.
    productDetails(id: ID): Product
  }

  type Mutation {
    # This mutation expect a Product object as parameter and returns the new Product
    createProduct(product: Product!): Product!
  }
`;

module.exports = typeDefs;