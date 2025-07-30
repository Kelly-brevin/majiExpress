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

    //find user by decoded ID
    const user = await user.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    req.user = user; //attach user to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
module.exports = userAuth;
