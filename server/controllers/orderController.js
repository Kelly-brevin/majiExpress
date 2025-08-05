const Order = require("../models/Order");

//place a new order(user)
exports.createOrder = async (req, res) => {
  try {
    // destructure incoming request to get items and location
    const { items, location } = req.body;

    const userId = req.user.id; //comes from auth middleware

    const newOrder = await Order.create({
      user: userId,
      items,
      location,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create order", error: error.message });
  }
};

//get users's own orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// admin: get all orders
exports.getAllOrders = async (_req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all orders" });
  }
};

//admin: update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "Invalid order ID" });
  }
};

//remember to test in postman, login and users.
//go over the controllers
