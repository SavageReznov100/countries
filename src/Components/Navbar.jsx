import React from "react";
import { Link } from "react-router-dom";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <>
      <div className="dark:bg-dark-elements text-light flex items-center justify-between bg-gray-200 px-8 py-4 dark:text-white">
        <div className="font-Nunito font-bold">
          <Link to={"/"}>
            <h3 className="text-xl md:text-2xl">Where in the world?</h3>
          </Link>
        </div>
        <div>
          {theme === "dark" ? (
            <div>
              <div
                className="font-Nunito flex cursor-pointer items-center gap-2 text-base font-bold md:text-xl"
                onClick={() => setTheme("light")}
              >
                <IoSunnyOutline />
                <p>Light Mode</p>
              </div>
            </div>
          ) : (
            <div>
              <div
                className="font-Nunito flex cursor-pointer items-center gap-2 text-base font-bold md:text-xl"
                onClick={() => setTheme("dark")}
              >
                <IoMoonOutline />
                <p>Dark Mode</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
