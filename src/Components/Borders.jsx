import React from "react";
import { Link } from "react-router-dom";
import { CountriesContext } from "../Context/CountriesContext";
import { useContext } from "react";

const Borders = ({ bor }) => {
  const { products } = useContext(CountriesContext);
  const product = products.find((item) => item.cca3 === bor);

  if (!product) {
    return null;
  }
  const { name } = product;
  const { common } = name;
  return (
    <div className="dark:bg-dark-elements dark:text-dark text-light flex items-center justify-center rounded-lg bg-gray-200 p-1 shadow-md">
      <Link to={`/details/${common}`}>{common}</Link>
    </div>
  );
};

export default Borders;
