import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();
const sessionId = "user123";

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const API_BASE = "http://localhost:3000"; // Backend URL

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_BASE}/cart`, {
        headers: { "x-session-id": sessionId },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post(
        `${API_BASE}/cart`,
        { productId, quantity },
        { headers: { "x-session-id": sessionId } }
      );
      fetchCart();
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`${API_BASE}/cart/${itemId}`, {
        headers: { "x-session-id": sessionId },
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };

  const checkout = async () => {
    try {
      const res = await axios.post(
        `${API_BASE}/checkout`,
        {}, // Usually post body can be empty or some data
        {
          headers: { "x-session-id": sessionId },
        }
      );
      setCart(null);
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};
