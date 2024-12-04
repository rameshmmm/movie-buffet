const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieByGenre,
} = require("../services/movieServices");
const {
  STATUS_CODE,
  RESPONSE_MESSAGE,
  ERROR_MESSAGES,
} = require("../constants/constants");
const { setResponse } = require("../utils/responseUtils");
const {
  INVALID_PATH_PARAM,
  MOVIE_NOT_FOUND,
  GENRE_MOVIE_NOT_FOUND,
  MOVIE_EXIST,
  INVALID,
  MISSING_PAYLOAD,
  USER_EXIST,
} = ERROR_MESSAGES;

const getAllMoviesController = async (req, res, next) => {
  try {
    let response;
    if (req?.query?.genre) {
      response = await getMovieByGenre(req?.query?.genre);
    } else {
      response = await getAllMovies();
    }
    if (response) {
      setResponse(
        res,
        STATUS_CODE.SUCCESS,
        true,
        false,
        RESPONSE_MESSAGE.MOVIE_FETCH_SUCCESSFULLY,
        response
      );
    }
  } catch (error) {
    if (error.message === GENRE_MOVIE_NOT_FOUND.ERROR_CODE) {
      setResponse(
        res,
        GENRE_MOVIE_NOT_FOUND.STATUS_CODE,
        false,
        true,
        GENRE_MOVIE_NOT_FOUND.MESSAGE,
        {}
      );
    } else {
      setResponse(
        res,
        STATUS_CODE.INTERNAL_SERVER_ERROR,
        false,
        true,
        error?.message,
        {}
      );
    }
  }
};

const getMovieByIdController = async (req, res, next) => {
  try {
    const response = await getMovieById(req?.params?.movieId);
    if (response) {
      setResponse(
        res,
        STATUS_CODE.SUCCESS,
        true,
        false,
        RESPONSE_MESSAGE.MOVIE_FETCH_SUCCESSFULLY,
        response
      );
    }
  } catch (error) {
    if (error.message === MOVIE_NOT_FOUND.ERROR_CODE) {
      setResponse(
        res,
        MOVIE_NOT_FOUND.STATUS_CODE,
        false,
        true,
        MOVIE_NOT_FOUND.MESSAGE,
        {}
      );
    } else if (error.message === USER_EXIST.ERROR_CODE) {
      setResponse(
        res,
        USER_EXIST.STATUS_CODE,
        false,
        true,
        USER_EXIST.MESSAGE,
        {}
      );
    } else {
      setResponse(
        res,
        STATUS_CODE.INTERNAL_SERVER_ERROR,
        false,
        true,
        error?.message,
        {}
      );
    }
  }
};

const createMovieController = async (req, res, next) => {
  try {
    const response = await createMovie(req?.body);
    if (response) {
      setResponse(
        res,
        STATUS_CODE.CREATED,
        true,
        false,
        RESPONSE_MESSAGE.MOVIE_CREATED_SUCCESSFULLY,
        response
      );
    }
  } catch (error) {
    if (error.message === MISSING_PAYLOAD.ERROR_CODE) {
      setResponse(
        res,
        MISSING_PAYLOAD.STATUS_CODE,
        false,
        true,
        MISSING_PAYLOAD.MESSAGE,
        {}
      );
    } else if (error.message === MOVIE_EXIST.ERROR_CODE) {
      setResponse(
        res,
        MOVIE_EXIST.STATUS_CODE,
        false,
        true,
        MOVIE_EXIST.MESSAGE,
        {}
      );
    } else {
      setResponse(
        res,
        STATUS_CODE.INTERNAL_SERVER_ERROR,
        false,
        true,
        error?.message,
        {}
      );
    }
  }
};
const updateMovieController = async (req, res, next) => {
  try {
    const response = await updateMovie(req?.params?.movieId, req?.body);
    if (response) {
      setResponse(
        res,
        STATUS_CODE.SUCCESS,
        true,
        false,
        RESPONSE_MESSAGE.MOVIE_UPDATED_SUCCESSFULLY,
        response
      );
    }
  } catch (error) {
    if (error.message === INVALID_PATH_PARAM.ERROR_CODE) {
      setResponse(
        res,
        INVALID_PATH_PARAM.STATUS_CODE,
        false,
        true,
        INVALID_PATH_PARAM.MESSAGE,
        {}
      );
    } else if (error.message === INVALID.ERROR_CODE) {
      setResponse(res, INVALID.STATUS_CODE, false, true, INVALID.MESSAGE, {});
    } else if (error.message === MOVIE_NOT_FOUND.ERROR_CODE) {
      setResponse(
        res,
        MOVIE_NOT_FOUND.STATUS_CODE,
        false,
        true,
        MOVIE_NOT_FOUND.MESSAGE,
        {}
      );
    } else {
      setResponse(
        res,
        STATUS_CODE.INTERNAL_SERVER_ERROR,
        false,
        true,
        error?.message,
        {}
      );
    }
  }
};
const deleteMovieController = async (req, res, next) => {
  try {
    const response = await deleteMovie(req?.params?.movieId);
    if (response) {
      setResponse(
        res,
        STATUS_CODE.NO_CONTENT,
        true,
        false,
        RESPONSE_MESSAGE.MOVIE_DELETED_SUCCESSFULLY,
        response
      );
    }
  } catch (error) {
    if (error.message === INVALID_PATH_PARAM.ERROR_CODE) {
      setResponse(
        res,
        INVALID_PATH_PARAM.STATUS_CODE,
        false,
        true,
        INVALID_PATH_PARAM.MESSAGE,
        {}
      );
    } else if (error.message === MOVIE_NOT_FOUND.ERROR_CODE) {
      setResponse(
        res,
        MOVIE_NOT_FOUND.STATUS_CODE,
        false,
        true,
        MOVIE_NOT_FOUND.MESSAGE,
        {}
      );
    } else {
      setResponse(
        res,
        STATUS_CODE.INTERNAL_SERVER_ERROR,
        false,
        true,
        error?.message,
        {}
      );
    }
  }
};

module.exports = {
  getAllMoviesController,
  getMovieByIdController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
};
