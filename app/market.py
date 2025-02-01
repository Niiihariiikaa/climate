import pandas as pd

data = []

# Add scraped data to a list (for example purposes)
data.append(['Commodity', 'Price'])
data.append([commodity, price])

# Save data to CSV
df = pd.DataFrame(data, columns=['Commodity', 'Price'])
df.to_csv('commodity_prices.csv', index=False)
