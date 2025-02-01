"use client";
import React, { useState } from "react";
import WeatherApp from "../components/ui/WeatherApp";

const Hero: React.FC = () => {
  const [showWeatherApp, setShowWeatherApp] = useState<boolean>(false);

  const handleButtonClick = (): void => {
    setShowWeatherApp((prev) => !prev); // Toggle visibility of the WeatherApp
  };

  return (
    <div className="flex h-[100vh] w-full justify-center items-center flex-col bg-black p-8 gap-8">
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        {showWeatherApp ? "Hide Weather App" : "Show Weather App"}
      </button>

      {showWeatherApp && <WeatherApp />}
    </div>
  );
};

export default Hero;
