import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Product fetch failed", err));

    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Category fetch failed", err));
  }, []);

  return (
    <ProductContext.Provider value={{ products, categories }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
