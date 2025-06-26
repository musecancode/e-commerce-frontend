import { Link } from "react-router-dom";
import { useProducts } from "./ProductContext";

// Image map for category names (lowercase keys)
const categoryImages = {
  fragrances:
    "https://img.joomcdn.net/064ace67b8a2c98dd1ce75622e12e4f95af3b0c8_1024_1024.jpeg",
  groceries:
    "https://assets.publishing.service.gov.uk/media/5bd98121ed915d152d4c6a2c/s960_Groceries.jpg",
  laptops:
    "https://images.pexels.com/photos/28148337/pexels-photo-28148337/free-photo-of-a-laptop-a-notebook-and-a-plant-on-a-desk.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  beauty:
    "https://i.pinimg.com/564x/4d/b9/ee/4db9ee62ae9b5615e0db05fbac3c65c0.jpg",
  furniture:
    "https://images.squarespace-cdn.com/content/v1/63dde481bbabc6724d988548/8809663f-ee98-41c1-a7d7-5afc847254b1/_d9b3e205-9540-469c-a458-b44b59fe8385.jpg",
  "home-decoration":
    "https://www.shutterstock.com/image-photo/aesthetic-composition-easter-living-room-600nw-2428166429.jpg",
  "kitchen-accessories":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnvm8HeugsanQ3qYM2JxGbmAHAmCMrSy06jA&s",
  "mens-shirts":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRfUsXzYNE1ZFcTAdTyznO50r9Ts9xHgmhkA&s",
  "mobile-accessories":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI5ShB3kL0MgcP97g0V38cmyrOfWfekjM5fwjzeWflSNtG9fB2Op9wjZPgYuNDxKGboxg&usqp=CAU",
  "mens-shoes":
    "https://shopify-app-group-product.s3.amazonaws.com/1721809938723-RSO3952_1.jpg",
  "mens-watches":
    "https://www.thecoolector.com/wp-content/uploads/2024/08/watch-1170x780.webp",
};

// Fallback image if no match
const fallbackImage = "https://via.placeholder.com/400x400?text=Category+Image";

const CategoryLinks = () => {
  const { products } = useProducts();

  // Get unique,categories
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  return (
    <section className="relative py-16 px-6 bg-primary">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://baggo-theme.myshopify.com/cdn/shop/files/home-background-image-05.png?v=1643016535')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-5xl text-[#1a2542] font-serif font-light mb-24 text-start">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {uniqueCategories.map((cat) => {
            const lowerKey = typeof cat === "string" ? cat.toLowerCase() : "";
            const image = categoryImages[lowerKey] || fallbackImage;

            return (
              <Link
                key={cat}
                to={`/category/${lowerKey}`}
                className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={image}
                  alt={cat}
                  className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-[#c97a40]/80 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <span className="text-white text-2xl font-serif tracking-wide capitalize">
                    {cat}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryLinks;
