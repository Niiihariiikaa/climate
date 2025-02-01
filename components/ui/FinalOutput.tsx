import React from "react";

interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: number;
        daily_chance_of_rain: number;
      };
    }[];
  };
}

interface FinalOutputProps {
  weatherData: WeatherData | null;
}

const FinalOutput: React.FC<FinalOutputProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="w-full bg-gradient-to-br from-purple-700 to-indigo-600 p-8 rounded-3xl shadow-2xl border border-white/20 text-white flex flex-col gap-8 backdrop-blur-xl hover:shadow-3xl transition-shadow duration-300">
      <h2 className="text-3xl font-extrabold tracking-wide text-center drop-shadow-md">
        🌍 Current Weather
      </h2>
      <div className="text-center">
        <p className="text-4xl font-semibold">
          {weatherData.location.name}, {weatherData.location.country}
        </p>
        <p className="text-7xl font-bold mt-4">{weatherData.current.temp_c}°C</p>
        <p className="text-white/80 italic mt-2">{weatherData.location.localtime}</p>
      </div>

      {/* Forecast Section */}
      <h2 className="text-2xl font-bold tracking-wide text-center">🌦 5-Day Forecast</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {weatherData.forecast.forecastday.map((day, index) => (
          <div
            key={index}
            className="bg-white/20 p-6 rounded-2xl shadow-lg backdrop-blur-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 text-white border border-white/30"
          >
            <p className="font-semibold text-lg">{day.date}</p>
            <p className="text-2xl mt-2">🌡 {day.day.avgtemp_c}°C</p>
            <p className="text-sm mt-1">🌧 {day.day.daily_chance_of_rain}% Rain</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinalOutput;