// src/components/ProductList.jsx
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard";

const ProductList = ({ isCartOpen }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div
      className={`min-h-screen bg-gray-100 p-6 pt-24 md:pt-20 transition-all duration-300 ${
        isCartOpen ? "mr-[400px]" : "mr"
      }`}
    >
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 my-5">
        Our Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
