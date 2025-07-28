// connect to mongoose schema
const product = require("../models/Product");

//create a new product(Admin)
exports.createProduct = async (req, res) => {
  try {
    //destructure the create product request
    const { size, price, available } = req.body;

    //create a new product based on the details of the request
    const newProduct = await product.create({ size, price, available });
    res.status(201).json(newProduct); //.json()parses ougoing data
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

//update product(Admin)
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID" });
  }
};

//delete product(Admin)
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Invalid product id" });
  }
};
