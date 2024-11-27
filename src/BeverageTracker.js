import React, { useState, useEffect } from 'react';
import axios from 'axios';

// checks if there is beverage data in local storage and initalize empty array if false
function BeverageTracker({onBeverageDataChange =() => {}}) {
  const [beverage, setBeverage] = useState(() => {
    const savedBeverage = localStorage.getItem('beverageData');
    return savedBeverage ? JSON.parse(savedBeverage) : [];
  });

  // tracks the new sleep entry that the user inputs
  const [newBeverage, setNewBeverage] = useState({ name: '', ounces: ''});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBeverage({
      ...newBeverage,
      [name]: value});
  };

  // adss the new beverage entry to the sleep list, saves the data to local storage, and resets the input fields
  const handleAddBeverage = (e) => {
  if (newBeverage.name && newBeverage.ounces) {
   const updatedBeverage = [...beverage, newBeverage];
   setBeverage(updatedBeverage);
   localStorage.setItem('beverageData', JSON.stringify(updatedBeverage));
   setNewBeverage({ name: '', ounces: '' });
   onBeverageDataChange(updatedBeverage);
  } else {
    alert("Please fill in all fields");
  }
 };

 // if beverage state changes update in local storage
 useEffect(() => {
  onBeverageDataChange(beverage);
 }, [beverage, onBeverageDataChange]);

 // deletes specified log entry
 const handleDeleteSleep = (indexToDelete) => {
  const updatedBeverage = beverage.filter((_, index) => index !== indexToDelete);
  setBeverage(updatedBeverage);
  localStorage.setItem('beverageData', JSON.stringify(updatedBeverage));
  onBeverageDataChange(updatedBeverage);
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {beverage.map((beverage, index) => (
            <tr key={index}>
              <td>{beverage.name}</td>
              <td>{beverage.ounces}</td>
              <td>
                <button onClick={() => handleDeleteSleep(index)}>
                  Delete
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Input section for adding a new meal */}
      <div className="beverage-input">

        {/* Input the beverage type*/}
        <input
          type="text"
          name="name"
          placeholder="Beverage Type"
          value={newBeverage.name}
          onChange={handleChange}
        />

        {/* Input the beverage ounces */}
        <input
          type="number"
          name="ounces"
          placeholder="8"
          value={newBeverage.ounces}
          onChange={handleChange}
        />
        

        {/* Button to add sleep to the list */}
        <button onClick={handleAddBeverage}>Add Beverage</button>        
      </div>
    </div>
  )};

export default BeverageTracker;
