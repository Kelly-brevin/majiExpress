const express = require("express");
const router = express.Router();

const {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/productController");

const adminAuth = require("../middlewares/adminAuth");

//public routes to get all aavailable products
