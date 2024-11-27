import React, { useState, useEffect } from 'react';
import DatePicker from './DatePicker';
import MoodTracker from './MoodTracker';
import MoodTrend from './MoodTrend';
import DietLog from './DietLog';
import FitnessLog from './FitnessLog';
import SleepTracker from './SleepTracker';
import BeverageTracker from './BeverageTracker';
import Journal from './Journal';
import { useNavigate } from 'react-router-dom';
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
  // Sleep state
  const [sleep, setSleep] = useState([
    {timeFallAsleep:'', timeWakeUp:'', hours:''}
  ]);

  // Beverage state
  const [beverage, setBeverage] = useState([
    {name:'', ounces:''}
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

  // Function to add sleep
  const addSleep = (newSleep) => {
    setSleep([...sleep, newSleep]);
  };

  // Function to add beverage
  const addBeverage = (newBeverage) => {
    setBeverage([...beverage, newBeverage]);
  }

  // Get the latest habit from fitness activities
  const latestHabit = fitnessActivities[fitnessActivities.length - 1]?.activity || '';
  
  
  // Function to manage the list of journal entries. Empty array at first
  const [journalEntries, setJournalEntries] = useState([]);

  // Function to add a new journal entry to the list of entries.
  const addJournalEntry = (entry) => {
    // Update the state by adding the new entry to the existing list of journal entries.
    setJournalEntries([...journalEntries, entry]); // The spread operator (...) is used to copy the current entries and append the new entry at the end.
  };

  const navigate = useNavigate();

  // Retrieve the username from localStorage
  const username = localStorage.getItem('currentUser');

  // Logout handler
  const handleLogout = () => {
    // Clear authentication and user data from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    navigate('/login'); // Redirect to the login page
  };

  return (
    <>
      {/* Title */}
      <header className="dashboard-header">
        <h1>Health AI - Wellness Tracker</h1>
      </header>

    <div className="dashboard-container">
      {/* Username and Logout Button */}
      <div className="user-info">
        <span className="username">Welcome, {username}!</span>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      
      {/* Left Section */}
      <aside className="sidebar">
        <DatePicker />
        <MoodTrend />
        <SleepTracker sleep={sleep} setSleep={setSleep} addSleep={addSleep} />
      </aside>

      {/* Middle Section */}
      <main className="middle">
        {/* Pass meals and addMeal function to MealsLog */}
        <DietLog meals={meals} setMeals={setMeals} addMeal={addMeal} />

        {/* Pass fitness activities and addFitnessActivity function to FitnessLog */}
        <FitnessLog fitnessActivities={fitnessActivities} addFitnessActivity={addFitnessActivity} />

        {/* addBeverage function */}
        <BeverageTracker beverage={beverage} setBeverage={setBeverage} addBeverage={addBeverage} />
      </main>

      {/* Right Section */}
      <aside className="sidebar-right">
        {/* Pass habitData, addHabitLog, and latest habit to MoodTracker */}
        <MoodTracker habitData={habitData} addHabitLog={addHabitLog} latestHabit={latestHabit} />
        <Journal journalEntries={journalEntries} addJournalEntry={addJournalEntry} />
      </aside>
    </div>
    </>
  );
}

export default Dashboard;

