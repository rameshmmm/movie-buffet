const {
  STATUS_CODE,
  RESPONSE_MESSAGE,
  ERROR_MESSAGES,
} = require("../constants/constants");
const { loginUser, registerUser } = require("../services/userServices");
const { setResponse } = require("../utils/responseUtils");
const { MISSING_PAYLOAD, USER_NOT_FOUND, INCORRECT_PASSWORD, USER_EXIST } =
  ERROR_MESSAGES;

/**
 * @description calls logins services with req body passed
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
const loginController = async (req, res, next) => {
  try {
    const response = await loginUser(req?.body);
    if (response) {
      setResponse(
        res,
        STATUS_CODE.SUCCESS,
        true,
        false,
        RESPONSE_MESSAGE.LOGIN_SUCCESS_MESSAGE,
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
    } else if (error.message === USER_NOT_FOUND.ERROR_CODE) {
      setResponse(
        res,
        USER_NOT_FOUND.STATUS_CODE,
        false,
        true,
        USER_NOT_FOUND.MESSAGE,
        {}
      );
    } else if (error.message === INCORRECT_PASSWORD.ERROR_CODE) {
      setResponse(
        res,
        INCORRECT_PASSWORD.STATUS_CODE,
        false,
        true,
        INCORRECT_PASSWORD.MESSAGE,
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

/**
 * @description calls register services with req body passed
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
const registerController = async (req, res, next) => {
  try {
    const response = await registerUser(req?.body);
    if (response)
      setResponse(
        res,
        STATUS_CODE.CREATED,
        true,
        false,
        RESPONSE_MESSAGE.REGISTER_SUCCESS_MESSAGE,
        response
      );
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
    } else if (error.message === USER_EXIST.ERROR_CODE) {
      setResponse(
        res,
        USER_EXIST.STATUS_CODE,
        false,
        true,
        USER_EXIST.MESSAGE,
        ""
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

module.exports = { loginController, registerController };
