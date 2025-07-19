const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register a new user
exports.register = async (req, res) => {
  const { name, email, phoneNumber, location, password } = req.body;
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
    res.status(500).json({ message: "server error", error: err.message });
  }
};

//login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        location: user.location,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
