import React from 'react';


const DailyWeatherCard = ({ day, handleClick }) => {
  
  return (
    <div className="daily-card" onClick={() => handleClick(day)}>
      <p>{day.date.split(' ')[0]}</p>
      <p>High: {day.highTemp}°F</p>
      <p>Low: {day.lowTemp}°F</p>
    </div>
  );
};

export default DailyWeatherCard;