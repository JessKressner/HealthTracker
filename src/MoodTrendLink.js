import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import { useNavigate } from 'react-router-dom';
import './MoodTrendLink.css';
import SleepTracker from './SleepTracker.js';
import BeverageTracker from './BeverageTracker.js';
import FitnessLog from './FitnessLog.js';
import DietLog from './DietLog.js';
import MoodTracker from './MoodTracker.js';

function MoodTrendLink() {
  const navigate = useNavigate();

  // Data for the mood, diet, and fitness trend analysis
  // Chart options
  const options = {
    curveType: 'function',
    legend: { position: 'bottom' },
    chartArea: {width: '90%', height: '75%'}
  };

  // State for sleep data fetched from SleepTracker
  const [sleepChartData, setSleepChartData] = useState([['Date', 'Hours']]);

  // Callback function to update sleep data
  const handleSleepDataUpdate = (data) => {
    const formattedData = [['Date', 'Hours']];
    data.forEach((entry) => {
      if (entry.date && entry.hours) {
        formattedData.push([entry.date, parseFloat(entry.hours)]);
      }
    });

    setSleepChartData(formattedData);
  };

  // State for beverage data fetched from BeverageTracker
  const [beverageChartData, setBeverageChartData] = useState([['Name', 'Ounces']]);

  // Callback function to update beverage data
  const handleBeverageDataUpdate = (data) => {
    // function to calculate total of each beverage type
    const beverageTotals = data.reduce((acc, item) => {
      const { name, ounces } = item;
      if (!name || !ounces) return acc;
      acc[name] = (acc[name] || 0) + parseFloat(ounces);
      return acc;
    }, {});

    const beverageData = [['Beverage Type', 'Total Ounces']];
    for (const [name, total] of Object.entries(beverageTotals)) {
      beverageData.push([name, total]);
    }

    setBeverageChartData(beverageData);
  };

   // State for fitness data fetched from FitnessTracker
   const [fitnessChartData, setFitnessChartData] = useState([['Activity', 'Duration']]);

   // Callback function to update fitness data
   const handleFitnessDataUpdate = (data) => {
     // function to calculate total of each fitness type
     const fitnessTotals = data.reduce((acc, item) => {
       const { activity, duration } = item;
       if (!activity || !duration) return acc;
       acc[activity] = (acc[activity] || 0) + parseFloat(duration);
       return acc;
     }, {});
 
     const fitnessData = [['Activity', 'Duration']];
     Object.entries(fitnessTotals).forEach(([activity, total]) => {
      fitnessData.push([activity, total]);
    });

     setFitnessChartData(fitnessData);
   };

    // State and callback for diet data
  const [dietChartData, setDietChartData] = useState([['Name', 'Calories']]);
  const handleDietDataUpdate = (data) => {
    const formattedData = [['Name', 'Calories']];
    data.forEach(({ name, calories }) => {
      if (name && calories) formattedData.push([name, parseFloat(calories)]);
    });
    setDietChartData(formattedData);
  };

  
  return (
    <div className="moodtrendlink-page">
      <h1>Trend Analysis</h1>
      <p>Analyze how different habits correlates with your dietary habits, exercise routine, and sleep routine.</p>

      <div className="card-container">

        {/* Diet Trend Chart */}
        <div className="chart-card">
          <h2>Diet Trend</h2>
          <Chart
            chartType="BarChart"
            width="100%"
            height="300px"
            data={dietChartData}
            options={{ ...options, title: 'Diet Trend', legend: {position: 'bottom'}, }}
          />
        </div>

        {/* Fitness Trend Chart */}
        <div className="chart-card">
          <h2>Fitness Trend</h2>
          <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={fitnessChartData}
            options={{ title: 'Fitness Distribution' }}
          />
        </div>

        <div className="chart-card">
          <h2>Sleep Trend</h2>
          <Chart
          chartType="LineChart"
          width="100%"
          height="300px"
          data={sleepChartData}
          options={{title: 'Sleep Distribution', hAxis: {title: 'Date'}, vAxis: {title: 'Hours'}, legend: {position: 'bottom'},}}
          />
        </div>

        <div className="chart-card">
          <h2>Beverage Trend</h2>
          <Chart
          chartType="PieChart"
          width="100%"
          height="300px"
          data={beverageChartData}
          options={{title: 'Beverage Distribution'}}
          />
        </div>
      </div>


      <button onClick={() => navigate('/dashboard')} className="back-button">
        Back to Homepage
      </button>
      {/* SleepTracker Component */}
      <SleepTracker onSleepDataChange={handleSleepDataUpdate} />

      {/* BeverageTracker Component */}
      <BeverageTracker onBeverageDataChange={handleBeverageDataUpdate} />  

      {/* Fitness Log Component  */}
      <FitnessLog onFitnessDataChange={handleFitnessDataUpdate}/> 

      {/* Diet Trend Log Component */}
      <DietLog onDietDataChange={handleDietDataUpdate} /> 

      {/* Button to navigate back to the Dashboard */} 
    </div>
  );
}

export default MoodTrendLink;
