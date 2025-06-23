import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

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

  // Decide what to show:
  const productsToDisplay =
    filteredProducts.length > 0
      ? filteredProducts
      : categoryProducts.slice(0, 6);

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 capitalize">{categoryName}</h2>

      {/* Filter & Sort Controls */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded p-2"
        >
          <option value="default">Sort By</option>
          <option value="lowToHigh">Price: Low → High</option>
          <option value="highToLow">Price: High → Low</option>
        </select>

        <div className="flex gap-2 items-center">
          <span>Price:</span>
          <input
            type="number"
            placeholder="Min"
            className="border p-1 w-20"
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
            className="border p-1 w-20"
            onChange={(e) =>
              setPriceFilter((prev) => ({
                ...prev,
                max: e.target.value ? Number(e.target.value) : Infinity,
              }))
            }
          />
        </div>

        <button
          onClick={() => {
            setSortOption("default");
            setPriceFilter({ min: 0, max: Infinity });
          }}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Reset Filters
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
