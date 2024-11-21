import React, { useState } from 'react';
import axios from 'axios';

function SleepLog() {
  const [sleep, setSleep] = useState([{timeFallAsleep: '10:00', timeWakeUp: '8:00', hours: '8'}]);
  const [newSleep, setNewSleep] = useState({ timeFallAsleep: '', timeWakeUp: '', hours: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSleep({
      ...newSleep,
      [name]: value});
  };

  const handleAddSleep = () => {
    setSleep([...sleep, newSleep]);
    setNewSleep({ timeFallAsleep: '', timeWakeUp: '', hours: '' });
  };

  return (
    <div className="log-section">
      <h3>Sleep</h3>

      {/* Table for displaying sleep logs */}
      <table className="log-table">
        <thead>
          <tr>
            <th>Time Fall Asleep</th>
            <th>Time Wake Up</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {sleep.map((sleep, index) => (
            <tr key={index}>
              <td>{sleep.timeFallAsleep}</td>
              <td>{sleep.timeWakeUp}</td>
              <td>{sleep.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Input section for adding a new meal */}
      <div className="sleep-input">
        <input
          type="text"
          name="timeFallAsleep"
          placeholder="10:00"
          value={newSleep.timeFallAsleep}
          onChange={handleChange}
        />
        <input
          type="text"
          name="timeWakeUp"
          placeholder="8:00"
          value={newSleep.timeWakeUp}
          onChange={handleChange}
        />
        <input
          type="number"
          name="hours"
          placeholder="hours"
          value={newSleep.hours}
          onChange={handleChange}
        />
        

        {/* Button to add sleep to the list */}
        <button onClick={handleAddSleep}>Add Sleep</button>
      </div>
    </div>
  );
}

export default SleepLog;
