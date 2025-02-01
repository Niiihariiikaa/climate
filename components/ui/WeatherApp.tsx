"use client"
import React, { useState } from "react";

// Crop Data
const crops = [
  {
    name: "Wheat",
    temperature: { min: 10, max: 25 }, // in °C
    rainfall: { min: 500, max: 800 }, // in mm
    description: "Grows well in cool climates with moderate rainfall.",
  },
  {
    name: "Rice",
    temperature: { min: 20, max: 35 },
    rainfall: { min: 1000, max: 2000 },
    description: "Requires warm temperatures and high rainfall.",
  },
  {
    name: "Maize",
    temperature: { min: 18, max: 30 },
    rainfall: { min: 600, max: 1200 },
    description: "Thrives in warm climates with moderate rainfall.",
  },
  {
    name: "Potato",
    temperature: { min: 15, max: 25 },
    rainfall: { min: 300, max: 500 },
    description: "Prefers cool climates with well-distributed rainfall.",
  },
  {
    name: "Tomato",
    temperature: { min: 20, max: 30 },
    rainfall: { min: 400, max: 800 },
    description: "Grows best in warm climates with moderate rainfall.",
  },
  {
    name: "Soybean",
    temperature: { min: 20, max: 30 },
    rainfall: { min: 500, max: 1000 },
    description: "Requires warm temperatures and moderate rainfall.",
  },
  {
    name: "Barley",
    temperature: { min: 12, max: 25 },
    rainfall: { min: 300, max: 600 },
    description: "Grows in cool climates with low to moderate rainfall.",
  },
  {
    name: "Cotton",
    temperature: { min: 20, max: 35 },
    rainfall: { min: 500, max: 1000 },
    description: "Requires warm temperatures and moderate rainfall.",
  },
  {
    name: "Sunflower",
    temperature: { min: 18, max: 30 },
    rainfall: { min: 400, max: 800 },
    description: "Thrives in warm climates with moderate rainfall.",
  },
  {
    name: "Sugarcane",
    temperature: { min: 20, max: 35 },
    rainfall: { min: 1500, max: 2500 },
    description: "Requires hot temperatures and high rainfall.",
  },
  {
    name: "Coffee",
    temperature: { min: 15, max: 25 },
    rainfall: { min: 1500, max: 2500 },
    description: "Grows in tropical climates with high rainfall.",
  },
  {
    name: "Tea",
    temperature: { min: 15, max: 25 },
    rainfall: { min: 1500, max: 2500 },
    description: "Prefers cool, humid climates with high rainfall.",
  },
];
// Weather Data Interface
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

// FinalInputCard Component
interface FinalInputCardProps {
  onSearch: (location: string) => void;
}

const FinalInputCard: React.FC<FinalInputCardProps> = ({ onSearch }) => {
  const [location, setLocation] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    } else {
      alert("Please enter a city or country name.");
    }
  };

  return (
    <div className="w-[350px] md:w-[400px] bg-black/30 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,255,128,0.1)] border border-green-400/20 text-white flex flex-col gap-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,255,128,0.2)]">
      <h2 className="text-3xl font-bold tracking-wide text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
        Weather Insights
      </h2>
      <div className="relative">
        <input
          type="text"
          placeholder="Enter City or Country..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/5 text-white placeholder-white/50 border border-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
        />
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-xl" />
      </div>
      <button
        onClick={handleSubmit}
        className="relative overflow-hidden group bg-gradient-to-r from-green-400/10 to-blue-400/10 text-white py-4 rounded-xl shadow-lg border border-white/10 transition-all duration-300 hover:border-green-400/30"
      >
        <span className="relative z-10 flex items-center justify-center gap-2 font-medium group-hover:text-white transition-colors">
          <span className="text-lg">🔍</span> Get Weather
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </button>
    </div>
  );
};

// FinalOutput Component
interface FinalOutputProps {
  weatherData: WeatherData | null;
}

const FinalOutput: React.FC<FinalOutputProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="w-full bg-black/30 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,255,128,0.1)] border border-green-400/20 text-white flex flex-col gap-8 transition-all duration-300">
      <h2 className="text-3xl font-bold tracking-wide text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
        Current Weather
      </h2>
      <div className="text-center space-y-4">
        <p className="text-4xl font-semibold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          {weatherData.location.name}, {weatherData.location.country}
        </p>
        <p className="text-7xl font-bold mt-4 text-white">
          {weatherData.current.temp_c}°C
        </p>
        <p className="text-green-400/80 italic">{weatherData.location.localtime}</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-wide text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          5-Day Forecast
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weatherData.forecast.forecastday.map((day, index) => (
            <div
              key={index}
              className="group relative bg-black/20 p-6 rounded-2xl border border-white/10 hover:border-green-400/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <p className="font-medium text-lg text-green-400">{day.date}</p>
                <p className="text-2xl mt-2 font-semibold">{day.day.avgtemp_c}°C</p>
                <p className="text-sm mt-1 text-blue-400">
                  {day.day.daily_chance_of_rain}% Rain Chance
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Crop Recommendation Component
const CropRecommendation: React.FC<{ weatherData: WeatherData | null }> = ({
  weatherData,
}) => {
  if (!weatherData) return null;

  const recommendCrops = (weatherData: WeatherData) => {
    if (!weatherData.current || !weatherData.forecast) return [];
  
    const { temp_c: temperature } = weatherData.current;
    const totalRainfall = weatherData.forecast.forecastday.reduce(
      (sum, day) => sum + (day.day.daily_chance_of_rain || 0),
      0
    );
  
    // Allow a 10% buffer for temperature and rainfall
    const buffer = 0.9;
  
    return crops.filter((crop) => {
      const isTempSuitable =
        temperature >= crop.temperature.min * (1 - buffer) &&
        temperature <= crop.temperature.max * (1 + buffer);
      const isRainfallSuitable =
        totalRainfall >= crop.rainfall.min * (1 - buffer) &&
        totalRainfall <= crop.rainfall.max * (1 + buffer);
      return isTempSuitable && isRainfallSuitable;
    });
  };

  const recommendedCrops = recommendCrops(weatherData);

  return (
    <div className="w-full bg-black/30 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,255,128,0.1)] border border-green-400/20 text-white flex flex-col gap-8 transition-all duration-300">
      <h2 className="text-3xl font-bold tracking-wide text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
        🌱 Recommended Crops
      </h2>
      {recommendedCrops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCrops.map((crop, index) => (
            <div
              key={index}
              className="group relative bg-black/20 p-6 rounded-2xl border border-white/10 hover:border-green-400/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <h3 className="font-medium text-lg text-green-400">{crop.name}</h3>
                <p className="text-sm mt-2 text-white/80">{crop.description}</p>
                <div className="mt-4">
                  <p className="text-sm">
                    🌡 Temperature: {crop.temperature.min}°C - {crop.temperature.max}°C
                  </p>
                  <p className="text-sm">
                    🌧 Rainfall: {crop.rainfall.min}mm - {crop.rainfall.max}mm
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white/80">
          No crops recommended for the current weather conditions.
        </p>
      )}
    </div>
  );
};

// WeatherApp Component
const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleSearch = async (location: string): Promise<void> => {
    const API_KEY = "6df0fbdc8b8c4ff0a6e94314253101";
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=5&aqi=yes`
      );
      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching the weather data: ", error);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto space-y-8">
      <div className="flex justify-center">
        <FinalInputCard onSearch={handleSearch} />
      </div>
      <div className="transition-all duration-500 ease-in-out">
        {weatherData && (
          <>
            <FinalOutput weatherData={weatherData} />
            <CropRecommendation weatherData={weatherData} />
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;