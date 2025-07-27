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
