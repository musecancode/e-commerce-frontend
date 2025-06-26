import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import CartIcon from "./CartIcon";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { cart } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <header className="bg-primary text-white fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-[1440px] mx-auto px-6 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-normal flex items-center font-serif gap-2 h-full"
        >
          👜 ShopVerse
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-1 items-center h-full ml-auto mr-6 max-w-md"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 rounded-l px-4 py-2 text-black h-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-white px-4 py-2 rounded-r hover:bg-[#c97a40]/80 h-10 flex items-center justify-end"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z"
              />
            </svg>
          </button>
        </form>

        {/* Cart */}
        <div className="flex items-center gap-4 pl-4 pr-2 min-w-[80px] justify-end h-full">
          <Link to="/cart" className="relative group" title="Cart">
            <CartIcon className="w-9 h-9 text-white group-hover:text-yellow-400 transition-colors duration-300" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 translate-x-1/2 -translate-y-1/2 shadow">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
