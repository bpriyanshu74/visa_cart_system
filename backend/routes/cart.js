const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const mockSessionId = "user123"; // For simplicity

// Helper: Apply discount if multiple unique product categories are in the cart
const checkForBundleDiscount = (items) => {
  const categories = items
    .map((item) => item.product?.category)
    .filter(Boolean);
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories.length > 1 ? 10 : 0; // 10% discount if bundle found
};

// Helper: Refresh discount after any cart modification
const applyDiscount = async (cart) => {
  await cart.populate("items.product");
  cart.discountApplied = checkForBundleDiscount(cart.items);
  await cart.save();
  return cart;
};

// Add item in cart

router.post("/", async (req, res) => {
  try {
    const { productId } = req.body; // no quantity needed
    const sessionId = req.headers["x-session-id"] || mockSessionId;

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = new Cart({
        sessionId,
        items: [],
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      console.error("Product not found for ID:", productId);
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if product already exists in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      // Product already in cart, do nothing
      console.log(`Product ${productId} already in cart, not adding again.`);
    } else {
      // Add product only if not present
      cart.items.push({ product: productId, quantity: 1 });
      console.log(`Added new product ${productId} to cart`);
    }

    cart = await applyDiscount(cart);
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error("Error adding product to cart:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

// Get current cart
router.get("/", async (req, res) => {
  try {
    let cart = await Cart.findOne({ sessionId: mockSessionId }).populate(
      "items.product"
    );

    if (!cart) {
      return res.json({ items: [], discountApplied: 0 });
    }

    cart.items = cart.items.filter((item) => item.product !== null);
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error("Error in GET /cart:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

// Remove item from cart
router.delete("/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    let cart = await Cart.findOne({
      sessionId: req.headers["x-session-id"] || mockSessionId,
    });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    cart = await applyDiscount(cart);
    res.json(cart);
  } catch (err) {
    console.error("Error deleting item from cart:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
