import { useCart } from "../context/CartContext";
import { useState } from "react";
import PaymentForm from "./PaymentForm";
import { FaTimes } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";

const CartDrawer = ({ onClose }) => {
  const { cart, removeFromCart, checkout } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    checkout();
    setShowPayment(false);
  };

  const handleCancelPayment = () => {
    setShowPayment(false);
  };

  const subtotal =
    cart?.items?.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0) || 0;

  const discount = cart?.discountApplied || 0;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  return (
    <>
      // Cart Drawer
      <div
        className={`fixed top-0 right-0 w-100 h-full bg-white shadow-lg p-4 z-50 flex flex-col ${
          showPayment ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="flex items-center justify-between p-4 ">
          <h2 className="flex text-lg font-semibold">
            {" "}
            <FaShoppingBag className="mr-2 h-6 w-6 text-primary" /> Your Cart
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
            aria-label="Close cart"
            title="Close cart"
          >
            <FaTimes size={18} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto space-y-4">
          {cart?.items?.length > 0 ? (
            cart.items.map((item) => (
              <div
                key={item._id}
                className="p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Item name */}
                <p className="font-semibold text-gray-800 text-lg mb-2">
                  {item.product?.name || "Unnamed product"}
                </p>
                {/* Second row: price left, controls right */}
                <div className="flex items-center justify-between">
                  {/* Price */}
                  <p className="text-gray-600">
                    Price: ${item.product?.price?.toFixed(2) || "0.00"}
                  </p>

                  {/* Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition cursor-pointer"
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-6">
              Your cart is empty.
            </p>
          )}
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="space-y-3 text-gray-700">
          <p className="text-base">
            Subtotal:{" "}
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </p>

          {discount > 0 && (
            <p className="text-green-600 font-semibold text-sm">
              Bundle Discount ({discount}%): -${discountAmount.toFixed(2)}
            </p>
          )}

          <p className="text-xl font-bold text-gray-900">
            Total: ${total.toFixed(2)}
          </p>
        </div>

        {cart?.items?.length > 0 && (
          <button
            onClick={() => setShowPayment(true)}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 transition-colors rounded-lg py-3 text-white font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
            aria-label="Proceed to Checkout"
          >
            Checkout
          </button>
        )}
      </div>
      {showPayment && (
        <PaymentForm
          onClose={() => setShowPayment(false)}
          onConfirm={() => {
            checkout();
            setShowPayment(false);
          }}
        />
      )}
    </>
  );
};

export default CartDrawer;
