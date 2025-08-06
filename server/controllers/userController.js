const User = require("../models/User");
const jwt = require("jsonwebtoken");
const user = require("../models/User");
const bcrypt = require("bcrypt");

//create a new user
exports.createUser = async (req, res) => {
  const { name, email, phoneNumber, password, location } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "user already exists" });

    //create new user absed on destructured values
    const user = await User.create({
      name,
      email,
      phoneNumber,
      password,
      location,
    });

    //auto login after register
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ token, user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error registering user", error: error.message });
  }
};

//get all users
exports.getUsers = async (_req, res) => {
  try {
    const users = await User.find(); //fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

//get a specific user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

//update user @route PUT /api/users/:id
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "invalid ID" });
  }
};

//login user and return token
exports.loginUser = async (req, res) => {
  //destructure to get login details
  const { email, phoneNumber } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    //sign jwt
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

//update logged-in user's ptofile

exports.updateOwnProfile = async (req, res) => {
  try {
    const updates = req.body;
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runvalidators: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "failed to update profile", error: error.message });
  }
};
