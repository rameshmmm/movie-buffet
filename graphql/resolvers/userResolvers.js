const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { Users } = require('../../models/stepDbSchema');
const { ERROR_MESSAGES } = require('../../constants/constants');
const { encryptPassword, decryptPassword } = require('../../utils/dataEncryptionUtils');
const { v4: uuidv4 } = require('uuid'); // Import UUID for userId generation

const userResolvers = {
  Mutation: {
    login: async (_, { input }) => {
      try {
        const { userId, password } = input;

        if (!userId || !password) {
          throw new GraphQLError(ERROR_MESSAGES.MISSING_PAYLOAD.MESSAGE);
        }

        const user = await Users.findOne({ userId });
        if (!user) {
          throw new GraphQLError(ERROR_MESSAGES.USER_NOT_FOUND.MESSAGE);
        }

        const isValidPassword = decryptPassword(password, user.password);
        if (!isValidPassword) {
          throw new GraphQLError(ERROR_MESSAGES.INCORRECT_PASSWORD.MESSAGE);
        }

        const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
          expiresIn: '3000s',
        });

        return {
          token,
          user: {
            userId: user.userId,
            username: user.username,
          },
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    // register: async (_, { input }) => {
    //   try {
    //     const { userId, username, password } = input;

    //     if (!userId || !username || !password) {
    //       throw new GraphQLError(ERROR_MESSAGES.MISSING_PAYLOAD.MESSAGE);
    //     }

    //     const existingUser = await Users.findOne({ userId });
    //     if (existingUser) {
    //       throw new GraphQLError(ERROR_MESSAGES.USER_EXIST.MESSAGE);
    //     }

    //     const hashedPassword = encryptPassword(password);
    //     const newUser = new Users({
    //       userId,
    //       username,
    //       password: hashedPassword,
    //     });

    //     await newUser.save();

    //     return {
    //       userId: newUser.userId,
    //       username: newUser.username,
    //     };
    //   } catch (error) {
    //     throw new GraphQLError(error.message);
    //   }
    // },

    register: async (_, { input }) => {
      try {
        const { username, password } = input;

        // Validate input
        if (!username || !password) {
          throw new GraphQLError(ERROR_MESSAGES.MISSING_PAYLOAD.MESSAGE);
        }

        // Check if username already exists
        const existingUser = await Users.findOne({ username });
        if (existingUser) {
          throw new GraphQLError(ERROR_MESSAGES.USER_EXIST.MESSAGE);
        }

        // Generate a unique userId
        const userId = uuidv4();

        // Encrypt the password
        const hashedPassword = encryptPassword(password);

        // Create and save the new user
        const newUser = new Users({
          userId,
          username,
          password: hashedPassword,
        });
        await newUser.save();

        console.log(newUser)
        // Return user details
        return {
          userId: newUser.userId,
          username: newUser.username,
        };
      } catch (error) {
        throw new GraphQLError(error.message || 'Failed to register user');
      }
    },
  },
};

module.exports = userResolvers;