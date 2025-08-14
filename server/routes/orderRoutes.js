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
const userAuth = require("../middlewares/userAuth");
const adminAuth = require("../middlewares/adminAuth");

//user routes
router.post("/", userAuth, createOrder); //only logged in users can place orders
router.get("/my-orders", userAuth, getUserOrders);

//admin routes
router.get("/", adminAuth, getAllOrders);
router.put("/:id", adminAuth, updateOrderStatus);

module.exports = router;
