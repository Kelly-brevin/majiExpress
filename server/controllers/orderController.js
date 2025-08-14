const Order = require("../models/Order");
const Product = require("../models/Product");

//place a new order(user)
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    //calculate total price
    let totalPrice = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: `Product not found` });
      }
      totalPrice += product.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user.id, //from auth middleware
      items,
      totalPrice,
    });
    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to place order", error: error.message });
  }
};

//get users's own orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("items.product")
      .sort({ createdAt: -1 }); //latest first
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
    const { status } = req.body;
    const allowedStatuses = ["pending", "processing", "deliverd", "cancelled"];

    //validate status
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const order = await order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ message: `Order status updated to ${status}`, order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};

//remember to test in postman, login and users.
//go over the controllers
