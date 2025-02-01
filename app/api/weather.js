import axios from "axios";

// Fetch real-time weather data using latitude & longitude
export default async function handler(req, res) {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const API_KEY = "4851da6e6c0247fb843160351253001";
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`;

    // Make the request to the WeatherAPI
    const response = await axios.get(url);

    // Return the weather data
    res.status(200).json({
      temperature: response.data.current.temp_c, // In Celsius
      humidity: response.data.current.humidity,
      wind_speed: response.data.current.wind_kph, // In km/h
      rainfall: response.data.current.precip_mm || 0, // Precipitation in mm
      condition: response.data.current.condition.text, // Weather condition
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
}
