import React, { useState } from 'react';
import './MoodTracker.css'; // Import custom styles

function MoodTracker() {
  const [mood, setMood] = useState(null);
  const [energyLevel, setEnergyLevel] = useState(50);
  const [overwhelmedLevel, setOverwhelmedLevel] = useState(50);

  // Mood options with emoji
  const moodOptions = [
    { label: 'Very Happy', icon: '😊' },
    { label: 'Happy', icon: '🙂' },
    { label: 'Neutral', icon: '😐' },
    { label: 'Sad', icon: '🙁' },
    { label: 'Very Sad', icon: '😢' },
  ];

  return (
    <div className="mood-tracker-container">
      <div className="card no-background">
        <h3>{`Today's Date: ${new Date().toDateString()}`}</h3>
        <h3>{`Today's Mood: ${mood !== null ? moodOptions[mood].label : 'None'}`}</h3>
        {/* Mood Selection */}
        <div className="mood-selection-section">
          <h4>How was your mood?</h4>
          <div className="mood-options">
            {moodOptions.map((option, index) => (
              <button
                key={index}
                className={`mood-button ${mood === index ? 'selected' : ''}`}
                onClick={() => setMood(index)}
                aria-label={option.label}
              >
                <span className="mood-icon">{option.icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Energy Level Slider */}
        <div className="energy-level-section">
          <h4>What was your energy level? ({energyLevel}%)</h4>
          <input
            type="range"
            min="0"
            max="100"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(e.target.value)}
            className="energy-slider"
          />
          <div className="slider-labels">
            <span>Not set</span>
            <span>20%</span>
            <span>40%</span>
            <span>60%</span>
            <span>80%</span>
            <span role="img" aria-label="high energy">
              ⚡ 100%
            </span>
          </div>
        </div>

        {/* Overwhelmed/Busy Level Slider */}
        <div className="overwhelmed-level-section">
          <h4>How overwhelmed/busy were you? ({overwhelmedLevel}%)</h4>
          <input
            type="range"
            min="0"
            max="100"
            value={overwhelmedLevel}
            onChange={(e) => setOverwhelmedLevel(e.target.value)}
            className="overwhelmed-slider"
          />
          <div className="slider-labels">
            <span>Not set</span>
            <span>20%</span>
            <span>40%</span>
            <span>60%</span>
            <span>80%</span>
            <span role="img" aria-label="overwhelmed">
              😵‍💫 100%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoodTracker;
