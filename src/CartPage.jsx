import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  return (
    <div
      className={`max-w-7xl mx-auto px-6 ${
        cart.length === 0 ? "py-0" : "py-16"
      } flex flex-col lg:flex-row gap-10`}
    >
      {/* Left Section */}
      <div className="flex-1">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-[80vh] space-y-6">
            {/* Empty Cart Image */}
            <img
              src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0="
              alt="Empty Cart"
              className="w-80 md:w-96 opacity-90 transition duration-300"
            />

            <p className="text-xl text-gray-700 font-medium">
              Your cart feels light! Add some items to it.
            </p>

            <button
              onClick={() => navigate("/")}
              className="bg-[#27314c] hover:bg-[#c97a40] text-white px-6 py-3 rounded text-lg transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-serif text-[#27314c] mb-8">
              Products
            </h2>

            {cart.map((item) => (
              <div
                key={item.id}
                className="border flex flex-col md:flex-row mb-6 relative rounded"
              >
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 left-2 text-[#27314c] font-bold text-xl"
                >
                  ×
                </button>

                <div className="bg-[#fef4ee] p-4 flex items-center justify-center w-full md:w-1/4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-44 object-contain"
                  />
                </div>

                <div className="p-4 flex-1 md:w-3/4">
                  <h3 className="text-2xl font-serif text-[#27314c] mb-1">
                    {item.title}
                  </h3>

                  <p
                    className={`${
                      item.stock > 0 ? "text-green-600" : "text-red-500"
                    } font-medium mb-2`}
                  >
                    {item.stock > 0 ? "Availability: In stock" : "Out of stock"}
                  </p>

                  <p className="text-lg font-semibold text-[#27314c] mb-2">
                    ₹ {item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="bg-[#27314c] text-white px-3 text-lg"
                    >
                      −
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={item.quantity}
                      className="border w-10 text-center"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="bg-[#27314c] text-white px-3 text-lg"
                    >
                      +
                    </button>
                  </div>

                  <p className="mt-3 text-lg font-semibold text-[#27314c]">
                    Total : ₹ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Order Summary */}
      {cart.length > 0 && (
        <div className="w-full lg:w-1/3">
          <h2 className="text-4xl font-serif text-[#27314c] mb-4">
            Order Summary
          </h2>
          <p className="text-lg font-semibold text-[#27314c] mb-4">
            Subtotal : ₹ {total.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Shipping, taxes, and discounts will be calculated at checkout.
          </p>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-[#27314c] hover:bg-[#c97a40]/70 text-white py-3 text-lg font-medium mb-4 transition"
          >
            PROCEED TO CHECKOUT
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-[#27314c] hover:bg-[#c97a40]/80 py-3 text-lg text-white font-medium transition"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
