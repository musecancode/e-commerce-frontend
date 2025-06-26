import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[url('https://baggo-theme.myshopify.com/cdn/shop/files/footer-image.jpg?v=1639566032')] bg-cover bg-no-repeat bg-center text-white mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-3xl font-serif font-semibold">ShopVerse</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-200">
            We bring finest collections from top brands. Whether it's fashion,
            electronics, or home essentials — we ensure quality and customer
            satisfaction.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-serif mb-4">We are here</h3>
          <p className="text-sm leading-relaxed">
            No: 58 A, East Madison Street, Baltimore, MD, USA 4508
          </p>
          <div className="flex items-center gap-2 mt-3 text-sm">
            <IoLocationOutline />
            <Link
              to="https://maps.google.com"
              className="underline hover:text-yellow-300"
            >
              View on map
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-serif mb-4">Contact us</h3>
          <p className="text-sm mb-2">0000 123 456789</p>
          <p className="text-sm underline">info@example.com</p>
        </div>

        <div>
          <h3 className="text-xl font-serif mb-4">Get us on Social</h3>
          <div className="flex gap-4 text-lg">
            <a href="#" className="border border-white p-2 rounded-full">
              <FaTwitter />
            </a>
            <a href="#" className="border border-white p-2 rounded-full">
              <FaFacebookF />
            </a>
            <a href="#" className="border border-white p-2 rounded-full">
              <FaInstagram />
            </a>
            <a href="#" className="border border-white p-2 rounded-full">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
