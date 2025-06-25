import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("q")?.toLowerCase() || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm)
  );

  return (
    <section className="px-6 py-4">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for: "{searchTerm}"
      </h2>

      {filtered.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchResults;
