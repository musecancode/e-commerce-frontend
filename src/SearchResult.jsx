import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "./ProductContext";
import ProductCard from "./ProductCard";

const SearchResults = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q")?.toLowerCase() || "";
  const { products } = useProducts();

  const [sortOption, setSortOption] = useState("default");
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  const [view, setView] = useState("grid");
  const [availability, setAvailability] = useState("all");

  const filteredProducts = products
    .filter((product) => {
      const titleMatch = product.title?.toLowerCase().includes(query);
      const categoryMatch = product.category?.toLowerCase().includes(query);
      const brandMatch = product.brand?.toLowerCase().includes(query);
      return titleMatch || categoryMatch || brandMatch;
    })
    .filter((product) => {
      const inPriceRange =
        product.price >= priceFilter.min && product.price <= priceFilter.max;
      const inAvailability =
        availability === "all" ||
        (availability === "in" && product.stock > 0) ||
        (availability === "out" && product.stock === 0);
      return inPriceRange && inAvailability;
    })
    .sort((a, b) => {
      if (sortOption === "lowToHigh") return a.price - b.price;
      if (sortOption === "highToLow") return b.price - a.price;
      return 0;
    });

  const inStockCount = filteredProducts.filter((p) => p.stock > 0).length;
  const outOfStockCount = filteredProducts.filter((p) => p.stock === 0).length;

  return (
    <div className="bg-[#fff8f3] px-6 py-16">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 hidden md:block sticky top-32 self-start border-r border-gray-300 pr-6 h-max">
          {/* Availability */}
          <h3 className="text-2xl font-serif text-[#27314c] mb-2">
            Availability
          </h3>
          <div className="border-b border-gray-300 mb-4"></div>
          <div className="space-y-2 mb-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="stock"
                value="all"
                checked={availability === "all"}
                onChange={(e) => setAvailability(e.target.value)}
              />
              All ({filteredProducts.length})
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="stock"
                value="in"
                checked={availability === "in"}
                onChange={(e) => setAvailability(e.target.value)}
              />
              In Stock ({inStockCount})
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="stock"
                value="out"
                checked={availability === "out"}
                onChange={(e) => setAvailability(e.target.value)}
              />
              Out of Stock ({outOfStockCount})
            </label>
          </div>

          {/* Price */}
          <h3 className="text-2xl font-serif text-[#27314c] mb-2">Price</h3>
          <div className="border-b border-gray-300 mb-4"></div>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              placeholder="Min"
              className="border rounded px-2 py-1 w-20"
              onChange={(e) =>
                setPriceFilter((prev) => ({
                  ...prev,
                  min: e.target.value ? Number(e.target.value) : 0,
                }))
              }
            />
            <input
              type="number"
              placeholder="Max"
              className="border rounded px-2 py-1 w-20"
              onChange={(e) =>
                setPriceFilter((prev) => ({
                  ...prev,
                  max: e.target.value ? Number(e.target.value) : Infinity,
                }))
              }
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setPriceFilter({ min: 0, max: Infinity })}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            >
              Clear
            </button>
          </div>
        </aside>

        {/* Main Product Area */}
        <main className="flex-1">
          {/* Heading + Sort & View */}
          <div className="flex flex-wrap justify-between items-center mb-8">
            <h2 className="text-4xl font-serif font-semibold text-[#27314c]">
              Search Results for "{query}"
            </h2>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              {/* View Switch */}
              <button onClick={() => setView("grid")}>
                <svg
                  className={`w-5 h-5 ${
                    view === "grid" ? "text-[#27314c]" : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 3h5v5H3V3zm0 9h5v5H3v-5zm9-9h5v5h-5V3zm0 9h5v5h-5v-5z" />
                </svg>
              </button>
              <button onClick={() => setView("list")}>
                <svg
                  className={`w-5 h-5 ${
                    view === "list" ? "text-[#27314c]" : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 6h12v2H4V6zm0 4h12v2H4v-2zm0 4h12v2H4v-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Sort */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-primary bg-primary rounded px-3 py-1 text-white"
              >
                <option value="default">Featured</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div
            className={`grid ${
              view === "grid"
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-8`}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} view={view} />
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">
                No products found.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchResults;
