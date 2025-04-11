import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

// Utility to generate fake price data
const generateFakePriceData = () => {
  let data = [];
  let price = 100;
  for (let i = 0; i < 50; i++) {
    price += (Math.random() - 0.5) * 5;
    data.push({ time: i, price: parseFloat(price.toFixed(2)) });
  }
  return data;
};

// Calculate Moving Average
const calculateMovingAverage = (data, windowSize) => {
  return data.map((_, i, arr) => {
    if (i < windowSize - 1) return null;
    const window = arr.slice(i - windowSize + 1, i + 1);
    const sum = window.reduce((total, d) => total + d.price, 0);
    return parseFloat((sum / windowSize).toFixed(2));
  });
};

// Calculate Volatility (Standard Deviation)
const calculateVolatility = (data, windowSize) => {
  return data.map((_, i, arr) => {
    if (i < windowSize - 1) return null;
    const window = arr.slice(i - windowSize + 1, i + 1);
    const mean = window.reduce((acc, d) => acc + d.price, 0) / windowSize;
    const variance = window.reduce((acc, d) => acc + Math.pow(d.price - mean, 2), 0) / windowSize;
    return parseFloat(Math.sqrt(variance).toFixed(2));
  });
};

// Calculate RSI
const calculateRSI = (data, period = 14) => {
  let rsi = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period) {
      rsi.push(null);
      continue;
    }
    let gains = 0;
    let losses = 0;
    for (let j = i - period + 1; j <= i; j++) {
      const change = data[j].price - data[j - 1].price;
      if (change > 0) gains += change;
      else losses -= change;
    }
    const averageGain = gains / period;
    const averageLoss = losses / period;
    const rs = averageGain / (averageLoss || 1); // Prevent division by zero
    rsi.push(parseFloat((100 - 100 / (1 + rs)).toFixed(2)));
  }
  return rsi;
};

function AnalyticsDashboard() {
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    const data = generateFakePriceData();
    const movingAvg = calculateMovingAverage(data, 5);
    const volatility = calculateVolatility(data, 5);
    const rsi = calculateRSI(data);

    const enrichedData = data.map((d, i) => ({
      ...d,
      movingAvg: movingAvg[i] ?? null,
      volatility: volatility[i] ?? null,
      rsi: rsi[i] ?? null,
    }));

    setPriceData(enrichedData);
  }, []);

  return (
    <div style={{ padding: "20px", border: "2px solid #ccc", borderRadius: "12px", marginTop: "20px" }}>
      <h2 style={{ color: "#0c1c8c", marginBottom: "20px" }}>📈 Advanced Data Analytics Dashboard</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={priceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price (₹)" />
          <Line type="monotone" dataKey="movingAvg" stroke="#82ca9d" name="Moving Avg" />
          <Line type="monotone" dataKey="volatility" stroke="#ffc658" name="Volatility" />
          <Line type="monotone" dataKey="rsi" stroke="#ff7300" name="RSI" />
        </LineChart>
      </ResponsiveContainer>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "30px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0", textAlign: "left" }}>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Time</th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Price (₹)</th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Moving Avg</th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Volatility</th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>RSI</th>
          </tr>
        </thead>
        <tbody>
          {priceData.map((d, i) => (
            <tr key={i}>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>{d.time}</td>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>₹{d.price}</td>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>{d.movingAvg ?? "-"}</td>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>{d.volatility ?? "-"}</td>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>{d.rsi ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalyticsDashboard;
