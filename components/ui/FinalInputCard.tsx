import React, { useState } from "react";

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
    <div className="w-[350px] md:w-[400px] bg-gradient-to-br from-purple-700 to-indigo-600 p-8 rounded-3xl shadow-2xl border border-white/20 text-white flex flex-col gap-6 backdrop-blur-lg hover:shadow-3xl transition-shadow duration-300">
      <h2 className="text-3xl font-bold tracking-wide text-center drop-shadow-md">
        🌍 Search Weather
      </h2>
      <input
        type="text"
        placeholder="Enter City or Country..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
      />
      <button
        onClick={handleSubmit}
        className="bg-white/20 text-white py-3 rounded-lg shadow-lg border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
      >
        🔍 Get Weather
      </button>
    </div>
  );
};

export default FinalInputCard;