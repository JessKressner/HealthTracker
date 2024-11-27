import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DietLog({onDietDataChange = () => {}}) {
  const [meals, setMeals] = useState(() => {
    const savedMeals = localStorage.getItem('mealData');
    return savedMeals ? JSON.parse(savedMeals) : [];
  });

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
      const updatedMeal = [...meals, newMeal];
      setMeals(updatedMeal);
      localStorage.setItem('mealData', JSON.stringify(updatedMeal));
      setNewMeal({ name: '', calories: '', protein: '' });
      onDietDataChange(updatedMeal);
    } else {
      alert("Please fill in all fields");
    }
  };

  useEffect(() => {
    onDietDataChange(meals);
  }, [meals, onDietDataChange]);
  

  const handleDeleteMeal = (indexToDelete) => {
    const updatedMeal = meals.filter((_, index) => index !== indexToDelete);
    setMeals(updatedMeal);
    localStorage.setItem('mealData', JSON.stringify(updatedMeal));
    onDietDataChange(updatedMeal);
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal, index) => (
            <tr key={index}>
              <td>{meal.name}</td>
              <td>{meal.calories}</td>
              <td>{meal.protein}</td>
              <td>
                <button onClick={() => handleDeleteMeal(index)}>
                  Delete
                </button>
              </td>
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
