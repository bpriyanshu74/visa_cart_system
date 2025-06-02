import { useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import ProductList from "./Components/ProductList";
import CartDrawer from "./Components/CartDrawer";
import ChatWidget from "./Components/ChatWidget";
import logo from "./assets/logo.png";
import Footer from "./Components/Footer";
import { FaShoppingCart } from "react-icons/fa";

function CartButton({ onClick }) {
  const { cart } = useCart();

  const cartCount = cart?.items
    ? cart.items.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-105"
    >
      <FaShoppingCart className="text-lg" />
      Cart
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white-100 bg-black rounded-xl">
          {cartCount}
        </span>
      )}
    </button>
  );
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="fixed top-0 left-0 right-0 z-50 p-4 px-11 flex justify-between items-center bg-white shadow-md">
          <a href="https://www.y-axis.com/">
            <img src={logo} alt="Visa Services Logo" className="h-10" />
          </a>
          <CartButton onClick={() => setIsCartOpen(!isCartOpen)} />
        </header>
        <main className="p-4">
          <ProductList isCartOpen={isCartOpen} />
        </main>
        {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
        <ChatWidget />
        <Footer isCartOpen={isCartOpen} />
      </div>
    </CartProvider>
  );
}

export default App;
