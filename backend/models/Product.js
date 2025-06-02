// modelling the product
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  desc: String,
  image: String,
});

module.exports = mongoose.model("Product", productSchema);
