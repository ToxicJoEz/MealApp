import React from "react";
import { Link } from "react-router-dom";

const Err = () => {
  return (
    <div className="error-container">
      <h1>Oops! Something went wrong.</h1>
      <p>The page you are looking for does not exist or an error occurred.</p>
      <Link to="/MealApp" className="home-link">
        Go back to Home
      </Link>
    </div>
  );
};

export default Err;

