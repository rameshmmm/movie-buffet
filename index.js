const mongoose = require("mongoose");
const express = require("express");
const userRoutes = require("./routers/userRoutes");
const movieRoutes = require("./routers/movieRoutes");

require("dotenv").config();


const app = express();

app.use(express.json());
app.use("/", userRoutes);
app.use("/movies", movieRoutes);



mongoose.connect('mongodb://localhost:27017/STEP').then(() => {
   console.log("Database Connected");

   app.listen(process.env.PORT, () => {
    console.log(`App is listening at port ${process.env.PORT}`);
  });
}) 
