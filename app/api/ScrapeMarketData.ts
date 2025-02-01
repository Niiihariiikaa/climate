const axios = require('axios');
const cheerio = require('cheerio');

// Fetch market data from the Agmarknet page
const fetchMarketData = async () => {
  try {
    // Send a GET request to the page
    const { data } = await axios.get('https://agmarknet.gov.in/New/TotalMarkets_Covered.aspx');
    
    // Load HTML into Cheerio
    const $ = cheerio.load(data);

    // Initialize an array to store market data
    const marketData = [];

    // Loop through the table rows (adjust the selector based on the actual structure)
    $('table tr').each((index, element) => {
      const crop = $(element).find('td:nth-child(1)').text().trim();
      const market = $(element).find('td:nth-child(2)').text().trim();
      const price = $(element).find('td:nth-child(3)').text().trim();
      const date = $(element).find('td:nth-child(4)').text().trim();

      // Push the data to the array
      marketData.push({ crop, market, price, date });
    });

    // Log the scraped data
    console.log(marketData);

  } catch (error) {
    console.error('Error fetching market data:', error);
  }
};

// Run the function
fetchMarketData();
