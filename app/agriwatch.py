import requests
import pandas as pd
import matplotlib.pyplot as plt

# API details
API_KEY = "579b464db66ec23bdd000001cb302a29d84049c56567f1565c515a48"
RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070"  # Correct resource ID
BASE_URL = f"https://api.data.gov.in/resource/{RESOURCE_ID}"

# Define API parameters
params = {
    "api-key": API_KEY,
    "format": "json",
    "limit": 100  # Fetch latest 100 records
}

# Fetch market data
response = requests.get(BASE_URL, params=params)

if response.status_code == 200:
    data = response.json()

    # Convert to DataFrame
    df = pd.DataFrame(data["records"])

    # Convert modal_price to numeric
    df["modal_price"] = pd.to_numeric(df["modal_price"], errors="coerce")

    # Display available columns
    print(df.head())

    # Convert date column if available
    if "arrival_date" in df.columns:
        df["arrival_date"] = pd.to_datetime(df["arrival_date"])

    # Plot price trends (modify based on available columns)
    if "arrival_date" in df.columns and "modal_price" in df.columns and "commodity" in df.columns:
        plt.figure(figsize=(14, 7))

        # Get the latest prices by commodity (use the most recent available data)
        latest_prices = df.sort_values(by="arrival_date", ascending=False).groupby("commodity").first()

        # Plot bar chart
        latest_prices.sort_values(by="modal_price", ascending=True).plot(
            kind="barh",
            y="modal_price",
            legend=False,
            figsize=(14, 7),
            color="skyblue"
        )

        plt.xlabel("Modal Price (INR)")
        plt.ylabel("Commodity")
        plt.title("Latest Market Prices for Various Commodities")
        plt.grid(axis="x", linestyle="--", alpha=0.7)
        plt.show()
    else:
        print("Date, price, or commodity column missing in API response.")

else:
    print("Error fetching data:", response.status_code, response.text)
