import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import DatePicker from './DatePicker';
import MealsLog from './DietLog';
import FitnessLog from './FitnessLog';
import MoodTracker from './MoodTracker';
import MoodTrend from './MoodTrend';
import MoodTrendLink from './MoodTrendLink';
import SleepTracker from './SleepTracker';
import BeverageTracker from './BeverageTracker';
import Journal from './Journal';
import SignUp from './SignUp';

function App() {
  const [journalEntries, setJournalEntries] = useState([]);

  const addJournalEntry = (newEntry) => {
    setJournalEntries([...journalEntries, newEntry]);
  };
  return (
    <Router>
      <Routes>
        {/* Route to Login Page */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Route to Dashboard Page */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Nested components that will be part of the Dashboard */}
          <Route path="datepicker" element={<DatePicker />} />
          <Route path="mealslog" element={<MealsLog />} />
          <Route path="fitnesslog" element={<FitnessLog />} />
          <Route path="moodtracker" element={<MoodTracker />} />
          <Route path="moodtrend" element={<MoodTrend />} />
          <Route path="sleeptracker" element={<SleepTracker />} />
          <Route path="beveragetracker" element={<BeverageTracker />} />
        </Route>
         {/* Route to Journal Page */}
          <Route path="/journal" element={<Journal journalEntries={journalEntries} addJournalEntry={addJournalEntry} />}/>
        
         {/* Route to Detailed Mood Trend Analysis Page */}
         <Route path="/moodtrendlink" element={<MoodTrendLink />} />
      </Routes>
    
    </Router>
  );
}

export default App;