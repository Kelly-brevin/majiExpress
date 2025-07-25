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
router.get("/", getProducts);

//admin-only routes
router.post("/", adminAuth, createProduct);
router.post("/", adminAuth, updateProduct);
router.delete("/", adminAuth, deleteProduct);

module.exports = router;
