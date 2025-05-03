import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import CountriesDetails from "./Pages/CountriesDetails";
import Navbar from "./Components/Navbar";
import ThemeProvider from "./Context/ThemeContext.jsx";
function App() {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:common" element={<CountriesDetails />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
