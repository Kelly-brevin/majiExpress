const jwt = require("jsonwebtoken");
const user = require("../models/User");

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  //check for bearer token
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "No token,authorization denied" });
  }
  const token = authHeader.split(" ")[1];
  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {}
};
