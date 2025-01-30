import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import "./Home.scss";

function Home() {
  const { category } = useParams();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

    if (category) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    }

    axios
      .get(url)
      .then((response) => {
        setMeals(response.data.meals || []);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [category]);

  return (
    <div className="meal-container">
      {meals.length ? (
        <div className="meal-grid">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <div className="meal-info">
                <h3>{meal.strMeal}</h3>
                <p>{meal.strArea}</p>
                <Link to={`/details/${meal.idMeal}`}>
                  <button>View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}

export default Home;
