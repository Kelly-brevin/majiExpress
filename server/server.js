//load environment variables

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
//connect to mongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
