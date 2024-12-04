const ERROR_MESSAGES = {
  MISSING_PAYLOAD: {
    MESSAGE: "Recheck missing payload",
    ERROR_CODE: "MISSING_PAYLOAD",
    STATUS_CODE: 400,
  },
  USER_NOT_FOUND: {
    MESSAGE: "Invalid credentials user not found",
    ERROR_CODE: "USER_NOT_FOUND",
    STATUS_CODE: 404,
  },
  INCORRECT_PASSWORD: {
    MESSAGE: "Invalid credentials password incorrect",
    ERROR_CODE: "USER_NOT_FOUND",
    STATUS_CODE: 404,
  },
  USER_EXIST: {
    MESSAGE: "User already exist",
    ERROR_CODE: "USER_EXIST",
    STATUS_CODE: 400,
  },
  INVALID_PATH_PARAM: {
    MESSAGE: "Invalid movie id",
    ERROR_CODE: "INVALID_PATH_PARAM",
    STATUS_CODE: 400,
  },
  MOVIE_NOT_FOUND: {
    MESSAGE: "Movie not found for the id",
    ERROR_CODE: "MOVIE_NOT_FOUND",
    STATUS_CODE: 404,
  },
  MISSING_PARAM: {
    MESSAGE: "Recheck missing param",
    ERROR_CODE: "MISSING_PARAM",
    STATUS_CODE: 400,
  },
  GENRE_MOVIE_NOT_FOUND: {
    MESSAGE: "Movie not found for the genre",
    ERROR_CODE: "MOVIE_NOT_FOUND",
    STATUS_CODE: 404,
  },
  MOVIE_EXIST: {
    MESSAGE: "Movie already exist",
    ERROR_CODE: "MOVIE_EXIST",
    STATUS_CODE: 400,
  },
  INVALID: {
    MESSAGE: "Id of movie can't be updated",
    ERROR_CODE: "INVALID",
    STATUS_CODE: 400,
  },
  UNAUTHORIZED_USER: {
    MESSAGE: "User is not authorized",
    ERROR_CODE: "UNAUTHORIZED_USER",
    STATUS_CODE: 401,
  },
  TOKEN_EXPIRED: {
    MESSAGE: "Session expired Login again",
    ERROR_CODE: "TOKEN_EXPIRED",
    STATUS_CODE: 401,
  },
};

const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 301,
};

const RESPONSE_MESSAGE = {
  LOGIN_SUCCESS_MESSAGE: "login successfull",
  REGISTER_SUCCESS_MESSAGE: "User registered successfully",
  MOVIE_FETCH_SUCCESSFULLY: "Movie fetched successfully",
  MOVIE_CREATED_SUCCESSFULLY: "Movie created successfully",
  MOVIE_UPDATED_SUCCESSFULLY: "Movie updated successfully",
  MOVIE_DELETED_SUCCESSFULLY: "Movie deleted successfully",
};

module.exports = { ERROR_MESSAGES, STATUS_CODE, RESPONSE_MESSAGE };
