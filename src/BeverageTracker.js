import React, { useState } from 'react';
import axios from 'axios';

function BeverageLog() {
  const [beverage, setBeverage] = useState([{name: 'Water', ounces: '64'}]);
  const [newBeverage, setNewBeverage] = useState({ name: '', ounces: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBeverage({
      ...newBeverage,
      [name]: value});
  };

  const handleAddBeverage = () => {
    setBeverage([...beverage, newBeverage]);
    setNewBeverage({ name: '', ounces: '' });
  };

  return (
    <div className="log-section">
      <h3>Beverage</h3>

      {/* Table for displaying beverage logs */}
      <table className="log-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Ounces</th>
          </tr>
        </thead>
        <tbody>
          {beverage.map((beverage, index) => (
            <tr key={index}>
              <td>{beverage.name}</td>
              <td>{beverage.ounces}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Input section for adding a new meal */}
      <div className="beverage-input">
        <input
          type="text"
          name="name"
          placeholder="Water"
          value={newBeverage.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="ounces"
          placeholder="8:00"
          value={newBeverage.ounces}
          onChange={handleChange}
        />
        

        {/* Button to add sleep to the list */}
        <button onClick={handleAddBeverage}>Add Beverage</button>
      </div>
    </div>
  );
}

export default BeverageLog;
