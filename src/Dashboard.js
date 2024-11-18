import React, { useState, useEffect } from 'react';
import DatePicker from './DatePicker';
import MoodTracker from './MoodTracker';
import MoodTrend from './MoodTrend';
import DietLog from './DietLog';
import FitnessLog from './FitnessLog';
import './Dashboard.css';

function Dashboard() {
  // Meals state
  const [meals, setMeals] = useState([
    { name: 'Oatmeal', calories: 271, protein: 7, carbs: 55, fats: 4 },
    { name: 'Banana', calories: 105, protein: 1, carbs: 27, fats: 0.3 },
  ]);

  // Habit data (for MoodTracker)
  const [habitData, setHabitData] = useState([
    { date: '2024-10-21', mood: 'Happy', activity: 'Running', duration: '30 mins', moodChange: '+ Positive' },
    { date: '2024-10-20', mood: 'Neutral', activity: 'Yoga', duration: '45 mins', moodChange: 'No Change' },
    { date: '2024-10-19', mood: 'Sad', activity: 'Cycling', duration: '20 mins', moodChange: '- Negative' },
  ]);

  // Fitness activities state
  const [fitnessActivities, setFitnessActivities] = useState([
    { activity: 'Running', duration: '30 mins', caloriesBurned: 300 },
    { activity: 'Cycling', duration: '20 mins', caloriesBurned: 150 },
  ]);

  // Function to add a new meal
  const addMeal = (newMeal) => {
    setMeals([...meals, newMeal]);
  };

  // Function to add a new habit log
  const addHabitLog = (newHabit) => {
    setHabitData([...habitData, newHabit]);
  };

  // Function to add a new fitness activity
  const addFitnessActivity = (newActivity) => {
    setFitnessActivities([...fitnessActivities, newActivity]);
  };

  // Get the latest habit from fitness activities
  const latestHabit = fitnessActivities[fitnessActivities.length - 1]?.activity || '';

  return (
    <div className="dashboard-container">
      {/* Left Section */}
      <aside className="sidebar">
        <DatePicker />
        <MoodTrend />
      </aside>

      {/* Middle Section */}
      <main className="middle">
        {/* Pass meals and addMeal function to MealsLog */}
        <DietLog meals={meals} setMeals={setMeals} addMeal={addMeal} />

        {/* Pass fitness activities and addFitnessActivity function to FitnessLog */}
        <FitnessLog fitnessActivities={fitnessActivities} addFitnessActivity={addFitnessActivity} />
      </main>

      {/* Right Section */}
      <aside className="sidebar-right">
        {/* Pass habitData, addHabitLog, and latest habit to MoodTracker */}
        <MoodTracker habitData={habitData} addHabitLog={addHabitLog} latestHabit={latestHabit} />

        {/* Chatbot Embed */}
        <div className="chatbot-container">
          <iframe
            src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/10/22/19/20241022195513-GDG8GCGS.json"
            title="Chatbot"
            width="400"
            height="600"
            style={{ border: 'none', borderRadius: '10px', margin: '20px' }}
            allow="microphone"
          ></iframe>
        </div>
      </aside>
    </div>
  );
}

export default Dashboard;
