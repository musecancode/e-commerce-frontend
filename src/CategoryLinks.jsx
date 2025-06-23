import { Link } from "react-router-dom";

const categories = ["fragrances", "groceries", "smartphones", "laptops"];

const CategoryLinks = () => {
  return (
    <section className="px-6">
      <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${cat.toLowerCase()}`}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}{" "}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryLinks;
