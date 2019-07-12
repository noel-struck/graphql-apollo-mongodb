require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const startServer = async () => {
  const app = express();

  // MongoDB Connection
  await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true 
  });
  
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  
  server.applyMiddleware({ app });
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}${server.graphqlPath}`);
  })
}
startServer ();