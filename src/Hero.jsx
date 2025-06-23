import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gray-100 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to ShopVerse</h1>
      <p className="mb-6 text-lg">Explore top picks at amazing prices</p>
      <Link
        to="/category/all"
        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
      >
        Shop Now
      </Link>
    </section>
  );
};

export default Hero;
