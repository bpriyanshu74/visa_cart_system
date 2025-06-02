const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server.js");
const Product = require("../models/Product.js");
const Cart = require("../models/Cart.js");

let testProduct1, testProduct2;

beforeEach(async () => {
  await Cart.deleteMany();
  await Product.deleteMany();

  testProduct1 = await Product.create({
    name: "Test Product 1",
    price: 10,
    category: "A",
  });
  testProduct2 = await Product.create({
    name: "Test Product 2",
    price: 20,
    category: "B",
  });

  await request(app)
    .post("/cart")
    .send({ productId: testProduct1._id })
    .set("x-session-id", "test123");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Cart API Tests", () => {
  it("Add product to cart", async () => {
    const res = await request(app)
      .post("/cart")
      .send({ productId: testProduct2._id })
      .set("x-session-id", "test123");

    expect(res.status).toBe(200);
    expect(res.body.items.length).toBe(2);
  });

  it("Prevent duplicate product in cart", async () => {
    const res = await request(app)
      .post("/cart")
      .send({ productId: testProduct1._id })
      .set("x-session-id", "test123");

    expect(res.status).toBe(200);
    expect(res.body.items.length).toBe(1); // Still 1 because no duplicate
  });

  it("Add another product and apply discount", async () => {
    const res = await request(app)
      .post("/cart")
      .send({ productId: testProduct2._id })
      .set("x-session-id", "test123");

    expect(res.status).toBe(200);
    expect(res.body.items.length).toBe(2);
    expect(res.body.discountApplied).toBe(10);
  });

  it("Get current cart", async () => {
    const res = await request(app)
      .get("/cart")
      .set("x-session-id", "test-session");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("items");
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  it("Remove product from cart", async () => {
    const cart = await Cart.findOne({ sessionId: "test123" });
    const itemIdToRemove = cart.items[0]._id;

    const res = await request(app)
      .delete(`/cart/${itemIdToRemove}`)
      .set("x-session-id", "test123");

    expect(res.status).toBe(200);
    expect(res.body.items.length).toBe(0);
  });
});
