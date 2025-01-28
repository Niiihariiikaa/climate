from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
from fastapi import FastAPI, HTTPException
import requests
import numpy as np
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Flatten

app = FastAPI()

# ✅ 1. AI Crop Recommendation using IBM Watson API
IBM_API_KEY = "your_ibm_api_key"
IBM_URL = "https://api.us-south.ml.cloud.ibm.com/v4/deployments/your_deployment_id/predictions"

def get_crop_recommendation(soil_type, rainfall, temperature):
    payload = {"input_data": [{"fields": ["soil_type", "rainfall", "temperature"], "values": [[soil_type, rainfall, temperature]]}]}
    headers = {"Authorization": f"Bearer {IBM_API_KEY}"}
    response = requests.post(IBM_URL, json=payload, headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="IBM AI API Error")
    return response.json()["predictions"]

# ✅ 2. AI Weather & Soil Insights using Google Earth Engine API
def get_weather_data(lat, lon):
    response = requests.get(f"https://earthengine.googleapis.com/weather?lat={lat}&lon={lon}")
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Weather API Error")
    return response.json()

# ✅ 3. Generate Synthetic Data for Risk Predictions (GANs)
def generate_synthetic_data(samples=1000):
    synthetic_temp = np.random.normal(25, 5, samples)  # Mean 25°C, Std 5°C
    synthetic_rain = np.random.normal(100, 20, samples)  # Mean 100mm, Std 20mm
    return {"synthetic_temperature": list(synthetic_temp[:5]), "synthetic_rainfall": list(synthetic_rain[:5])}

# ✅ 4. Transfer Learning for Plant Disease Detection using ResNet
def load_resnet_model():
    base_model = ResNet50(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
    x = Flatten()(base_model.output)
    x = Dense(128, activation="relu")(x)
    x = Dense(5, activation="softmax")(x)  # 5 disease categories
    model = Model(inputs=base_model.input, outputs=x)
    return model

# 📌 API Endpoints
@app.get("/")
def home():
    return {"message": "AI-Driven Agriculture API is running!"}

@app.post("/predict_crop")
def predict_crop(soil_type: str, rainfall: float, temperature: float):
    return {"recommended_crop": get_crop_recommendation(soil_type, rainfall, temperature)}

@app.get("/weather")
def weather(lat: float, lon: float):
    return get_weather_data(lat, lon)

@app.get("/synthetic_data")
def synthetic_data():
    return generate_synthetic_data()

@app.get("/plant_disease")
def plant_disease():
    return {"message": "Upload plant image for disease detection"}



app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load the model
model = joblib.load("crop_damage_model.pkl")

@app.route('/')
def home():
    return "Flask API is Running!"


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = np.array(data["features"]).reshape(1, -1)  # Convert input to NumPy array
        prediction = model.predict(features)
        return jsonify({"prediction": prediction.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
