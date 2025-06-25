import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch, cart } = useCart();

  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);

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
    dispatch({ type: "ADD_ITEM", payload: product });
    setIsInCart(true);
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <section className="p-6 space-y-6">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="rounded-lg w-full object-cover"
        />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600">
            ${product.price}
          </p>

          {/* Conditional Button */}
          {isInCart ? (
            <button
              onClick={handleViewCart}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
            >
              View Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
