const { Users } = require("../models/stepDbSchema");
const jwt = require("jsonwebtoken");
const {
  encryptPassword,
  decryptPassword,
} = require("../utils/dataEncryptionUtils");
const { ERROR_MESSAGES } = require("../constants/constants");
const { MISSING_PAYLOAD, USER_NOT_FOUND, INCORRECT_PASSWORD, USER_EXIST } =
  ERROR_MESSAGES;

/**
 * @description checks for valid username and password on success returns jwt token
 * @param {object} requestBody
 * @returns returns the token on successful login
 */
const loginUser = async (requestBody) => {
  try {
    if (!requestBody.password || !requestBody.userId) {
      throw new Error(MISSING_PAYLOAD.ERROR_CODE);
    }
    const users = await Users.findOne({ userId: requestBody.userId });
    if (!users) throw new Error(USER_NOT_FOUND.ERROR_CODE);
    if (users) {
      const { userId } = users;
      const valid = decryptPassword(requestBody.password, users.password);
      if (!valid) throw new Error(INCORRECT_PASSWORD.ERROR_CODE);
      if (valid) {
        const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
          expiresIn: "3000s",
        });
        return token;
      }
    }
  } catch (e) {
    throw e;
  }
};

/**
 * @description checks for valid username and password on success registers the user in user json file
 * @param {*} param - contains username password
 * @returns registered user
 */
const registerUser = async ({ userId, username, password }) => {
  // logic to registerif (!password || !username) {
  try {
    if (!userId || !password || !username) {
      throw new Error(MISSING_PAYLOAD.ERROR_CODE);
    }
    const userExists = await Users.findOne({ userId: userId });
    if (!userExists) {
      const hashedPassword = encryptPassword(password);
      const newUser = new Users({
        userId: userId,
        username: username,
        password: hashedPassword,
      });
      const result = await newUser.save();
      return result;
    } else {
      throw new Error(USER_EXIST.ERROR_CODE);
    }
  } catch (e) {
    throw e;
  }
};

module.exports = { loginUser, registerUser };
