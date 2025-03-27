import "./PortfolioTracker.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function PortfolioTracker() {
  const [portfolio, setPortfolio] = useState([]);
  const [customStock, setCustomStock] = useState({ name: "", price: "" });
  const [totalValue, setTotalValue] = useState(0);
  const [previousPrices, setPreviousPrices] = useState({});

  const footballClubs = [
    { name: "Manchester United", symbol: "MANU", price: 340.5, logo: "https://logo.clearbit.com/manutd.com" },
    { name: "Real Madrid", symbol: "RMA", price: 135.8, logo: "https://logo.clearbit.com/realmadrid.com" },
    { name: "Barcelona", symbol: "BAR", price: 110.3, logo: "https://logo.clearbit.com/fcbarcelona.com" },
    { name: "Liverpool", symbol: "LIV", price: 98.6, logo: "https://logo.clearbit.com/liverpoolfc.com" },
    { name: "Arsenal", symbol: "ARS", price: 112.4, logo: "https://logo.clearbit.com/arsenal.com" }
  ];

  const addRandomStock = () => {
    const randomClub = footballClubs[Math.floor(Math.random() * footballClubs.length)];
    setPortfolio((prev) => [...prev, { ...randomClub, percentageChange: 0 }]);
    setPreviousPrices((prev) => ({ ...prev, [randomClub.name]: randomClub.price }));
  };

  const addCustomStock = (e) => {
    e.preventDefault();
    if (customStock.name && customStock.price) {
      const newStock = {
        name: customStock.name,
        price: parseFloat(customStock.price),
        logo: getInitialLogo(customStock.name),
        percentageChange: 0
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

  const updateStockPrices = () => {
    const updatedPortfolio = portfolio.map((stock) => {
      const change = (Math.random() * 10 - 5) / 100;
      const newPrice = stock.price + stock.price * change;
      const oldPrice = previousPrices[stock.name];
      const percentageChange = ((newPrice - oldPrice) / oldPrice) * 100;

      return {
        ...stock,
        price: newPrice,
        percentageChange: percentageChange.toFixed(2)
      };
    });

    setPortfolio(updatedPortfolio);

    const newPrices = updatedPortfolio.reduce((acc, stock) => {
      acc[stock.name] = stock.price;
      return acc;
    }, {});
    setPreviousPrices(newPrices);

    const total = updatedPortfolio.reduce((sum, stock) => sum + stock.price, 0);
    setTotalValue(total);
  };

  useEffect(() => {
    const interval = setInterval(updateStockPrices, 5000);
    return () => clearInterval(interval);
  }, [portfolio]);

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

      <h3>Total Portfolio Value: ${totalValue.toFixed(2)}</h3>

      <ul>
        {portfolio.map((stock, index) => (
          <li key={index}>
            <img src={stock.logo} alt={stock.name} style={{ width: "30px" }} />
            <span>{stock.name} - ${stock.price.toFixed(2)}</span>
            <span style={{ color: stock.percentageChange >= 0 ? "green" : "red" }}>
              {stock.percentageChange}%
            </span>
            <button onClick={() => removeStock(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PortfolioTracker;