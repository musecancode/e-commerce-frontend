import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "./ProductContext";
import ProductCard from "./ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { products } = useProducts();
  const [sortOption, setSortOption] = useState("default");
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  const [view, setView] = useState("grid");

  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  const filteredProducts = categoryProducts
    .filter((p) => p.price >= priceFilter.min && p.price <= priceFilter.max)
    .sort((a, b) => {
      if (sortOption === "lowToHigh") return a.price - b.price;
      if (sortOption === "highToLow") return b.price - a.price;
      return 0;
    });

  const productsToDisplay =
    filteredProducts.length > 0
      ? filteredProducts
      : categoryProducts.slice(0, 6);

  const inStockCount = categoryProducts.filter((p) => p.stock > 0).length;
  const outOfStockCount = categoryProducts.filter((p) => p.stock === 0).length;
  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="bg-[#fff8f3] px-6 py-16">
      <div className="max-w-7xl mx-auto flex gap-12">
        {/* Sidebar */}
        <aside className="w-64 hidden md:block sticky top-32 self-start border-r border-gray-300 pr-6 h-max">
          <h3 className="text-3xl font-serif text-[#27314c] mb-6">Category</h3>
          <div className="border-b mb-6"></div>
          <div className="space-y-2 text-lg">
            {uniqueCategories.map((cat) => (
              <Link
                to={`/category/${cat.toLowerCase()}`}
                key={cat}
                className={`block capitalize ${
                  cat.toLowerCase() === categoryName.toLowerCase()
                    ? "text-[#c97a40] font-semibold"
                    : "text-gray-800"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <h3 className="text-2xl font-serif text-[#27314c] mt-8">
            Availability
          </h3>
          <div className="border-b mb-4 mt-2"></div>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="stock" />
              In stock ({inStockCount})
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="stock" />
              Out of stock ({outOfStockCount})
            </label>
          </div>

          <h3 className="text-2xl font-serif text-[#27314c] mt-8">Price</h3>
          <div className="border-b mb-4 mt-2"></div>
          <div className="flex gap-2">
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
            <button className="bg-[#27314c] text-white px-3 py-1 rounded">
              Apply
            </button>
          </div>
        </aside>

        {/* Main Products */}
        <main className="flex-1">
          <div className="flex flex-wrap justify-between items-center mb-8">
            <h2 className="text-4xl font-serif font-semibold text-[#27314c] capitalize">
              {categoryName.replace("-", " ")}
            </h2>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
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

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-primary bg-primary rounded px-3 py-1 text-normal text-white"
              >
                <option value="default">Featured</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div
            className={`grid ${
              view === "grid"
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-8`}
          >
            {productsToDisplay.length > 0 ? (
              productsToDisplay.map((product) => (
                <ProductCard key={product.id} product={product} view={view} />
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">
                No products available in this category.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
