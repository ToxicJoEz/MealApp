import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Details.scss";


const Details = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setMeal(response.data.meals[0]);
    };

    fetchMealDetails();
  }, [id]);

  if (!meal) {
    return <div className="loader"></div>;
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
                                            <div className="YT-Logo"><div class="container">
                                
                                <span class="before"></span>
                                  <p class="you">You<span class="tube">Tube</span></p>
                                <span class="after"></span> 
                                
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
