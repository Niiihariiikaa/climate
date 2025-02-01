from fastapi import FastAPI
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Fetch API Key from .env file or use hardcoded (not recommended for production)
API_KEY = os.getenv("WEATHER_API_KEY") or "4851da6e6c0247fb843160351253001"

# Default route to check if API is running
@app.get("/")
def read_root():
    return {"message": "FastAPI is running!"}

# Fetch real-time weather data using latitude & longitude
@app.get("/weather")
def get_weather(lat: float, lon: float):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        weather = {
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "rainfall": data["rain"]["1h"] if "rain" in data else 0,
            "condition": data["weather"][0]["description"]
        }
        return weather
    return {"error": "Unable to fetch weather data"}
