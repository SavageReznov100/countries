import React, { useContext } from "react";

import Borders from "../Components/Borders";

import { useParams, Link } from "react-router-dom";

import { CountriesContext } from "../Context/CountriesContext";

import { TiArrowLeft } from "react-icons/ti";

const CountriesDetails = () => {
  const { common } = useParams();
  const { products } = useContext(CountriesContext);
  const product = products.find((item) => {
    return item.name.common === common;
  });

  const {
    name,
    population,
    region,
    subregion,
    tld,
    currencies,
    languages,
    capital,
    borders,
  } = product;
  const flags = product.flags.png;

  const languageKeys = Object.keys(languages);
  return (
    <section>
      <div className="dark:bg-dark-Bg dark:text-dark text-light bg-light-Bg h-full px-4 py-8 md:px-16 md:py-24 lg:h-screen">
        <div>
          <button
            onClick={() => window.history.back()}
            className="dark:bg-dark-elements flex items-center justify-center gap-1 bg-gray-200 px-4 py-1 shadow-md"
          >
            <TiArrowLeft />
            <p>Back</p>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center md:py-12 lg:flex-row">
          <div className="flex h-full w-full items-center justify-center py-8 md:py-0">
            <img
              className="h-[150px] w-[270px] md:h-[250px] md:w-[400px]"
              src={flags}
              alt={`${name.official} flag`}
            />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-8">
            <div className="text-xl font-bold">
              <p>{name.official}</p>
            </div>

            <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:gap-0">
              <div className="flex flex-col gap-2">
                <p>Native Name: {common}</p>
                <p>Population: {population}</p>
                <p>Region: {region}</p>
                <p>Sub Region: {subregion}</p>
                <p>Capital: {capital}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>Top Level Domain: {tld}</p>
                <div className="flex gap-2">
                  <p>Currencies :</p>
                  {Object.keys(currencies).map((key) => {
                    return (
                      <div key={key}>
                        {currencies[key].name}{" "}
                        {Object.keys(currencies).length > 1 ? "," : ""}
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-2">
                  <p>Languages :</p>
                  {languageKeys.slice(0, 3).map((key) => {
                    return (
                      <div key={key}>
                        {languages[key]} {languageKeys.length > 1 ? "," : ""}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-2">
              <p>Border Countries:</p>
              <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                {borders.map((borderCode) => (
                  <div key={borderCode}>
                    <Borders bor={borderCode} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountriesDetails;
