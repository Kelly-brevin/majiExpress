const jwt = require("jsonwebtoken");
const user = require("../models/User");

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  //check for bearer token
  
};
