import { useState } from "react";
import {
  FaRegCreditCard,
  FaPaypal,
  FaUniversity,
  FaCheckCircle,
} from "react-icons/fa";

const PaymentForm = ({ onClose, onConfirm }) => {
  const [activeTab, setActiveTab] = useState("credit-card");
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmationVisible(true);
  };

  const handleOk = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
        {confirmationVisible ? (
          <div className="flex flex-col items-center text-center space-y-4">
            <FaCheckCircle className="w-16 h-16 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-800">
              Payment Successful!
            </h2>
            <p className="text-gray-600">
              Thank you for your purchase. Click OK to continue.
            </p>
            <button
              onClick={handleOk}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer"
            >
              OK
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Choose Payment Method
            </h2>

            <div className="flex justify-between mb-6">
              <button
                className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg cursor-pointer border transition ${
                  activeTab === "credit-card"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => handleTabChange("credit-card")}
              >
                <FaRegCreditCard size={20} />
                <span>Card</span>
              </button>
              <button
                className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg border cursor-pointer transition ${
                  activeTab === "paypal"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => handleTabChange("paypal")}
              >
                <FaPaypal size={20} />
                <span>PayPal</span>
              </button>
              <button
                className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg border cursor-pointer transition ${
                  activeTab === "net-banking"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => handleTabChange("net-banking")}
              >
                <FaUniversity size={20} />
                <span>Bank</span>
              </button>
            </div>

            {activeTab === "credit-card" && (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Card Owner
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Expiry (MM/YY)
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="MM"
                        required
                        className="w-1/2 p-2 rounded-lg border focus:ring-2 focus:ring-blue-300"
                      />
                      <input
                        type="number"
                        placeholder="YY"
                        required
                        className="w-1/2 p-2 rounded-lg border focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      required
                      className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
                >
                  Confirm Payment
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full mt-2 text-sm text-gray-500 hover:underline cursor-pointer"
                >
                  Cancel
                </button>
              </form>
            )}

            {activeTab === "paypal" && (
              <div className="space-y-4 text-left">
                <p className="text-sm text-gray-700">
                  Select PayPal account type:
                </p>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="paypalType" defaultChecked />
                    <span>Domestic</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="paypalType" />
                    <span>International</span>
                  </label>
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
                  Log into PayPal
                </button>
              </div>
            )}

            {activeTab === "net-banking" && (
              <div className="space-y-4 text-left">
                <label className="block text-sm font-medium text-gray-700">
                  Select your Bank
                </label>
                <select className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-300">
                  <option>--Please select your Bank--</option>
                  <option>Bank of America</option>
                  <option>Chase Bank</option>
                  <option>Wells Fargo</option>
                </select>
                <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition cursor-pointer">
                  Proceed Payment
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
