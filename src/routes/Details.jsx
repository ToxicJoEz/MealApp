import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Details.scss";

const Details = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      setLoading(true);
      setError(null); // Reset error state

      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        
        if (response.data.meals && response.data.meals.length > 0) {
          setMeal(response.data.meals[0]);
        } else {
          setMeal(null); // No meal found
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching meal details: ", error);
        setError("Error fetching meal details. Please try again later.");
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h1>Oops! Something went wrong.</h1>
        <p>{error}</p>
        <Link to="/MealApp/" className="home-link">
          Go back to Home
        </Link>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="error-container">
        <h1>Meal not found</h1>
        <p>The meal you are looking for does not exist or has been removed.</p>
        <Link to="/MealApp/" className="home-link">
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="meal-details">
      <div className='Meal-1'>
        <h2>{meal.strMeal}</h2>
        <img src={meal.strMealThumb} alt={meal.strMeal} />
      </div>

      <div className="Meal-2">
        <h1>Ingredients</h1>
        <div className='ingredients-container'>
          <ul className="ingredients-list">
            {Object.keys(meal)
              .filter((key) => key.includes('strIngredient') && meal[key])
              .map((key) => (
                <li key={key}>{meal[key]} :</li>
              ))}
          </ul>

          <ul className="measurements-list">
            {Object.keys(meal)
              .filter((key) => key.includes('strMeasure') && meal[key])
              .map((key) => (
                <li key={key}>{meal[key]}</li>
              ))}
          </ul>
        </div>
      </div>

      <div className="Meal-3">
        <p><strong>Category:</strong> {meal.strCategory}</p>
        <p><strong>Area:</strong> {meal.strArea}</p>
      </div>

      <div className="Meal-4">
        <h3>Instructions</h3>
        <p>{meal.strInstructions}</p>
      </div>

      <div className="Meal-5">
        {meal.strYoutube && (
          <div className='YT'>
            <h3>Watch on YouTube</h3>
            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
              <button>
                <div className="YT-Logo">
                  <div className="container">
                    <span className="before"></span>
                    <p className="you">You<span className="tube">Tube</span></p>
                    <span className="after"></span>
                  </div>
                </div>
              </button>
            </a>
          </div>
        )}

        {meal.strSource && (
          <div className='LNK'>
            <h3>Source</h3>
            <a href={meal.strSource} target="_blank" rel="noopener noreferrer">
              <button>View Recipe Source</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
