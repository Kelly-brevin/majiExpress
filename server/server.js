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

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

//import the auth router
const authRoutes = require("./routes/authRoutes");
//mount the router. Technically you can skip the base path and use "/"
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
