import { useState, useEffect } from "react";

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
    subtitle: "SEssential accessories for your digital lifestyle.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen -mt-24 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
            <a
              href="#featured-products"
              className="bg-primary text-white px-6 py-3 rounded-full hover:bg-[#c97a40]/60 transition"
            >
              Shop Now
            </a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Hero;
