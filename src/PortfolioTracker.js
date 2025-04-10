import "./PortfolioTracker.css";
import React, { useState, useEffect, useCallback } from "react";

function PortfolioTracker() {
  const [portfolio, setPortfolio] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [customStock, setCustomStock] = useState({ name: "", price: "" });
  const [previousPrices, setPreviousPrices] = useState({});

  const footballClubs = [
    { name: "Manchester United", symbol: "MANU", price: 340.5, logo: "https://logo.clearbit.com/manutd.com" },
    { name: "Real Madrid", symbol: "RMA", price: 135.8, logo: "https://logo.clearbit.com/realmadrid.com" },
    { name: "Barcelona", symbol: "BAR", price: 110.3, logo: "https://logo.clearbit.com/fcbarcelona.com" },
    { name: "Liverpool", symbol: "LIV", price: 98.6, logo: "https://logo.clearbit.com/liverpoolfc.com" },
    { name: "Arsenal", symbol: "ARS", price: 112.4, logo: "https://logo.clearbit.com/arsenal.com" }
  ];

  const generateSentiment = () => {
    const sentiments = ["Positive", "Neutral", "Negative"];
    return sentiments[Math.floor(Math.random() * sentiments.length)];
  };

  const addRandomStock = () => {
    const randomClub = footballClubs[Math.floor(Math.random() * footballClubs.length)];
    setPortfolio((prev) => [
      ...prev,
      { ...randomClub, percentageChange: 0, sentiment: generateSentiment() }
    ]);
    setPreviousPrices((prev) => ({ ...prev, [randomClub.name]: randomClub.price }));
  };

  const addCustomStock = (e) => {
    e.preventDefault();
    if (customStock.name && customStock.price) {
      const newStock = {
        name: customStock.name,
        price: parseFloat(customStock.price),
        logo: getInitialLogo(customStock.name),
        percentageChange: 0,
        sentiment: generateSentiment()
      };
      setPortfolio((prev) => [...prev, newStock]);
      setPreviousPrices((prev) => ({ ...prev, [customStock.name]: parseFloat(customStock.price) }));
      setCustomStock({ name: "", price: "" });
    }
  };

  const getInitialLogo = (name) => {
    return `https://via.placeholder.com/30/000000/FFFFFF?text=${name.charAt(0).toUpperCase()}`;
  };

  const removeStock = (index) => {
    setPortfolio((prev) => prev.filter((_, i) => i !== index));
  };

  const updateStockPrices = useCallback(() => {
    setPortfolio((prevPortfolio) => {
      return prevPortfolio.map((stock) => {
        const change = (Math.random() * 10 - 5) / 100;
        const newPrice = stock.price + stock.price * change;
        const oldPrice = previousPrices[stock.name] || stock.price;
        const percentageChange = ((newPrice - oldPrice) / oldPrice) * 100;
        return {
          ...stock,
          price: newPrice,
          percentageChange: percentageChange.toFixed(2),
          sentiment: generateSentiment()
        };
      });
    });
  }, [previousPrices]);

  useEffect(() => {
    const interval = setInterval(updateStockPrices, 5000);
    return () => clearInterval(interval);
  }, [updateStockPrices]);

  const addToWatchlist = (stock) => {
    if (!watchlist.some((s) => s.name === stock.name)) {
      setWatchlist([...watchlist, stock]);
    }
  };

  const removeFromWatchlist = (index) => {
    setWatchlist((prev) => prev.filter((_, i) => i !== index));
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment === "Positive") return "limegreen";
    if (sentiment === "Neutral") return "gold";
    return "crimson";
  };

  return (
    <div className="portfolio-container">
      <h2>⚽ Portfolio Tracker</h2>

      <button onClick={addRandomStock}>Add Random Football Club Stock</button>

      <form onSubmit={addCustomStock}>
        <input
          type="text"
          placeholder="Enter Club Name"
          value={customStock.name}
          onChange={(e) => setCustomStock({ ...customStock, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Enter Stock Price"
          value={customStock.price}
          onChange={(e) => setCustomStock({ ...customStock, price: e.target.value })}
        />
        <button type="submit">Add Custom Stock</button>
      </form>

      <ul>
        {portfolio.map((stock, index) => (
          <li key={index}>
            <img src={stock.logo} alt={stock.name} style={{ width: "30px" }} />
            <span>{stock.name} - ${stock.price.toFixed(2)}</span>
            <span style={{ color: stock.percentageChange >= 0 ? "green" : "red", marginLeft: "10px" }}>
              {stock.percentageChange}%
            </span>
            <span style={{ color: getSentimentColor(stock.sentiment), marginLeft: "10px" }}>
              🧠 {stock.sentiment}
            </span>
            <button onClick={() => removeStock(index)} style={{ marginLeft: "10px" }}>Remove</button>
            <button onClick={() => addToWatchlist(stock)}>Add to Watchlist</button>
          </li>
        ))}
      </ul>

      <h3>📌 Watchlist</h3>
      <ul>
        {watchlist.map((stock, index) => (
          <li key={index}>
            <img src={stock.logo} alt={stock.name} style={{ width: "30px" }} />
            <span>{stock.name} - ${stock.price.toFixed(2)}</span>
            <button onClick={() => removeFromWatchlist(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PortfolioTracker;
