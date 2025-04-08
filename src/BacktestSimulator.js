import React, { useState } from "react";

function BacktestSimulator() {
  const [inputPrices, setInputPrices] = useState("100, 97, 101, 98, 102, 105, 103, 108");
  const [trades, setTrades] = useState([]);
  const [finalBalance, setFinalBalance] = useState(null);

  const runBacktest = () => {
    let balance = 1000;
    let holding = false;
    let buyPrice = 0;
    let newTrades = [];

    const priceArray = inputPrices
      .split(",")
      .map(p => parseFloat(p.trim()))
      .filter(p => !isNaN(p));

    priceArray.forEach((price, index) => {
      if (!holding && index > 0 && price <= priceArray[index - 1] * 0.97) {
        holding = true;
        buyPrice = price;
        newTrades.push(`🟢 Bought at ₹${price}`);
      } else if (holding && price >= buyPrice * 1.03) {
        holding = false;
        const profit = price - buyPrice;
        balance += profit;
        newTrades.push(`🔴 Sold at ₹${price}, Profit: ₹${profit.toFixed(2)}`);
      }
    });

    setTrades(newTrades);
    setFinalBalance(balance.toFixed(2));
  };

  return (
    <div style={{
      backgroundColor: "#001f4d",
      color: "white",
      padding: "20px",
      borderRadius: "15px",
      marginTop: "30px",
      boxShadow: "0 0 15px rgba(0,0,0,0.2)"
    }}>
      <h2 style={{ color: "#febd11" }}>📊 Strategy Backtesting</h2>

      <label htmlFor="priceInput">Enter Price Data (comma-separated):</label>
      <textarea
        id="priceInput"
        rows="3"
        value={inputPrices}
        onChange={(e) => setInputPrices(e.target.value)}
        style={{ width: "100%", marginTop: "10px", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
      />

      <button
        onClick={runBacktest}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#febd11",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          color: "#000"
        }}
      >
        ▶️ Simulate
      </button>

      {trades.length > 0 && (
        <div style={{ marginTop: "20px", backgroundColor: "#002b5c", padding: "15px", borderRadius: "10px" }}>
          <h3 style={{ color: "#febd11" }}>🔁 Backtesting Results</h3>
          <ul>
            {trades.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <h4 style={{ color: "#00ffcc" }}>📈 Final Balance: ₹{finalBalance}</h4>
        </div>
      )}
    </div>
  );
}

export default BacktestSimulator;
