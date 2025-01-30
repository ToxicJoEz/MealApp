import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Details from "./routes/Details";
import "./App.scss";

function App() {
  return (
    <Router>
  <Navbar />
  <Routes>
    <Route path="/MealApp/" element={<Home />} />
    <Route path="/category/:category" element={<Home />} />
    <Route path="/details/:id" element={<Details />} />
  </Routes>
</Router>

  );
}

export default App;
