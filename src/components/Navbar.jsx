import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.scss";
import Logo from '../assets/Logo1.png';

function Navbar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

  return (
    <nav className="navbar">
      <img src={Logo} className="logo" alt="logo" />
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "LinkActive" : "")}
        >
          Home
        </NavLink>
        {/* Render a link for each category */}
        {categories.map((category) => (
          <NavLink
            key={category.strCategory}
            to={`/category/${category.strCategory}`}
            className={({ isActive }) => (isActive ? "LinkActive" : "")}
          >
            {category.strCategory}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
