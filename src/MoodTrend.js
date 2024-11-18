import React from 'react';
import { Chart } from 'react-google-charts';
import { useNavigate } from 'react-router-dom';
import './MoodTrend.css';

function MoodTrend() {
  const navigate = useNavigate();

  // Data for the mood trend chart
  const data = [
    ['Date', 'Mood Score'],
    ['2024-11-01', 3],
    ['2024-11-02', 4],
    ['2024-11-03', 5],
    ['2024-11-04', 2],
    ['2024-11-05', 4],
  ];

  // Chart options
  const options = {
    title: 'Mood Trend Over Time',
    titleTextStyle: { fontSize: 16 },
    curveType: 'function',
    legend: { position: 'bottom', textStyle: { fontSize: 12 } },
    hAxis: { textStyle: { fontSize: 10 }, slantedText: true, slantedTextAngle: 45 },
    vAxis: { textStyle: { fontSize: 10 }, minValue: 0, maxValue: 6 },
    colors: ['#599bc1'],
    lineWidth: 4,
    pointSize: 7,
    chartArea: { left: 50, right: 20, top: 20, bottom: 50, width: '85%', height: '70%' },
  };

  return (
    <div className="mood-trend-container">
      <h3 className="dashboard-title">Mood Trend Analysis</h3>
      
       {/* Mood Trend Chart */}
      <div className="chart-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
        <Chart
          chartType="LineChart"
          width="100%"
          height="350px"
          data={data}
          options={options}
        />
      </div>

      {/* Button to navigate to the detailed analysis page */}
      <button onClick={() => navigate('/moodtrendlink')} className="analysis-button">
         Detailed Mood Trend Analysis
      </button>

      <img 
        src="http://www.cmyers.com/wp-content/uploads/2020/01/mood-scaled.jpg"
        alt="Health Tips"
        className="health-tips-image" 
      />
    </div>

  );
}

export default MoodTrend;