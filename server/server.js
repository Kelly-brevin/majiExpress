
const express = require("express");

//load environment variables
const dotenv = require("dotenv");

const mongoose = require("mongoose");
const connectDB = require("./config");
const cors = require("cors");

//load .env variables to process.env
dotenv.config();
const app = express();

//allow cross-origin resource sharing
app.use(cors());

//parse incoming requests
app.use(express.json());

const PORT = process.env.PORT || 5000;
//connect to mongoDB
connectDB();

//user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

//import the auth router
const authRoutes = require("./routes/authRoutes");
//mount the router. Technically you can skip the base path and use "/"
app.use("/api/auth", authRoutes);

// admin routes
//define the admin path
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admins", adminRoutes);

//product routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

//order routes
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
