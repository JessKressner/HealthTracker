import React, { useState } from 'react'; 
import './MoodTracker.css'; 

function MoodTracker({onMoodDataChange}) {
  //Defaults upon opening
  const [mood, setMood] = useState(null); 
  const [energyLevel, setEnergyLevel] = useState(50); 
  const [overwhelmedLevel, setOverwhelmedLevel] = useState(50); 
  const [moodLog, setMoodLog] = useState(() => {
    const savedMoodLog = localStorage.getItem('moodLog');
    return savedMoodLog ? JSON.parse(savedMoodLog) : []; // Retrieve mood log from localStorage or use empty array
  });

  // Options for mood selection, each with a label and an icon.
  const moodOptions = [
    { label: 'Very Happy', icon: '😊' },
    { label: 'Happy', icon: '🙂' },
    { label: 'Neutral', icon: '😐' },
    { label: 'Sad', icon: '🙁' },
    { label: 'Very Sad', icon: '😢' },
  ];

  // Function to handle saving the current mood and related data.
  const handleSaveMood = () => {
    if (mood === null) {
      alert('Please select a mood before saving.'); // Alert if no mood is selected.
      return; // Exit function if no mood is selected.
    }
    // Create a new entry with the selected mood, energy level, overwhelmed level, and current date.
    const newEntry = {
      date: new Date().toLocaleDateString(),
      mood: moodOptions[mood].label,
      energyLevel,
      overwhelmedLevel,
    };
    
    const updatedMoodLog = [...moodLog, newEntry];
    setMoodLog(updatedMoodLog);
    localStorage.setItem('moodLog', JSON.stringify(updatedMoodLog)); // Save mood log to localStorage

    onMoodDataChange(updatedMoodLog);
    // Reset the state variables for mood, energy level, and overwhelmed level to their default values.
    setMood(null);
    setEnergyLevel(50);
    setOverwhelmedLevel(50);
  };

  // Function to handle deleting a mood log entry.
  const handleDelete = (index) => {
    const updatedMoodLog = moodLog.filter((_, i) => i !== index); // Remove entry by index
    setMoodLog(updatedMoodLog);
    localStorage.setItem('moodLog', JSON.stringify(updatedMoodLog)); // Save the updated log to localStorage
  };

  // The return statement defines the component's UI structure.
  return (
    <div className="mood-tracker-container">
      <div className="card no-background">
        <h3>{`Today's Date: ${new Date().toDateString()}`}</h3> {/* Display today's date */}
        <h3>{`Today's Mood: ${mood !== null ? moodOptions[mood].label : 'None'}`}</h3> {/* Display the selected mood or "None" if not selected */}

        {/* Mood selection section */}
        <div className="mood-selection-section">
          <h4>How was your mood?</h4>
          <div className="mood-options">
            {moodOptions.map((option, index) => (
              <button
                key={index} // Unique key for each button
                className={`mood-button ${mood === index ? 'selected' : ''}`} // Add 'selected' class if the button matches the selected mood.
                onClick={() => setMood(index)} // Set the selected mood index when clicked.
              >
                <span className="mood-icon">{option.icon}</span> {/* Display the mood icon */}
              </button>
            ))}
          </div>
        </div>

        {/* Energy level slider section */}
        <div className="energy-level-section">
          <h4>What was your energy level? ({energyLevel}%)</h4> {/* Display the current energy level */}
          <input
            type="range"
            min="0"
            max="100"
            value={energyLevel} // Bind slider value to state
            onChange={(e) => setEnergyLevel(Number(e.target.value))} // Update state on slider change
            className="energy-slider"
          />
        </div>

        {/* Overwhelmed level slider section */}
        <div className="overwhelmed-level-section">
          <h4>How overwhelmed/busy were you? ({overwhelmedLevel}%)</h4> {/* Display the current overwhelmed level */}
          <input
            type="range"
            min="0"
            max="100"
            value={overwhelmedLevel} // Bind slider value to state
            onChange={(e) => setOverwhelmedLevel(Number(e.target.value))} // Update state on slider change
            className="overwhelmed-slider"
          />
        </div>

        {/* Save mood button */}
        <button onClick={handleSaveMood} className="save-button">
          Save Mood
        </button>

        {/* Mood log table */}
        <div className="mood-log-section">
          <h4>Mood Log</h4>
          <table className="log-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Mood</th>
                <th>Energy Level</th>
                <th>Overwhelmed Level</th>
                <th>Action</th> {/* Column for Delete button */}
              </tr>
            </thead>
            <tbody>
              {moodLog.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.mood}</td>
                  <td>{entry.energyLevel}%</td>
                  <td>{entry.overwhelmedLevel}%</td>
                  <td>
                    <button
                      onClick={() => handleDelete(index)} // Trigger handleDelete when clicked
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MoodTracker; 
