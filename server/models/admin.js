// const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
//hash password before saving
adminSchema.pre("save", async function (next) {
  //when password is unmodified
  if (!this.isModified("password")) return next();

  //define the salt. remember to alwayys use await here
  const salt = await bcrypt.genSalt(10);

  //hash the password
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
module.exports = mongoose.model("Admin", adminSchema);
