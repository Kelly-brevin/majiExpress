//import mongoose library
const mongoose = require("mongoose");

//mongoose.Schema() is a constructor
const productSchema = new mongoose.Schema(
  {
    size: {
      type: String, //capitalized 'String' is a js constructor (not string literal)
      required: true,
      enum: ["1L", "5L", "10L", "20L"], //enum restricts the value of 'size'to one of the specified strings
    },
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
