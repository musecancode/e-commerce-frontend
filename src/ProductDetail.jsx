import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch, cart } = useCart();

  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        const alreadyInCart = cart.some((item) => item.id === data.id);
        setIsInCart(alreadyInCart);
      })
      .catch((err) => console.error("Product fetch failed", err));
  }, [id, cart]);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: { ...product, quantity } });
    setIsInCart(true);
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <section className="p-8 min-h-screen">
      <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
        {/* Image */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="rounded-lg w-full object-cover bg-[#faf3ee]"
          loading="lazy"
        />

        {/* Info Section */}
        <div className="space-y-6">
          <h1 className="text-5xl font-serif font-light text-primary">
            {product.title}
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed">
            {product.description}
          </p>

          <p className="text-3xl font-normal text-gray-600">
            Price : ${product.price}
          </p>

          {/* Availability */}
          <p className="text-2xl font-normal text-gray-600">
            Availability:{" "}
            <span
              className={product.stock > 0 ? "text-green-600" : "text-red-600"}
            >
              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </span>
          </p>

          {/* Quantity */}
          <div className="flex items-center space-x-4">
            <span className="font-normal text-3xl text-gray-600">
              Quantity:
            </span>
            <div className="flex items-center border rounded overflow-hidden">
              <button
                onClick={decrementQuantity}
                className="px-3 py-1 text-lg bg-primary hover:bg-[#c97a40]/80"
              >
                −
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="px-3 py-1 text-lg bg-primary hover:bg-[#c97a40]/80"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart / View Cart */}
          <div className="space-x-4 pt-4">
            {isInCart ? (
              <button
                onClick={handleViewCart}
                className="bg-primary text-white px-6 py-3 rounded hover:bg-[#c97a40]/80 transition"
              >
                View Cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-primary text-white px-6 py-3 rounded hover:bg-[#c97a40]/70 transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
