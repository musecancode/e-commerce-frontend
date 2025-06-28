import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image:
      "https://www.thespruce.com/thmb/eTjEURSHcrDEW51dUVwOW4t9jZs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/morsa-images-getty-header-cb5d4e106c994631853c0a2d151c1a00.jpg",
    title: "Trendy Home Decor",
    subtitle: "Bring home warmth, charm, and modern elegance.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1500&q=80",
    title: "Men’s Fashion Picks",
    subtitle: "Top quality clothing and shoes at unbeatable prices.",
  },
  {
    id: 3,
    image:
      "https://greenerchoice.ie/cdn/shop/collections/natural-cosmetics-desk_23-2148574904.jpg?v=1665049024",
    title: "Beauty & Skincare",
    subtitle: "Self-care essentials from premium brands.",
  },
  {
    id: 4,
    image:
      "https://wallpapers.com/images/hd/aesthetic-computer-pictures-zagqv8hl2wtfftni.jpg",
    title: "Laptops & Tech accessories",
    subtitle: "Essential accessories for your digital lifestyle.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[99%] h-[400px] md:h-[500px] bg-white overflow-hidden mt-8 mx-2 rounded-2xl">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          backgroundImage:
            "url('https://baggo-theme.myshopify.com/cdn/shop/files/footer-image.jpg?v=1639566032')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Slide Content */}
      <AnimatePresence mode="sync">
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 1.8 }}
                className="absolute top-0 left-0 w-full h-full flex z-10"
              >
                {/* Left text section */}
                <div className="w-1/2 flex flex-col justify-center items-center p-6 text-white text-center space-y-4">
                  <h1 className="text-3xl md:text-5xl font-semibold drop-shadow-md">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl font-light drop-shadow-sm">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Right image section */}
                <div className="w-1/2 h-full">
                  <img
                    src={slide.image}
                    alt="slide-img"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Fixed Shop Now Button */}
      <a href="#featured-products" className="absolute bottom-6 left-6 z-20">
        <button className="px-6 py-3 bg-black text-white rounded-full shadow-lg hover:bg-yellow-400 transition duration-300">
          Shop Now
        </button>
      </a>
    </div>
  );
};

export default Hero;
