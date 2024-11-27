import React, { useState, useEffect } from 'react';
import axios from 'axios';

// checks if there is sleep data in local storage and initalizes empty array if false
function SleepTracker({onSleepDataChange = () => {}}) {
  // checks if there is sleep data in local storage and initalizes empty array if false
  const [sleep, setSleep] = useState(() => {
    const savedSleep = localStorage.getItem('sleepData');
  return savedSleep ? JSON.parse(savedSleep) : [];
  });

  // tracks the new sleep entry that the user inputs
  const [newSleep, setNewSleep] = useState({date: '', timeFallAsleep: '', timeWakeUp: '', hours: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSleep({
      ...newSleep,
      [name]: value});
  };

  // adds the new sleep entry to the sleep list, saves the data to local storage, and resets the input fields
  const handleAddSleep = () => {
  if (newSleep.date && newSleep.timeFallAsleep && newSleep.timeWakeUp && newSleep.hours) {
    const updatedSleep = [...sleep, newSleep];
    setSleep(updatedSleep); 
    localStorage.setItem('sleepData', JSON.stringify(updatedSleep)); 
    setNewSleep({ date: '', timeFallAsleep: '', timeWakeUp: '', hours: '' });
    onSleepDataChange(updatedSleep);
  } else {
    alert("Please fill in all fields");
  }
};

  useEffect(() => {
    onSleepDataChange(sleep);
  }, [sleep, onSleepDataChange]);

  // deletes specified log entry
  const handleDeleteSleep = (indexToDelete) => {
    const updatedSleep = sleep.filter((_, index) => index !== indexToDelete);
    setSleep(updatedSleep);
    localStorage.setItem('sleepData', JSON.stringify(updatedSleep));
    onSleepDataChange(updatedSleep);
  };

  return (
    <div className="log-section">
      <h3>Sleep</h3>

      {/* Table for displaying sleep logs */}
      <table className="log-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time Fell Asleep</th>
            <th>Time Woke Up</th>
            <th>Hours Slept</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sleep.map((sleep, index) => (
            <tr key={index}>
              <td>{sleep.date}</td>
              <td>{sleep.timeFallAsleep}</td>
              <td>{sleep.timeWakeUp}</td>
              <td>{sleep.hours}</td>
              <td>
              <button onClick={() => handleDeleteSleep(index)}>
                  Delete
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Input section for new sleep data */}
      <div className="sleep-input">
        
      {/* Input the date */}
      <input
          type="date"
          name="date"
          placeholder="2024-11-21"
          value={newSleep.date}
          onChange={handleChange}
        />

        {/* Input the time fall asleep */}
        <input
          type="text"
          name="timeFallAsleep"
          placeholder="Enter the time you fell asleep (Example: 10:00)"
          value={newSleep.timeFallAsleep}
          onChange={handleChange}
        />

        {/* Input the time wake up */}
        <input
          type="text"
          name="timeWakeUp"
          placeholder="Enter the time you woke up (Example: 8:00)"
          value={newSleep.timeWakeUp}
          onChange={handleChange}
        />

        {/* Input the total hours of sleep */}
        <input
          type="text"
          name="hours"
          placeholder="Total Hours of Sleep"
          value={newSleep.hours}
          onChange={handleChange}
        />
        

        {/* Button to add sleep to the list */}
        <button onClick={handleAddSleep}>Add Sleep</button>

      </div>
    </div>
  );
}

export default SleepTracker;