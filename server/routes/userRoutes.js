const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// /api/users
router.route("/").post(createUser).get(getUsers); //method chaining

// /api/users/:id
router.route("/:id").get(getUserById).put(updateUser);
module.exports = router;
