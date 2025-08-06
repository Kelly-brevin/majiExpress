const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  updateOwnProfile,
} = require("../controllers/userController");

const userAuth = require("../middlewares/userAuth");

router.post("/login", loginUser);

router.put("/profile", userAuth, updateOwnProfile);
//bring in middleware
const authMiddleware = require("../middlewares/adminAuth");

//restrict access to get all users
router.get("/", authMiddleware, getUsers);
// /api/users
router.route("/").post(createUser); //method chaining

// /api/users/:id
router.route("/:id").get(getUserById).put(updateUser);

module.exports = router;
