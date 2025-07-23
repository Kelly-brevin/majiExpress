//import jsonwebtoken library
const jwt = require("jsonwebtoken");

//import admin mongoose model
const Admin = require("../models/admin");

//async middleware function
const adminAuth = async (req, res, next) => {
  //retrieve authrorization header from the incoming request
  const authHeader = req.headers.authorization;

  //token must be set as : Authorization:Bearer <token>
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "No token,authorization denied" });
  }
  //extract token part
  const token = authHeader.split(" ")[1];

  try {
  } catch (error) {}
};
