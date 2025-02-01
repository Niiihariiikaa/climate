import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface MarketData {
  commodity: string;
  state: string;
  modal_price: number; // Updated to number
  arrival_date: string;
}

interface ChartData {
  commodity: string;
  price: number;
}

interface PriceTrendData {
  date: string;
  price: number;
}

interface CommodityDistribution {
  name: string;
  value: number;
}

const MarketTrends = () => {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_KEY = "579b464db66ec23bdd000001cb302a29d84049c56567f1565c515a48";
        const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";
        const response = await axios.get(`https://api.data.gov.in/resource/${RESOURCE_ID}`, {
          params: {
            "api-key": API_KEY,
            format: "json",
            limit: 100, // Fetch latest 100 records
          },
        });
  
        if (response.status === 200) {
          const records = response.data.records as MarketData[];
  
          // Convert modal_price to numeric
          const processedData = records.map((record) => ({
            ...record,
            modal_price: parseFloat(record.modal_price as unknown as string), // Ensure modal_price is treated as a string before parsing
          }));
  
          setData(processedData);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Filter data based on selected commodity, state, and other filters
  const filteredData = data.filter((item) => {
    const matchesCommodity = selectedCommodity ? item.commodity === selectedCommodity : true;
    const matchesState = selectedState ? item.state === selectedState : true;
  
    const minPriceNum = minPrice ? parseFloat(minPrice) : null;
    const maxPriceNum = maxPrice ? parseFloat(maxPrice) : null;
  
    const matchesPrice =
      (minPriceNum !== null ? item.modal_price >= minPriceNum : true) &&
      (maxPriceNum !== null ? item.modal_price <= maxPriceNum : true);
  
    const matchesDate = arrivalDate ? item.arrival_date.includes(arrivalDate) : true;
  
    return matchesCommodity && matchesState && matchesPrice && matchesDate;
  });

  // Get unique commodities, states, and dates for the filter dropdowns
  const commodities = [...new Set(data.map((item) => item.commodity))];
  const states = [...new Set(data.map((item) => item.state))];
  const arrivalDates = [...new Set(data.map((item) => item.arrival_date.split("T")[0]))]; // Extract date part only

  // Group data by commodity and get the latest price for each
  const latestPrices = filteredData.reduce<Record<string, MarketData>>((acc, item) => {
    if (!acc[item.commodity] || new Date(item.arrival_date) > new Date(acc[item.commodity].arrival_date)) {
      acc[item.commodity] = item;
    }
    return acc;
  }, {});

  const chartData: ChartData[] = Object.values(latestPrices).map((item) => ({
    commodity: item.commodity,
    price: item.modal_price, // No need to parse again
  }));

  const priceTrendData: PriceTrendData[] = filteredData.map((item) => ({
    date: item.arrival_date.split("T")[0], // Using the date part only
    price: item.modal_price, // No need to parse again
  }));

  const commodityDistribution: CommodityDistribution[] = Object.values(latestPrices).map((item) => ({
    name: item.commodity,
    value: item.modal_price, // No need to parse again
  }));

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-transparent min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-6">Market Trends</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        {/* Filter by Commodity */}
        <div className="bg-transparent p-4 rounded-lg shadow-md">
          <label htmlFor="commodity" className="block text-sm font-medium">
            Filter by Commodity:
          </label>
          <select
            id="commodity"
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
            className="mt-1 block w-full md:w-64 p-2 border border-white rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Commodities</option>
            {commodities.map((commodity) => (
              <option key={commodity} value={commodity}>
                {commodity}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by State */}
        <div className="bg-transparent p-4 rounded-lg shadow-md">
          <label htmlFor="state" className="block text-sm font-medium">
            Filter by State:
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="mt-1 block w-full md:w-64 p-2 border border-white rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Price Range */}
        <div className="bg-transparent p-4 rounded-lg shadow-md">
          <label htmlFor="price" className="block text-sm font-medium">
            Price Range:
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              id="minPrice"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="p-2 w-32 border border-white rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              id="maxPrice"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="p-2 w-32 border border-white rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filter by Arrival Date */}
        <div className="bg-transparent p-4 rounded-lg shadow-md">
          <label htmlFor="arrivalDate" className="block text-sm font-medium">
            Filter by Arrival Date:
          </label>
          <select
            id="arrivalDate"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            className="mt-1 block w-full md:w-64 p-2 border border-white rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Dates</option>
            {arrivalDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bar chart for Latest Prices */}
      <div className="bg-transparent p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Latest Commodity Prices</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="commodity" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="price" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart for Price Trend */}
      <div className="bg-transparent p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Price Trend Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={priceTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart for Commodity Distribution */}
      <div className="bg-transparent p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Commodity Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={commodityDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {commodityDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketTrends;