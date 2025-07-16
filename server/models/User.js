const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: string,
      required: true,
    },

    email: {
      type: string,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: string,
      required: true,
      unique: true,
    },
    location: {
      type: string,
      required: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
 