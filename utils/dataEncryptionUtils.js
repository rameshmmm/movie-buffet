const bcrypt = require("bcryptjs");
require("dotenv").config();

const SALT = Number(process.env.SALT);

const encryptPassword = (password) => {
  try {
    const hashedPassword = bcrypt.hashSync(password, SALT);
    return hashedPassword;
  } catch (err) {
    return err;
  }
};

const decryptPassword = (password, hashedPasword) => {
  try {
    const result = bcrypt.compareSync(password, hashedPasword);
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = { encryptPassword, decryptPassword };
