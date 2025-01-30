import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Details from "./routes/Details";
import "./App.scss";
import Err from "./components/Err";

function App() {
  return (
    <Router>
  <Navbar />
  <Routes>
    <Route path="/MealApp/" element={<Home />} />
    <Route path="/MealApp/category/:category" element={<Home />} />
    <Route path="/MealApp/details/:id" element={<Details />} />
    <Route path="*" element={<Err/>} />
  </Routes>
</Router>

  );
}

export default App;
