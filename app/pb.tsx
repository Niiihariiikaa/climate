// app/pb/page.tsx

"use client";
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';

interface CropData {
  State_Name: string;
  District_Name: string;
  Crop_Year: number;
  Season: string;
  Crop: string;
  Area: number;
  Production: number;
  STATE_NAME: string;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<CropData[]>([]);

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        const response = await fetch('./data/Copy of Crop Data.csv');
        const text = await response.text();
        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            console.log(result.data);
            setData(result.data);
          },
        });
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };
  
    loadCSVData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Crop Production Dashboard</h1>
      {data.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Crop_Year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Production" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Dashboard;
