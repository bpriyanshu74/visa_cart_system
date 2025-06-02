// routes/checkout.js
const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

const mockSessionId = "user123";

router.post("/", async (req, res) => {
  const cart = await Cart.findOne({ sessionId: mockSessionId }).populate(
    "items.product"
  );
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount = cart.discountApplied
    ? (total * cart.discountApplied) / 100
    : 0;
  const finalAmount = total - discount;

  // Mock payment/checkout
  await Cart.deleteOne({ _id: cart._id });

  res.json({
    message: "Checkout successful",
    total,
    discount: discount.toFixed(2),
    finalAmount: finalAmount.toFixed(2),
  });
});

module.exports = router;
