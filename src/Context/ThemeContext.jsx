import React from "react";
import { useState, useEffect, createContext } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }} key={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
