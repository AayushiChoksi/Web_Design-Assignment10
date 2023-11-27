import React, { useState, useEffect } from 'react';
import DailyWeatherCard from './components/DailyWeatherCard';
import HourlyForecast from './components/HourlyForecast';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null); 
  const [hourlyData, setHourlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null)

  

  useEffect(() => {
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?zip=94040,us&appid=b6ae7c905fc75a5762b15a3cd573a11b`;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
       
        const processedData = data.list.map((item) => ({
          date: item.dt_txt.split(' ')[0],
          time: item.dt_txt.split(' ')[1],
          highTemp: item.main.temp_max,
          lowTemp: item.main.temp_min,
          weatherType: item.weather[0].main.toLowerCase() 
        }));
        
        const dayData = [];
        
        processedData.forEach(data => {
          const { date, highTemp, lowTemp, weatherType } = data;
          const dayDataexist = dayData.findIndex(item => item.date === date);
        
          if (dayDataexist === -1) {
            dayData.push({ date, highTemp, lowTemp, weatherType });
          } else {
            if (highTemp > dayData[dayDataexist].highTemp) {
              dayData[dayDataexist].highTemp = highTemp;
            }
            if (lowTemp < dayData[dayDataexist].lowTemp) {
              dayData[dayDataexist].lowTemp = lowTemp;
            }
          }
        });
        
        setWeatherData(processedData);
console.log(processedData)
        setDailyData(dayData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, []);

  const handleDayClick = (day) => {
    const selectedDayHourlyData = weatherData.filter(
      (data) => 
        data.date.split(' ')[0] === day.date.split(' ')[0]
    );
    setSelectedDay(day); 
    console.log(selectedDayHourlyData)
    setHourlyData(selectedDayHourlyData);
  };

  return (
    <div className="app">
      <h1>5-Day Weather Forecast</h1>
      <div className="forecast-container">
        {dailyData ? (
          dailyData.map((day, index) => (
            <DailyWeatherCard
              key={index}
              day={day}
              handleClick={() => handleDayClick(day)}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {selectedDay && hourlyData ? (
        <HourlyForecast hourlyData={hourlyData} />
      ) :(<p>No hourly data available.</p>
      )}
    </div>
  );
};

export default App;