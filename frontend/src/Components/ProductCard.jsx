import { useCart } from "../context/CartContext";

const ProductCard = ({ product, addToCart }) => {
  const { cart } = useCart();
  const isInCart = cart?.items.some((item) => item.product._id === product._id);
  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl shadow-md p-6 hover:scale-105 transition-transform duration-300">
      <div>
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          className="w-full h-40 md:h-48 lg:h-56 object-cover rounded-xl mb-4"
        />
        <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <p className="text-gray-600 mb-4">{product.desc}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-semibold text-blue-500">${product.price}</p>
        <button
          onClick={() => addToCart(product._id)}
          disabled={isInCart}
          className={`px-4 py-2 rounded-md text-white transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-105 ${
            isInCart
              ? "bg-green-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isInCart ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
