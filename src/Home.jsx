import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Import Link
import Hero from "./Hero";
import CategoryLinks from "./CategoryLinks";
import ProductCard from "./ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Fetch featured products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="space-y-10">
      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} className="px-6 pt-4 flex gap-2">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded px-4 py-2 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>

        {/* 🛒 View Cart Button */}
        <Link
          to="/cart"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          🛒 View Cart
        </Link>
      </form>

      {/* 🖼️ Hero Section */}
      <Hero />

      {/* 🗂️ Category Links */}
      <CategoryLinks />

      {/* 🌟 Featured Products */}
      <section className="px-6">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
