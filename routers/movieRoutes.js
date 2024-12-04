const express = require("express");
const { LOGIN, REGISTER, MOVIES } = require("../constants/path");
const {
  getAllMoviesController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
  getMovieByIdController,
} = require("../controllers/moviesController");
const { authoriseUser } = require("../middleware/authoriseUser");

const router = express.Router();

router.get("/", (req, res, next) => {
  getAllMoviesController(req, res, next);
});

router.get("/:movieId", getMovieByIdController);

router.post("/", authoriseUser, createMovieController);

router.patch("/:movieId", authoriseUser, updateMovieController);

router.delete("/:movieId", deleteMovieController);

module.exports = router;
