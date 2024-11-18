import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './DatePicker.css';

function DatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar-section">
      <h3>{selectedDate.toDateString()}</h3>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="date-picker"
      />
      
    </div>
  );
}

export default DatePicker;