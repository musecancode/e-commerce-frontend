import { useState } from "react";
import { useProducts } from "./ProductContext";
import Hero from "./Hero";
import CategoryLinks from "./CategoryLinks";
import ProductCard from "./ProductCard";

const Home = () => {
  const { products } = useProducts();
  const [visibleCount, setVisibleCount] = useState(8);
  const itemsPerRow = 4;
  const rowsPerClick = 2;

  const visibleProducts = products.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + itemsPerRow * rowsPerClick);
  };

  const allShown = visibleCount >= products.length;

  return (
    <div className="space-y-10">
      <Hero />

      <section
        id="featured-products"
        className="px-6 bg-[#faf3ee] pb-20 pt-20 mt-24 mb-24 rounded-md shadow-sm"
      >
        <h2 className="text-6xl font-light font-serif text-primary mb-20">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-0">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!allShown && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleViewMore}
              className="border border-black text-black px-6 py-2 hover:bg-[#c97a40]/80 hover:text-white transition-all duration-300"
            >
              VIEW MORE PRODUCTS
            </button>
          </div>
        )}
      </section>

      <CategoryLinks />
    </div>
  );
};

export default Home;
