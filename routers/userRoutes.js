const express = require("express");
const { LOGIN, REGISTER } = require("../constants/path");
const {
  loginController,
  registerController,
} = require("../controllers/userController");

const router = express.Router();

router.post(LOGIN, loginController);

router.post(REGISTER, registerController);

module.exports = router;
