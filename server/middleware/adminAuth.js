//import jsonwebtoken library
const jwt = require("jsonwebtoken");
//import admin mongoose model
const Admin = require("../models/admin");
//async middleware function
const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
};
