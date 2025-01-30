import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Home.scss";

function Home() {
  const { category } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

    if (category) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    }

    setLoading(true);
    setError(null); // Reset error state

    axios
      .get(url)
      .then((response) => {
        if (response.data.meals) {
          setMeals(response.data.meals);
        } else {
          setMeals([]); // If no meals are found, set an empty array
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError("Error fetching meals. Please try again later.");
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="meal-container">
      {loading ? (
        <div className="loader"></div>
      ) : error ? (
        <p>{error}</p> // Show error message if an error occurs
      ) : meals.length ? (
        <div className="meal-grid">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <div className="meal-info">
                <h3>{meal.strMeal}</h3>
                <p>{meal.strArea}</p>
                <Link to={`/MealApp/details/${meal.idMeal}`}>
                  <button>View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="error-container">
              <h1>Oops! No meals in this category!</h1>
              <p>The page you are looking for does not exist or an error occurred.</p>
              <Link to="/MealApp" className="home-link">
                Go back to Home
              </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
