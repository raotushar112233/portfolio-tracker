import React, { useState } from "react";
import PortfolioTracker from "./PortfolioTracker";
import MultiAssetChart from "./MultiAssetChart"; 
import "./App.css";

const sampleData = {
  "Apple (AAPL)": [],
  "Tesla (TSLA)": [],
  "Bitcoin (BTC)": [],
  "Ethereum (ETH)": [],
};

function App() {
  const [selectedAssets, setSelectedAssets] = useState(["Apple (AAPL)", "Bitcoin (BTC)"]); // Default selected assets

  return (
    <div>
      {/* ✅ Title with Real Madrid theme */}
      <h1 style={{
        color: "#febd11",
        backgroundColor: "#ffffff",
        padding: "10px",
        borderRadius: "8px",
        textAlign: "center",
        fontWeight: "bold"
      }}>
        ⚪🟡 My Portfolio Tracker 🟡⚪
      </h1>
      
      <PortfolioTracker />

      {/* ✅ Dropdown for selecting assets */}
      <div className="chart-controls" style={{ textAlign: "center", marginTop: "20px" }}>
        <h2 style={{ color: "#0c1c8c" }}>Select Assets for Chart</h2>
        <select 
          multiple 
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions, option => option.value);
            setSelectedAssets(selected);
          }}
          style={{ padding: "5px", borderRadius: "5px", border: "1px solid #0c1c8c" }}
        >
          {Object.keys(sampleData).map((asset) => (
            <option key={asset} value={asset}>{asset}</option>
          ))}
        </select>
      </div>

      {/* ✅ Display the chart with selected assets */}
      <div className="chart-container" style={{ marginTop: "20px" }}>
        <h2 style={{ color: "#0c1c8c" }}>Multi-Asset Chart</h2>
        <MultiAssetChart selectedAssets={selectedAssets} setSelectedAssets={setSelectedAssets} />
      </div>
    </div>
  );
}

export default App;
