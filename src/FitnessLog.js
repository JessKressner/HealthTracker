import React, { useState, useEffect } from 'react';

function FitnessLog({onFitnessDataChange = () => {}}) {
  const [activity, setActivity] = useState(() => {
    const savedActivity = localStorage.getItem('fitnessData');
  return savedActivity ? JSON.parse(savedActivity) : [];
  });

  const [newActivity, setNewActivity] = useState({activity: '', duration: '', caloriesBurned: '' })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const handleAddActivity = () => {
    const updatedActivity = [...activity, newActivity];
    setActivity(updatedActivity);
    localStorage.setItem('fitnessData', JSON.stringify(updatedActivity));
    setNewActivity({ activity: '', duration: '', caloriesBurned: '' });
    onFitnessDataChange(updatedActivity);
  };

  useEffect(() => {
    onFitnessDataChange(activity);
  }, [activity, onFitnessDataChange]);

  const handleDeleteActivity = (indexToDelete) => {
    const updatedActivity = activity.filter((_, index) => index != indexToDelete);
    setActivity(updatedActivity);
    localStorage.setItem('fitnessData', JSON.stringify(updatedActivity));
    onFitnessDataChange(updatedActivity);
  };

  return (
    <div className="log-section">
      <h3>Fitness Activities</h3>
      <table className="log-table">
        <thead>
          <tr>
            <th>Activity</th>
            <th>Duration</th>
            <th>Calories Burned</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {activity.map((activity, index) => (
            <tr key={index}>
              <td>{activity.activity}</td>
              <td>{activity.duration}</td>
              <td>{activity.caloriesBurned}</td>
              <td>
                <button onClick={() => handleDeleteActivity(index)}>
                  Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Fitness input fields */}
      <div className="activity-input">
        <input
          type="text"
          name="activity"
          placeholder="Activity"
          value={newActivity.activity}
          onChange={handleChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={newActivity.duration}
          onChange={handleChange}
        />
        <input
          type="number"
          name="caloriesBurned"
          placeholder="Calories Burned"
          value={newActivity.caloriesBurned}
          onChange={handleChange}
        />
        <button onClick={handleAddActivity}>Add Activity</button>
      </div>

      <img 
        src="https://as2.ftcdn.net/v2/jpg/03/22/60/31/1000_F_322603152_hWEyrUbRJq9BTJ1hAkBhz6XAOJ8fl0HJ.jpg"
        alt="Health Tips"
        className="health-tips-image" 
      />
    </div>
  );
}

export default FitnessLog;