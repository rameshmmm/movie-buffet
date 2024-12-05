const movieResolvers = require('./movieResolvers');
const userResolvers = require('./userResolvers');

const resolvers = {
  Query: {
    ...movieResolvers.Query,
  },
  Mutation: {
    ...movieResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};

module.exports = resolvers;