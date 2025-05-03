import React from "react";
import { useState, useEffect, createContext } from "react";

export const CountriesContext = createContext();

const CountriesProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <CountriesContext.Provider value={{ products }}>
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesProvider;
