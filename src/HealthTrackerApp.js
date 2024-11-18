import React, { useState } from 'react';
import MealsLog from './DietLog';
import FitnessLog from './FitnessLog';
import MoodTracker from './MoodTracker';

function HealthTrackerApp() {
  const [mealsLog, setMealsLog] = useState([
    { name: 'Oatmeal', calories: 271, protein: 7 },
    { name: 'Banana', calories: 105, protein: 1 },
  ]);

  const [fitnessLog, setFitnessLog] = useState([
    { activity: 'Running', duration: '30 mins', caloriesBurned: 300 },
    { activity: 'Yoga', duration: '45 mins', caloriesBurned: 150 },
  ]);

  // Function to add a new meal to the meals log
  const addMeal = (meal) => {
    setMealsLog([...mealsLog, meal]);
  };

  // Function to add a new fitness activity to the fitness log
  const addFitnessActivity = (activity) => {
    setFitnessLog([...fitnessLog, activity]);
  };

  return (
    <div className="health-tracker-app">
      <MealsLog addMeal={addMeal} meals={mealsLog} />
      <FitnessLog addFitnessActivity={addFitnessActivity} fitnessActivities={fitnessLog} />
      <MoodTracker mealsLog={mealsLog.map((meal) => meal.name)} fitnessLog={fitnessLog.map((activity) => activity.activity)} />
    </div>
  );
}

export default HealthTrackerApp;
