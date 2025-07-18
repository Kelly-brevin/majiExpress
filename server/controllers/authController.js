const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register a new user
exports.register = async (req, res) => {
  const { name, email, phoneNumber, location, password } = req.body;
};
try {
  //check for existing useer
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "email already registered" });
  }
  const newUser = await User.create({
    name,
    email,
    phoneNumber,
    location,
    password,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
} catch (error) {}
