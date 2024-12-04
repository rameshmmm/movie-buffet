const jwt = require("jsonwebtoken");
const { STATUS_CODE, ERROR_MESSAGES } = require("../constants/constants");
const { UNAUTHORIZED_USER, TOKEN_EXPIRED } = ERROR_MESSAGES;
const { setResponse } = require("../utils/responseUtils");

/**
 * @description this checks if the user is authorized and assign user to req
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
const authoriseUser = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (!token)
    return setResponse(
      res,
      STATUS_CODE.UNAUTHORIZED,
      false,
      true,
      UNAUTHORIZED_USER.LOGIN_SUCCESS_MESSAGE,
      {}
    );
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return setResponse(
        res,
        STATUS_CODE.UNAUTHORIZED,
        false,
        true,
        TOKEN_EXPIRED.MESSAGE,
        {}
      );
    }
    req.user = user;
    next();
  });
};

module.exports = { authoriseUser };
