import sys
import json
import joblib
import numpy as np
from sklearn.preprocessing import MinMaxScaler

# Load the trained model
model = joblib.load('crop_damage_model.pkl')

# Read input data from stdin
input_data = json.loads(sys.stdin.read())

# Assuming input data is a dictionary of features to be passed into the model
# Make sure the input_data matches the required features for prediction

# Example: Extract features from input_data
input_features = [
    input_data['Area'],
    input_data['State'],   # Ensure one-hot encoding for categorical features
    input_data['District'], 
    input_data['Season']
    # Add other features as required
]

# Convert input data to a numpy array
X_new = np.array(input_features).reshape(1, -1)

# Scale the features (use the same scaler as during training)
scaler = MinMaxScaler()
X_new_scaled = scaler.fit_transform(X_new)

# Predict the crop using the model
prediction = model.predict(X_new_scaled)

# Output the prediction
print(prediction[0])
