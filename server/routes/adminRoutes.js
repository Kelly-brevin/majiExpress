//bring in express
const express = require("express");

//bring in the router through express
const router = express.Router();

//bring in the controller,destructure to bring in the functions
const { registerAdmin, loginAdmin } = require("../controllers/adminController");

//define routes
router.post("/", registerAdmin);
router.post("/", loginAdmin);

module.exports = router;
