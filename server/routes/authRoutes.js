const express = require("express"); //this is the commonjs module pattern
//create a router instance
const router = express.Router();

//destructure to import login and register functions directly
const { login, register } = require("../controllers/authController");

//define routes
router.post("/register", register);
router.post("/login", login);
//export router to make it available to be mounted in server.js
module.exports = router;
