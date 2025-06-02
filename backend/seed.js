// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    name: "Visa Application Support",
    price: 100,
    category: "Application & Processing",
    desc: "End-to-end assistance for visa applications, including form filling, submission, and compliance checks for various countries.",
    image: "application_support.jpg",
  },
  {
    name: "Document Review & Prep",
    price: 150,
    category: "Application & Processing",
    desc: "Thorough review and organization of required documents, translations, and legalizations to ensure accuracy and compliance.",
    image: "docreview_prep.jpg",
  },
  {
    name: "Interview Preparation",
    price: 120,
    category: "Application & Processing",
    desc: "Mock interviews, tips, and preparation to build confidence for consulate and embassy visa interviews.",
    image: "interview_prep.jpg",
  },
  {
    name: "Business & Investor Advisory",
    price: 130,
    category: "Specialized Visa Solutions",
    desc: "Guidance on business, investor, and startup visa options, including business plans, investment strategies, and financial documentation.",
    image: "business.jpg",
  },
  {
    name: "Appeals & Refusals Handling",
    price: 130,
    category: "Specialized Visa Solutions",
    desc: "Support in case of visa refusals with appeals, reapplication strategies, and legal consultation for complex cases.",
    image: "appeals.jpg",
  },
  {
    name: "Relocation Assistance",
    price: 130,
    category: "Post-Visa & Relocation",
    desc: "Help with housing, travel arrangements, legal requirements, and cultural integration to ensure a smooth transition abroad.",
    image: "relocation.jpg",
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded");
    process.exit();
  })
  .catch((err) => console.error(err));
