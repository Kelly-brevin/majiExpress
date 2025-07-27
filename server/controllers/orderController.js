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
    res.status(200).json(Orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// admin: get all orders
