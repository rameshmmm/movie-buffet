const { ERROR_MESSAGES } = require("../constants/constants");
const {
  INVALID_PATH_PARAM,
  MOVIE_NOT_FOUND,
  MISSING_PARAM,
  GENRE_MOVIE_NOT_FOUND,
  MOVIE_EXIST,
  INVALID,
  MISSING_PAYLOAD,
} = ERROR_MESSAGES;

const { Movies } = require("../models/stepDbSchema");

const getAllMovies = async () => {
  try {
    const movies = await Movies.find();
    return movies;
  } catch (e) {
    throw e;
  }
};

const getMovieById = async (movieId) => {
  try {
    if (!Number(movieId)) throw new Error(INVALID_PATH_PARAM.ERROR_CODE);
    const movie = await Movies.findOne({ movieId: movieId });
    if (!movie) throw new Error(MOVIE_NOT_FOUND.ERROR_CODE);
    return movie;
  } catch (e) {
    throw e;
  }
};

const getMovieByGenre = async (genre) => {
  try {
    if (!genre) throw new Error(MISSING_PARAM.ERROR_CODE);
    const movie = await Movies.find({ genre: genre });
    if (!movie) throw new Error(GENRE_MOVIE_NOT_FOUND.ERROR_CODE);
    return movie;
  } catch (e) {
    throw e;
  }
};

const createMovie = async (movie) => {
  // logic to get movie by id
  try {
    const { movieId, movieName, genre, favorite, rating, moviePlot } = movie;
    if (
      !movieId ||
      !movieName ||
      !genre ||
      !favorite ||
      !rating ||
      !moviePlot
    ) {
      throw new Error(MISSING_PAYLOAD.ERROR_CODE);
    }
    let movieExists = await Movies.findOne({ movieId: movieId });
    if (!movieExists) {
      const movie = new Movies({
        movieId,
        movieName,
        genre,
        favorite,
        rating,
        moviePlot,
      });
      await movie.save();
      return movie;
    } else {
      throw new Error(MOVIE_EXIST.ERROR_CODE);
    }
  } catch (e) {
    throw e;
  }
};

const updateMovie = async (movieId, data) => {
  try {
    if (!Number(movieId)) throw new Error(INVALID_PATH_PARAM.ERROR_CODE);
    if ("movieId" in data) {
      throw new Error(INVALID.ERROR_CODE);
    }
    const movieUpdated = await Movies.updateOne({ movieId: movieId }, data);
    if (movieUpdated.modifiedCount) {
      return movieUpdated;
    }
    throw new Error(MOVIE_NOT_FOUND.ERROR_CODE);
  } catch (e) {
    throw e;
  }
};

const deleteMovie = async (movieId) => {
  if (!Number(movieId)) throw new Error(INVALID_PATH_PARAM.ERROR_CODE);

  const deletedMovie = await Movies.deleteOne({ movieId: movieId });
  if (deletedMovie.deletedCount) {
    return deletedMovie;
  } else {
    throw new Error(MOVIE_NOT_FOUND.ERROR_CODE);
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  getMovieByGenre,
  createMovie,
  updateMovie,
  deleteMovie,
};
