// connect to mongoose schema
const Product = require("../models/Product");
const product = require("../models/Product");

//create a new product(Admin)
exports.createProduct = async (req, res) => {
  try {
    //destructure the create product request
    const { size, price, available } = req.body;

    //create a new product based on the details of the request
    const newProduct = await product.create({ size, price, available });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get all available products
exports.getProducts = async (_req, res) => {
  try {
    const products = await product.find({ available: true });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch products" });
  }
};
