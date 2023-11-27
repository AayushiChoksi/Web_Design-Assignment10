import React from "react";
import sunnyIcon from "../assets/sunny.png";
import rainyIcon from "../assets/rainy.png";
import cloudyIcon from "../assets/cloudy.png";
import snowyIcon from "../assets/snowy.png";
const HourlyForecast = ({ hourlyData }) => {
  const getWeatherIcon = (weatherType) => {
    switch (weatherType.toLowerCase()) {
      case "clear":
        return sunnyIcon;
      case "rain":
        return rainyIcon;
      case "clouds":
        return cloudyIcon;
      case "snow":
        return snowyIcon;
    }
  };
  
  return (
    <div className="hourly-forecast">
      <h2>Hourly Forecast </h2>
      <div className="hourly-container">
        {hourlyData.map((hour, index) => (
          <div key={index} className="hourly-card">
            {getWeatherIcon(hour.weatherType) && (
              <img
                src={getWeatherIcon(hour.weatherType)}
                alt={hour.weatherType}
                style={{ width: "50px", height: "50px" }}
              />
            )}
            <p>{hour.time}</p>
            <p>High: {hour.highTemp}°F</p>
            <p>Low: {hour.lowTemp}°F</p>
            <p>Weather: {hour.weatherType}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
