import React from 'react';
import { Chart } from 'react-google-charts';
import { useNavigate } from 'react-router-dom';
import './MoodTrendLink.css';

function MoodTrendLink() {
  const navigate = useNavigate();

  // Data for the mood, diet, and fitness trend analysis
  const moodData = [
    ['Date', 'Mood Score'],
    ['2024-11-01', 3],
    ['2024-11-02', 4],
    ['2024-11-03', 5],
    ['2024-11-04', 2],
    ['2024-11-05', 4],
  ];

  const dietData = [
    ['Date', 'Healthy Meals'],
    ['2024-11-01', 2],
    ['2024-11-02', 3],
    ['2024-11-03', 4],
    ['2024-11-04', 1],
    ['2024-11-05', 3],
  ];

  const exerciseData = [
    ['Date', 'Minutes of Fitness'],
    ['2024-11-01', 30],
    ['2024-11-02', 45],
    ['2024-11-03', 60],
    ['2024-11-04', 20],
    ['2024-11-05', 40],
  ];

  // Chart options
  const options = {
    curveType: 'function',
    legend: { position: 'bottom' },
  };

  return (
    <div className="moodtrendlink-page">
      <h1>Detailed Mood, Diet, and Fitness Analysis</h1>
      <p>Analyze how your mood correlates with your dietary habits and exercise routine.</p>

      <div className="card-container">
        {/* Mood Trend Chart */}
        <div className="chart-card">
          <h2>Mood Trend</h2>
          <Chart
            chartType="LineChart"
            width="100%"
            height="300px"
            data={moodData}
            options={{ ...options, title: 'Mood Trend Over Time' }}
          />
        </div>

        {/* Diet Trend Chart */}
        <div className="chart-card">
          <h2>Diet Trend</h2>
          <Chart
            chartType="BarChart"
            width="100%"
            height="300px"
            data={dietData}
            options={{ ...options, title: 'Diet Trend Over Time' }}
          />
        </div>

        {/* Fitness Trend Chart */}
        <div className="chart-card">
          <h2>Fitness Trend</h2>
          <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={[
              ['Activity', 'Minutes'],
              ['2024-11-01', 30],
              ['2024-11-02', 45],
              ['2024-11-03', 60],
              ['2024-11-04', 20],
              ['2024-11-05', 40],
            ]}
            options={{ title: 'Fitness Distribution Over Time' }}
          />
        </div>
      </div>

      {/* Button to navigate back to the Dashboard */}
      <button onClick={() => navigate('/dashboard')} className="back-button">
        Back to Homepage
      </button>
    </div>
  );
}

export default MoodTrendLink;
