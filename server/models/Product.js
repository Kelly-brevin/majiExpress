const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      enum: ["1L", "5L", "10L", "20L"],
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
