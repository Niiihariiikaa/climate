"use client"
import { useState } from 'react';

export default function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const getWeatherData = async () => {
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      } else {
        console.error("Failed to fetch weather data");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <h1>Weather Information</h1>
      <input
        type="number"
        placeholder="Enter latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter longitude"
        value={lon}
        onChange={(e) => setLon(e.target.value)}
      />
      <button onClick={getWeatherData}>Get Weather</button>

      {weather && (
        <div>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.wind_speed} m/s</p>
          <p>Rainfall: {weather.rainfall} mm</p>
          <p>Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}
