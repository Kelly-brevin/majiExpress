//bring in models to connect to the database
const Admin = require("../models/admin");
//bcrypt to hash passwords
const bcrypt = require("bcryptjs");
//jwt for session management
const jwt = require("jsonwebtoken");

//register the admin
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    //if admin does not exist,store details in variables
    const newAdmin = new Admin({ name, email, password });

    //save the new admin
    await newAdmin.save();
    res.status(201).json({ message: "admin registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering admin", error: error.message });
  }
};

//login the admin
exports.loginAdmin = async (req, res) => {
  //destructure the admin details from request
  const { email, password } = req.body;

  //find admin by details
  const admin = await Admin.findOne({ email });

  //error message if the admin is not found
  if (!admin) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  //if the admin exists, we compare the password to allow login
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or pssword" });
  }
};
