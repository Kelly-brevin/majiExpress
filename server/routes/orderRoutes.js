const express = require("express");
const router = express.Router();

//destructure to bring in controller functions

const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

//create user authentication middleware
// const userAuth = require("../middlewares");

const adminAuth = require("../middlewares/adminAuth");

//user routes
router.post("/", createOrder);
router.get("/my-orders", getUserOrders);

//admin routes
router.get("/", adminAuth, getAllOrders);
router.put(":id", adminAuth, updateOrderStatus);

module.exports = router;
