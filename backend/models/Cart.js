// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  sessionId: String, // Mock session/user ID
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  discountApplied: { type: Number, default: 0 }, // Percentage (e.g., 10 for 10%)
});

module.exports = mongoose.model("Cart", cartSchema);
