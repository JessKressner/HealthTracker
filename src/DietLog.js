import React, { useState } from 'react';
import axios from 'axios';

function DietLog() {
  const [meals, setMeals] = useState([
    { name: 'Oatmeal', calories: 271, protein: 7, carbs: 55, fats: 4 },
    { name: 'Banana', calories: 105, protein: 1, carbs: 27, fats: 0.3 },
  ]);

  const [newMeal, setNewMeal] = useState({ name: '', calories: '', protein: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMeal({
      ...newMeal,
      [name]: name === 'calories' || name === 'protein' ? Number(value) : value,
    });
  };

  // Fetch food data from USDA API based on the food name
  const fetchFoodData = async () => {
    if (!newMeal.name) {
      alert('Please enter a food name');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${newMeal.name}&api_key=${process.env.REACT_APP_USDA_API_KEY}`
      );

      const foodItem = response.data.foods[0]; // Get the first food item in the search results

      if (foodItem) {
        // Find calorie and protein info in the food nutrients
        const calories = foodItem.foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy')?.value || 0;
        const protein = foodItem.foodNutrients.find(nutrient => nutrient.nutrientName === 'Protein')?.value || 0;

        setNewMeal({
          ...newMeal,
          calories,
          protein,
        });
      } else {
        alert('No data found for this food item');
      }
    } catch (error) {
      console.error('Error fetching food data:', error);
      alert('Error fetching food data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMeal = () => {
    if (newMeal.name && newMeal.calories && newMeal.protein) {
      setMeals([...meals, newMeal]);
      setNewMeal({ name: '', calories: '', protein: '' });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="log-section">
      <h3>Diet</h3>

      {/* Table for displaying meal logs */}
      <table className="log-table">
        <thead>
          <tr>
            <th>Food</th>
            <th>Calories</th>
            <th>Protein (g)</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal, index) => (
            <tr key={index}>
              <td>{meal.name}</td>
              <td>{meal.calories}</td>
              <td>{meal.protein}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Input section for adding a new meal */}
      <div className="meal-input">
        <input
          type="text"
          name="name"
          placeholder="Food"
          value={newMeal.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={newMeal.calories}
          onChange={handleChange}
        />
        <input
          type="number"
          name="protein"
          placeholder="Protein"
          value={newMeal.protein}
          onChange={handleChange}
        />
        
        {/* Button to fetch nutritional info from USDA API */}
        <button onClick={fetchFoodData} disabled={loading}>
          {loading ? 'Loading...' : 'Get Nutritional Info'}
        </button>

        {/* Button to add meal to the list */}
        <button onClick={handleAddMeal}>Add Meal</button>
      </div>

      {/* Image section for Health Tips */}
      <img 
        src="https://as2.ftcdn.net/v2/jpg/04/22/53/69/1000_F_422536910_Ybz9gRwDVAZlEmpmuQWtsjRbb14ivz0J.jpg"
        alt="Health Tips" 
        className="health-tips-image" 
      />
    </div>
  );
}

export default DietLog;
