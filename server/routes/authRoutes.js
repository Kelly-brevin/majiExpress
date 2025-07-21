const express = require("express");
const router = router();
const { login, register } = require("../controllers/authController");
router.post("/register", register);
router.post("/login", login);
module.exports = router;
