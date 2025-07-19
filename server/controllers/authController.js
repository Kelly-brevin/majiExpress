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
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(201).json({
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      location: newUser.location,
    },
  });
} catch (err) {
  res.status(500).json({message:"server error",error:error.message})
}
