import { useState } from 'react';
import axios from 'axios';

interface PredictionFormProps {
  className?: string; // Accepting className as a prop
}

const PredictionForm: React.FC<PredictionFormProps> = ({ className }) => {
  const [formData, setFormData] = useState({
    Area: '',
    State: '',
    District: '',
    Season: '',
    Crop: '',
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('Submitting form data:', formData); // Debugging log
      const response = await axios.post('http://localhost:5000/predict-yield', formData);

      console.log('Received prediction:', response.data); // Debugging log
      setPrediction(response.data.predicted_yield);
    } catch (err) {
      console.error('Error during prediction:', err);
      setError('Error predicting crop yield.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 p-6 ${className}`}>
      <div className="w-full max-w-2xl bg-black/30 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,255,128,0.1)] border border-green-400/20 text-white">
        <h1 className="text-3xl font-bold tracking-wide text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-8">
          Crop Yield Prediction
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-green-400">Crop</label>
            <input
              type="text"
              name="Crop"
              value={formData.Crop}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-white/50 border border-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-green-400">Area</label>
            <input
              type="number"
              name="Area"
              value={formData.Area}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-white/50 border border-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-green-400">State</label>
            <input
              type="text"
              name="State"
              value={formData.State}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-white/50 border border-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-green-400">District</label>
            <input
              type="text"
              name="District"
              value={formData.District}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-white/50 border border-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-green-400">Season</label>
            <input
              type="text"
              name="Season"
              value={formData.Season}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-white/50 border border-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-400/10 to-blue-400/10 text-white py-3 rounded-xl shadow-lg border border-white/10 hover:border-green-400/30 transition-all duration-300 font-medium flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">🌀</span> Predicting...
              </span>
            ) : (
              'Predict'
            )}
          </button>
        </form>

        {error && (
          <p className="mt-6 text-center text-red-400">{error}</p>
        )}

        {prediction && (
          <div className="mt-6 p-6 bg-black/20 rounded-xl border border-green-400/20">
            <h3 className="text-xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Prediction Result
            </h3>
            <p className="mt-2 text-center text-white">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;
