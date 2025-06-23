import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="border rounded-lg p-4 hover:shadow-md transition"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
      <p className="text-gray-600 text-sm">${product.price}</p>
    </Link>
  );
};

export default ProductCard;
