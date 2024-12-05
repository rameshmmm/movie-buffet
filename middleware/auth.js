const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
const { ERROR_MESSAGES } = require('../constants/constants');

const getUser = (token) => {
  if (!token) return null;

  try {
    const bearer = token.split(' ')[1];
    if (!bearer) return null;

    const decoded = jwt.verify(bearer, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new GraphQLError(ERROR_MESSAGES.TOKEN_EXPIRED.MESSAGE);
  }
};

module.exports = { getUser };