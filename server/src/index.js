import '@babel/polyfill'; // Required for babel to compile properly
import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema.graphql';
import resolvers from './resolvers';

//load env config
config();

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
    console.log(
      `Server listening at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};
startServer();
