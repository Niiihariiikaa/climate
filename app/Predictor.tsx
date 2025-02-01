"use client";
import { useState } from "react";

export default function PredictForm() {
  const featureNames = [
    "Temperature (°C)",
    "Humidity (%)",
    "Soil Moisture (%)",
    "Rainfall (mm)",
    "Sunlight (hours/day)",
    "Soil Type",
    "Fertilizer Used (kg/ha)",
    "Crop Type",
    "Pesticide/Insecticide Applied?",
  ];

  const [features, setFeatures] = useState<string[]>(Array(featureNames.length).fill(""));
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    const featureValues = features.map(Number);
    console.log("Submitting features:", featureValues);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features: featureValues }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Prediction Response:", data);
      setPrediction(data.prediction);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error fetching prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent p-6">
      <div className="bg-black shadow-lg rounded-lg p-6 max-w-4xl w-full">
        <h1 className="text-xl font-semibold text-center text-white mb-4">
          🌾 Crop Damage Prediction
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {featureNames.map((name, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-white font-medium">{name}</label>
              {index === 5 || index === 7 ? (
                <select
                  value={features[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="p-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="">Select {name}</option>
                  {index === 5 ? (
                    <>
                      <option value="Sandy">Sandy</option>
                      <option value="Clay">Clay</option>
                      <option value="Loam">Loam</option>
                    </>
                  ) : (
                    <>
                      <option value="Wheat">Wheat</option>
                      <option value="Rice">Rice</option>
                      <option value="Maize">Maize</option>
                    </>
                  )}
                </select>
              ) : (
                <input
                  type="number"
                  value={features[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder={`Enter ${name}`}
                  className="p-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                />
              )}
            </div>
          ))}

          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Get Prediction"}
            </button>
          </div>
        </form>

        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        {prediction && (
          <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 rounded-md shadow">
            <p className="font-semibold text-green-800">🌱 Prediction Result:</p>
            <p className="text-lg font-bold text-gray-900">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
}
