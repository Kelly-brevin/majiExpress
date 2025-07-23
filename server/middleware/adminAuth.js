//import jsonwebtoken library
const jwt = require("jsonwebtoken");

//import admin mongoose model
const Admin = require("../models/admin");

//async middleware function
const adminAuth = async (req, res, next) => {
  //retrieve authrorization header from the incoming request
  const authHeader = req.headers.authorization;

  //token must be set as : Authorization:Bearer <token>.Check for missing or malformed token
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "No token,authorization denied" });
  }
  //extract token part
  const token = authHeader.split(" ")[1];

  try {
    //verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //fetch admin from DB and attach to request
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({ message: "not authorized as admin" });
    }
    //attach admin info to request object
    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = adminAuth;
