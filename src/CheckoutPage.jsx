import { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    country: "India",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Rajasthan",
    pin: "",
  });

  const [errors, setErrors] = useState({});

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.address.trim()) newErrors.address = "Address is required.";
    if (!form.city.trim()) newErrors.city = "City is required.";
    if (!form.pin.trim() || !/^\d{5,6}$/.test(form.pin))
      newErrors.pin = "Valid PIN is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch({ type: "CLEAR_CART" });
      navigate("/order-confirmation");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Form */}
      <div className="flex-1 px-8 py-12 space-y-8">
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <input
          type="text"
          placeholder="Email or mobile phone number"
          className="w-full border border-gray-300 px-4 py-3 rounded mb-6 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
        />

        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-3xl font-semibold mb-4">Delivery</h2>

          {/* Country */}
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded outline-none focus:border-[#c97a40]focus:ring-2 focus:ring-yellow-400 transition"
          >
            <option>India</option>
            <option>USA</option>
            <option>Canada</option>
          </select>

          {/* First & Last Name */}
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              className="w-1/2 border border-gray-300 px-4 py-3 rounded outline-none focus:border-[#c97a40] focus:ring-2 focus:ring-yellow-400 transition"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              className="w-1/2 border border-gray-300 px-4 py-3 rounded outline-none focus:border-[#c97a40] focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>
          {errors.firstName && (
            <p className="text-red-600 text-sm">{errors.firstName}</p>
          )}

          {/* Address */}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded outline-none focus:border-[#c97a40] focus:ring-2 focus:ring-yellow-400 transition"
          />
          {errors.address && (
            <p className="text-red-600 text-sm">{errors.address}</p>
          )}

          {/* Apartment */}
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, suite, etc. (optional)"
            value={form.apartment}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded outline-none focus:border-[#c97a40] focus:ring-1 focus:ring-yellow-400 transition"
          />

          {/* City, State, PIN */}
          <div className="flex gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-1/3 border border-gray-300 px-4 py-3 rounded outline-none focus:border-[#c97a40] focus:ring-1 focus:ring-yellow-400 transition"
            />
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-1/3 border border-gray-300 px-4 py-3 rounded outline-none focus:border-[#c97a40]  transition"
            >
              <option>Rajasthan</option>
              <option>Delhi</option>
              <option>Maharashtra</option>
              <option>UP</option>
            </select>
            <input
              type="text"
              name="pin"
              placeholder="PIN code"
              value={form.pin}
              onChange={handleChange}
              className="w-1/3 border border-gray-300 px-4 py-3 rounded outline-none focus:border-[#c97a40]  transition"
            />
          </div>
          {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
          {errors.pin && <p className="text-red-600 text-sm">{errors.pin}</p>}

          <button
            type="submit"
            className="w-full bg-[#27314c] text-white py-3 rounded text-lg hover:bg-[#c97a40] transition"
          >
            Place Order
          </button>
        </form>
      </div>

      {/*  Order Summary */}
      <div className="lg:w-1/2 bg-gray-100 p-8 space-y-6">
        <h2 className="text-3xl font-serif text-[#27314c]">Order Summary</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative bg-[#fef4ee] w-16 h-16 flex items-center justify-center rounded">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-12 h-12 object-contain"
                />
                <span className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs px-2 rounded-full">
                  {item.quantity}
                </span>
              </div>
              <div>
                <p className="text-[#27314c] font-medium">{item.title}</p>
                <p className="text-gray-600 text-sm">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2 text-[#27314c]">
          <div className="flex justify-between text-lg">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span className="text-gray-500">Enter shipping address</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Estimated tax</span>
            <span>${(total * 0.18).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-2xl font-bold pt-4">
            <span>Total</span>
            <span>${(total + total * 0.18).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
