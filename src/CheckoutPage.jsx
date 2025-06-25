import { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.address.trim()) newErrors.address = "Address is required.";
    if (!form.city.trim()) newErrors.city = "City is required.";
    if (!form.zip.trim() || !/^\d{5,6}$/.test(form.zip))
      newErrors.zip = "Valid ZIP is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch({ type: "CLEAR_CART" }); // 🛒 Clear cart
      navigate("/order-confirmation"); // ✅ Go to order confirmation
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border px-4 py-2 rounded"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          className="w-full border px-4 py-2 rounded"
          value={form.address}
          onChange={handleChange}
        />
        {errors.address && (
          <p className="text-red-600 text-sm">{errors.address}</p>
        )}

        <input
          type="text"
          name="city"
          placeholder="City"
          className="w-full border px-4 py-2 rounded"
          value={form.city}
          onChange={handleChange}
        />
        {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}

        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          className="w-full border px-4 py-2 rounded"
          value={form.zip}
          onChange={handleChange}
        />
        {errors.zip && <p className="text-red-600 text-sm">{errors.zip}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
