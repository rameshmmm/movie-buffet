const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { readFileSync } = require('fs');
const { join } = require('path');
const mongoose = require('mongoose');
const resolvers = require('./graphql/resolvers');
const { getUser } = require('./middleware/auth');
const { movieTypeDefs } = require("./graphql/typeDefs/movie.graphql");
const { userTypeDefs } = require("./graphql/typeDefs/user.graphql");

require('dotenv').config();

async function startServer() {
  const server = new ApolloServer({
    typeDefs: [movieTypeDefs, userTypeDefs],
    resolvers,
    formatError: (error) => {
      return {
        message: error.message,
        status: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
      };
    },
  });

  try {
    await mongoose.connect('mongodb://localhost:27017/STEP');
    console.log('Database Connected');

    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || '';
        const user = getUser(token);
        return { user };
      },
      listen: { port: process.env.PORT },
    });

    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();