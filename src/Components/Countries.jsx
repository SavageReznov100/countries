import React, { useContext } from "react";

import { Link } from "react-router-dom";

const Countries = ({ update }) => {
  const flagUrl = update.flags.png;

  const { name, population, region, capital } = update;
  const { common } = name;
  return (
    <div>
      <div className="h-[320px] w-[270px]">
        <Link to={`/details/${common}`}>
          <div className="mx-auto flex items-center justify-center">
            <img className="h-[150px] w-[270px]" src={flagUrl} />
          </div>
        </Link>
        <div className="dark:bg-dark-elements dark:text-dark text-light rounded-b-lg bg-gray-200 px-5 py-4 shadow-md">
          <p className="font-Nunito text-lg font-bold">{common}</p>
          <div className="font-Nunito text-sm">
            <p>Population : {population}</p>
            <p>Region : {region}</p>
            <p>Capital : {capital}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countries;
