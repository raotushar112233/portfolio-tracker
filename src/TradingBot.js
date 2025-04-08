// src/TradingBot.js
import React, { useState, useEffect } from "react";

const fakePrices = [100, 97, 95, 99, 104, 110, 107, 102, 98, 94];

function TradingBot() {
  const [balance, setBalance] = useState(1000);
  const [holding, setHolding] = useState(false);
  const [buyPrice, setBuyPrice] = useState(0);
  const [trades, setTrades] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && currentIndex < fakePrices.length) {
      interval = setInterval(() => {
        const price = fakePrices[currentIndex];
        setTrades((prev) => [...prev, `📈 Price: ₹${price}`]);

        // Buy condition (if price drops)
        if (!holding && currentIndex > 0 && price < fakePrices[currentIndex - 1]) {
          setHolding(true);
          setBuyPrice(price);
          setTrades((prev) => [...prev, `🟢 Bought at ₹${price}`]);
        }

        // Sell condition (if price goes up)
        else if (holding && price > buyPrice) {
          const profit = price - buyPrice;
          setBalance((prev) => prev + profit);
          setTrades((prev) => [...prev, `🔴 Sold at ₹${price}, Profit: ₹${profit.toFixed(2)}`]);
          setHolding(false);
          setBuyPrice(0);
        }

        setCurrentIndex((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, currentIndex, holding, buyPrice]);

  return (
    <div style={{ padding: "20px", border: "2px solid #ccc", borderRadius: "10px", marginTop: "30px" }}>
      <h2 style={{ color: "#0c1c8c" }}>BOT HERE</h2>
      <button
        onClick={() => setIsRunning(true)}
        disabled={isRunning}
        style={{ padding: "8px 16px", marginBottom: "15px", backgroundColor: "#0c1c8c", color: "#fff", borderRadius: "5px" }}
      >
        Start Bot
      </button>
      <div>
        <h3>💰 Balance: ₹{balance.toFixed(2)}</h3>
        <ul>
          {trades.map((t, index) => (
            <li key={index}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TradingBot;
