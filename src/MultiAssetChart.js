import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const sampleData = {
  "Apple (AAPL)": [
    { time: "10:00", price: 145 },
    { time: "11:00", price: 147 },
    { time: "12:00", price: 150 },
  ],
  "Tesla (TSLA)": [
    { time: "10:00", price: 680 },
    { time: "11:00", price: 690 },
    { time: "12:00", price: 705 },
  ],
  "Bitcoin (BTC)": [
    { time: "10:00", price: 30000 },
    { time: "11:00", price: 30250 },
    { time: "12:00", price: 31000 },
  ],
  "Ethereum (ETH)": [
    { time: "10:00", price: 1800 },
    { time: "11:00", price: 1825 },
    { time: "12:00", price: 1900 },
  ],
};

function MultiAssetChart({ selectedAssets, setSelectedAssets }) {
  // Handle asset selection
  const handleAssetChange = (event) => {
    const { value, checked } = event.target;
    setSelectedAssets((prev) =>
      checked ? [...prev, value] : prev.filter((asset) => asset !== value)
    );
  };

  // Merge data for selected assets
  const mergedData = [];
  Object.values(sampleData).flat().forEach(({ time }) => {
    if (!mergedData.some((d) => d.time === time)) {
      mergedData.push({ time });
    }
  });

  mergedData.forEach((dataPoint) => {
    selectedAssets.forEach((asset) => {
      const assetData = sampleData[asset]?.find((d) => d.time === dataPoint.time);
      if (assetData) {
        dataPoint[asset] = assetData.price;
      }
    });
  });

  return (
    <div className="chart-container">
      <h2 style={{ color: "#febd11" }}>📈 Multi-Asset Chart</h2>

      {/* ✅ Improved Checkbox UI */}
      <div className="checkbox-container">
        {Object.keys(sampleData).map((asset) => (
          <label key={asset} className="asset-checkbox">
            <input
              type="checkbox"
              value={asset}
              checked={selectedAssets.includes(asset)}
              onChange={handleAssetChange}
            />
            {asset}
          </label>
        ))}
      </div>

      {/* ✅ Chart with selected assets */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mergedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d3d3d3" /> {/* Lighter Gray Grid */}
          <XAxis dataKey="time" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip contentStyle={{ backgroundColor: "#000000", color: "#ffffff" }} /> {/* White Text on Black */}
          <Legend wrapperStyle={{ color: "#ffffff" }} />

          {selectedAssets.map((asset, index) => (
            <Line
              key={asset}
              type="monotone"
              dataKey={asset}
              stroke={["#febd11", "#ffffff", "#ff5733", "#3498db"][index % 4]} // Gold, White, Red, Blue
              strokeWidth={3}
              dot={{ r: 6, fill: "#febd11" }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MultiAssetChart;
