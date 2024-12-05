const { ERROR_MESSAGES } = require('../../constants/constants');
const { Movies } = require('../../models/stepDbSchema');
const { GraphQLError } = require('graphql');

const movieResolvers = {
  Query: {
    movies: async () => {
      try {
        return await Movies.find();
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    movie: async (_, { movieId }) => {
      try {
        if (!Number(movieId)) {
          throw new GraphQLError(ERROR_MESSAGES.INVALID_PATH_PARAM.MESSAGE);
        }
        const movie = await Movies.findOne({ movieId });
        if (!movie) {
          throw new GraphQLError(ERROR_MESSAGES.MOVIE_NOT_FOUND.MESSAGE);
        }
        return movie;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    moviesByGenre: async (_, { genre }) => {
      try {
        if (!genre) {
          throw new GraphQLError(ERROR_MESSAGES.MISSING_PARAM.MESSAGE);
        }
        const movies = await Movies.find({ genre });
        if (!movies.length) {
          throw new GraphQLError(ERROR_MESSAGES.GENRE_MOVIE_NOT_FOUND.MESSAGE);
        }
        return movies;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },

  Mutation: {
    createMovie: async (_, { input }, { user }) => {
      try {
        if (!user) {
          throw new GraphQLError(ERROR_MESSAGES.UNAUTHORIZED_USER.MESSAGE);
        }

        const movieExists = await Movies.findOne({ movieId: input.movieId });
        if (movieExists) {
          throw new GraphQLError(ERROR_MESSAGES.MOVIE_EXIST.MESSAGE);
        }

        const movie = new Movies(input);
        return await movie.save();
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    updateMovie: async (_, { movieId, input }, { user }) => {
      try {
        if (!user) {
          throw new GraphQLError(ERROR_MESSAGES.UNAUTHORIZED_USER.MESSAGE);
        }

        if (!Number(movieId)) {
          throw new GraphQLError(ERROR_MESSAGES.INVALID_PATH_PARAM.MESSAGE);
        }

        const updatedMovie = await Movies.findOneAndUpdate(
          { movieId },
          { $set: input },
          { new: true }
        );

        if (!updatedMovie) {
          throw new GraphQLError(ERROR_MESSAGES.MOVIE_NOT_FOUND.MESSAGE);
        }

        return updatedMovie;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    deleteMovie: async (_, { movieId }, { user }) => {
      try {
        if (!user) {
          throw new GraphQLError(ERROR_MESSAGES.UNAUTHORIZED_USER.MESSAGE);
        }

        if (!Number(movieId)) {
          throw new GraphQLError(ERROR_MESSAGES.INVALID_PATH_PARAM.MESSAGE);
        }

        const result = await Movies.deleteOne({ movieId });
        if (!result.deletedCount) {
          throw new GraphQLError(ERROR_MESSAGES.MOVIE_NOT_FOUND.MESSAGE);
        }

        return true;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = movieResolvers;