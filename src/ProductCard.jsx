import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="w-[330px] h-[564px] rounded-md overflow-hidden flex flex-col bg-[#faf3ee]"
    >
      <div className="w-[330px] h-[425px] bg-[#faf3ee] flex items-center justify-center border border-gray-300">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-[95%] h-[95%] object-contain"
        />
      </div>

      <div className="px-4 pt-4">
        <h3 className="text-2xl font-normal text-gray-500">{product.title}</h3>
        <p className="text-normal text-gray-600 font-semibold mt-1">
          ${product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
