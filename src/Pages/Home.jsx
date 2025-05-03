import React, { useContext, useState, useRef, useEffect } from "react";
import { CountriesContext } from "../Context/CountriesContext";
import Countries from "../Components/Countries";
import { IoMdSearch } from "react-icons/io";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const Home = () => {
  const { products } = useContext(CountriesContext);
  const menuRef = useRef();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState("");
  const productsPerPage = 30;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedRegion]);

  const filteredProducts = products.filter((product) => {
    if (!product) return false;

    const productName = product.name?.common || product.name || "";
    const productOfficialName = product.name?.official || "";
    const searchLower = search.toLowerCase();

    const matchesSearch =
      search === "" ||
      productName.toLowerCase().includes(searchLower) ||
      productOfficialName.toLowerCase().includes(searchLower);

    const matchesRegion =
      selectedRegion === "" ||
      (product.region && product.region === selectedRegion);

    return matchesSearch && matchesRegion;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <section>
      <div className="bg-light-Bg text-light dark:bg-dark-Bg dark:text-dark flex flex-col items-center justify-between gap-4 p-8 md:flex-row">
        <div className="w-full md:w-auto">
          <label className="relative block w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-5">
              <IoMdSearch size={20} />
            </span>
            <input
              className="font-Nunito bg-light-Bg dark:bg-dark-elements text-light dark:text-dark block w-full rounded-md border border-black py-2 pl-12 shadow-sm sm:text-sm"
              placeholder="Search for a country..."
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
        <div
          className="relative z-10 flex h-[38px] w-[200px] flex-col tracking-wider"
          ref={menuRef}
        >
          <button
            className="bg-grey-200 dark:bg-dark-elements dark:text-dark flex h-full w-full items-center justify-between rounded-md border border-slate-300 px-4 shadow-sm dark:border-slate-600"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {selectedRegion || "Filter by Region"}
            {!isOpen ? (
              <MdArrowDropDown size={20} />
            ) : (
              <MdArrowDropUp size={20} />
            )}
          </button>
          {isOpen && (
            <div className="bg-light-Bg dark:bg-dark-elements dark:text-dark absolute top-10 flex w-full flex-col items-start rounded-md shadow-md">
              <div className="w-full py-2">
                {regions.map((region) => (
                  <p
                    key={region}
                    className="font-Nunito cursor-pointer px-4 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleRegionSelect(region)}
                  >
                    {region}
                  </p>
                ))}
                {selectedRegion && (
                  <p
                    className="font-Nunito cursor-pointer px-4 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleRegionSelect("")}
                  >
                    Clear Filter
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <>
          <div className="dark:bg-dark-Bg dark:text-dark bg-light-Bg text-light grid grid-cols-1 justify-items-center gap-6 px-8 md:grid-cols-2 lg:grid-cols-4">
            {currentProducts.map((country, i) => (
              <Countries update={country} key={i} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="dark:bg-dark-Bg dark:text-dark bg-light-Bg text-light flex justify-center gap-2 pb-8">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`rounded-md px-4 py-2 ${
                  currentPage === 1
                    ? "dark:bg-dark-elements cursor-not-allowed bg-gray-200"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                <FaAngleLeft />
              </button>

              <span className="flex items-center px-4">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`rounded-md px-4 py-2 ${
                  currentPage === totalPages
                    ? "dark:bg-dark-elements cursor-not-allowed bg-gray-200"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                <FaAngleRight />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="dark:bg-dark-Bg dark:text-dark bg-light-Bg text-light h-[90vh] text-center text-lg font-medium">
          No countries found matching your search.
        </div>
      )}
    </section>
  );
};

export default Home;
